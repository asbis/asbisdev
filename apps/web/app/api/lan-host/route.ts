import { NextResponse } from 'next/server';
import { networkInterfaces } from 'node:os';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function findLanIp(): string | null {
  const ifaces = networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const ni of ifaces[name] || []) {
      if (ni.family === 'IPv4' && !ni.internal) {
        // Prefer 192.168.* / 10.* / 172.16-31.* (private ranges)
        if (
          ni.address.startsWith('192.168.') ||
          ni.address.startsWith('10.') ||
          /^172\.(1[6-9]|2\d|3[0-1])\./.test(ni.address)
        ) {
          return ni.address;
        }
      }
    }
  }
  return null;
}

export async function GET() {
  return NextResponse.json({ lanHost: findLanIp() });
}
