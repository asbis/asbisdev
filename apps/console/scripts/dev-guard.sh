#!/usr/bin/env bash
# Runs `next dev` in its own process group and kills the whole group if it runs away.
# Background: Next 16.2.4 + Turbopack spawned hundreds of postcss worker processes
# (10+ GB in seconds) when `next dev` started on a `.next` folder that also held
# `next build` output. This guard caps the blast radius; see AGENTS.md.
#
#   scripts/dev-guard.sh [port]      (defaults to 3001)
#   MAX_PROCS=40 MAX_MB=6000 scripts/dev-guard.sh
set -u
PORT=${1:-3001}
MAX_PROCS=${MAX_PROCS:-40}
MAX_MB=${MAX_MB:-6000}
cd "$(dirname "$0")/.." || exit 1

# Never start dev on top of a production build: that is the combination that blew up.
if [ -f .next/BUILD_ID ]; then
  echo "dev-guard: .next contains a production build, clearing it before starting dev"
  rm -rf .next
fi

python3 -c 'import os,sys; os.setsid(); os.execvp(sys.argv[1], sys.argv[1:])' \
  ./node_modules/.bin/next dev -p "$PORT" &
LEADER=$!
sleep 1
PGID=$(ps -o pgid= -p "$LEADER" 2>/dev/null | tr -d ' ')
if [ -z "$PGID" ] || [ "$PGID" = "$(ps -o pgid= -p $$ | tr -d ' ')" ]; then
  echo "dev-guard: could not isolate the server, running unguarded"
  wait "$LEADER"
  exit $?
fi

cleanup() {
  kill -TERM -- -"$PGID" 2>/dev/null
  sleep 1
  kill -KILL -- -"$PGID" 2>/dev/null
}
trap 'cleanup; exit 130' INT TERM

while kill -0 "$LEADER" 2>/dev/null; do
  N=0; SUM=0
  while read -r rss; do SUM=$((SUM + rss)); N=$((N + 1)); done < <(ps -axo pgid=,rss= | awk -v g="$PGID" '$1==g {print $2}')
  MB=$((SUM / 1024))
  if [ "$N" -gt "$MAX_PROCS" ] || [ "$MB" -gt "$MAX_MB" ]; then
    echo
    echo "dev-guard: runaway dev server ($N processes, ${MB} MB). Killing it. Delete .next and start again."
    cleanup
    exit 1
  fi
  sleep 2
done
wait "$LEADER"
