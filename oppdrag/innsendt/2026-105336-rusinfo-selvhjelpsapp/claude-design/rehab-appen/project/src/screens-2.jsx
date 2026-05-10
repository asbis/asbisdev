// Kord screens 2 — Dagbok (empty + full), Oversikt, Kriseplan

const { KordPlaceholder, KordCard, KordButton, KordTag, KordInput,
        KordSectionTitle, KordTabBar, KordCrisisFab } = window;

// ── Dagbok (journal) ────────────────────────────────────────────────
function ScreenDagbok({ theme, empty = false, onNav, onOpenCrisis, crisisVariant, reduceMotion }) {
  const pills = ['Notat', 'Trigger', 'Plan'];
  const [sel, setSel] = React.useState('Notat');

  const entries = [
    { date: '22. apr', weekday: 'tirsdag', title: 'Sent på kvelden, alene.', body: 'Kroppen vil. Hodet vet. Jeg ble inne, varmet melk, så på regn.', tags: ['trigger: kveld', 'FAK'], mood: '🌫' },
    { date: '21. apr', weekday: 'mandag',  title: 'Første arbeidsdag etter påske.', body: 'Kollegaer pratet om helgen. Kjent stikk. Gikk en tur i lunsjen.', tags: ['jobb'], mood: '🌱' },
    { date: '20. apr', weekday: 'søndag',  title: 'Ukens mål for kommende uke.', body: 'Tre turer, én middag med Siri, skrive hver kveld.', tags: ['ukesmål'], mood: '🌱' },
    { date: '18. apr', weekday: 'fredag',  title: 'Ingen trang i dag.', body: '', tags: [], mood: '🌱' },
  ];

  const Empty = (
    <div style={{ padding: '40px 28px', textAlign: 'center', marginTop: 40 }}>
      <div style={{
        width: 72, height: 72, margin: '0 auto 24px', borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={theme.accent1} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4h11a2 2 0 012 2v14l-5-3-5 3V6a2 2 0 01-2-2z" transform="translate(1,0)"/>
        </svg>
      </div>
      <KordSectionTitle theme={theme} size={26} style={{ lineHeight: 1.25 }}>
        Hvert innlegg er bare ditt.
      </KordSectionTitle>
      <p style={{
        marginTop: 14, color: theme.textMuted, fontFamily: theme.bodyFont,
        fontSize: 15, lineHeight: 1.55, maxWidth: 280, margin: '14px auto 0',
      }}>
        Vi anbefaler å skrive kort og ofte — lettere enn langt og sjeldent.
      </p>
      <div style={{ marginTop: 30, padding: 20, background: theme.surface, border: `1px solid ${theme.hairline}`, borderRadius: 20, textAlign: 'left' }}>
        <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.8, color: theme.textFaint, textTransform: 'uppercase', marginBottom: 6 }}>I dag</div>
        <div style={{ fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal', fontSize: 20, color: theme.text }}>Hva skjedde i dag?</div>
        <div style={{ marginTop: 12, borderBottom: `1px solid ${theme.hairline}`, height: 1 }}/>
        <div style={{ marginTop: 10, fontFamily: theme.bodyFont, fontSize: 14, color: theme.textFaint }}>Skriv noen ord…</div>
      </div>
    </div>
  );

  const Full = (
    <div style={{ padding: '18px 0 20px' }}>
      {entries.map((e, i) => (
        <div key={i} style={{
          padding: '18px 24px',
          borderTop: i === 0 ? 'none' : `1px solid ${theme.hairline}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <div style={{ fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 0.6, color: theme.textFaint, textTransform: 'uppercase' }}>{e.date} · {e.weekday}</div>
            <div style={{ flex: 1 }}/>
            <span style={{ fontSize: 14 }}>{e.mood}</span>
          </div>
          <div style={{ fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal', fontSize: 20, color: theme.text, lineHeight: 1.2, letterSpacing: -0.3 }}>
            {e.title}
          </div>
          {e.body && (
            <div style={{ marginTop: 6, fontFamily: theme.bodyFont, fontSize: 14, color: theme.textMuted, lineHeight: 1.55 }}>
              {e.body}
            </div>
          )}
          {e.tags.length > 0 && (
            <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {e.tags.map((t, j) => <KordTag key={j} theme={theme}>{t}</KordTag>)}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.base }}>
      <div style={{ paddingTop: 60, paddingBottom: 6, padding: '60px 20px 6px' }}>
        <KordSectionTitle theme={theme} size={34}>Dagbok</KordSectionTitle>
      </div>
      <div style={{ padding: '12px 20px', display: 'flex', gap: 8 }}>
        {pills.map(p => {
          const active = sel === p;
          return (
            <div key={p} onClick={() => setSel(p)} style={{
              padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
              background: active ? theme.primary : 'transparent',
              color: active ? theme.primaryInk : theme.textMuted,
              border: `1px solid ${active ? theme.primary : theme.hairline}`,
              fontFamily: theme.bodyFont, fontSize: 13, letterSpacing: -0.1,
            }}>+ {p}</div>
          );
        })}
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {empty ? Empty : Full}
      </div>
      <KordCrisisFab theme={theme} variant={crisisVariant} onClick={onOpenCrisis} reduceMotion={reduceMotion} style={{ bottom: 84 }}/>
      <KordTabBar theme={theme} active="dagbok" onChange={onNav}/>
    </div>
  );
}

// ── Oversikt (overview) ─────────────────────────────────────────────
function ScreenOversikt({ theme, onNav, onOpenCrisis, crisisVariant, reduceMotion }) {
  const phases = [
    { id: 'Uke 0–1', label: 'Akutt', done: true },
    { id: 'Uke 1–2', label: 'Tidlig', done: true },
    { id: 'Uke 2–6', label: 'Oppbygging', active: true },
    { id: 'Uke 6–12', label: 'Konsolidering', done: false },
    { id: '12+ uker', label: 'Vedvarende', done: false },
  ];

  const Pie = ({ segments, size = 110 }) => {
    const r = size/2 - 6, cx = size/2, cy = size/2;
    let acc = 0; const total = segments.reduce((s,x) => s+x.v, 0);
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((s, i) => {
          const a0 = (acc/total) * 2*Math.PI - Math.PI/2;
          acc += s.v;
          const a1 = (acc/total) * 2*Math.PI - Math.PI/2;
          const x0 = cx + r*Math.cos(a0), y0 = cy + r*Math.sin(a0);
          const x1 = cx + r*Math.cos(a1), y1 = cy + r*Math.sin(a1);
          const large = (a1-a0) > Math.PI ? 1 : 0;
          return <path key={i} d={`M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`} fill={s.c}/>;
        })}
        <circle cx={cx} cy={cy} r={r*0.5} fill={theme.surface}/>
      </svg>
    );
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.base }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '60px 0 20px' }}>
        <div style={{ padding: '0 20px 8px' }}>
          <KordSectionTitle theme={theme} size={34}>Oversikt</KordSectionTitle>
        </div>

        {/* Phase indicator */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.8, color: theme.textFaint, textTransform: 'uppercase' }}>Din status</div>
          <KordCard theme={theme} style={{ padding: '22px 18px', marginTop: 10 }}>
            <div style={{ position: 'relative', height: 56 }}>
              <div style={{ position: 'absolute', top: 22, left: 8, right: 8, height: 3, background: theme.hairline, borderRadius: 2 }}/>
              <div style={{ position: 'absolute', top: 22, left: 8, width: '46%', height: 3, background: theme.accent1, borderRadius: 2 }}/>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between' }}>
                {phases.map((p, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 60 }}>
                    <div style={{
                      width: p.active ? 18 : 11, height: p.active ? 18 : 11, borderRadius: '50%',
                      background: p.done || p.active ? theme.accent1 : theme.surface,
                      border: `1.5px solid ${p.done || p.active ? theme.accent1 : theme.hairline}`,
                      marginTop: p.active ? 13 : 16.5,
                      boxShadow: p.active ? `0 0 0 5px ${theme.accent1}22` : 'none',
                      animation: p.active && !reduceMotion ? 'kordPulse 3s ease-in-out infinite' : 'none',
                    }}/>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              {phases.map((p, i) => (
                <div key={i} style={{ width: 60, textAlign: 'center' }}>
                  <div style={{ fontFamily: theme.bodyFont, fontSize: 10, color: p.active ? theme.text : theme.textFaint, fontWeight: p.active ? 500 : 400 }}>{p.label}</div>
                  <div style={{ fontFamily: theme.monoFont, fontSize: 9, color: theme.textFaint }}>{p.id}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${theme.hairline}`, fontFamily: theme.bodyFont, fontSize: 13, color: theme.textMuted, lineHeight: 1.55 }}>
              <span style={{ fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal', color: theme.text, fontSize: 15 }}>Oppbygging.</span> Kroppen finner takt igjen. Søvnen kommer tilbake i bølger.
            </div>
          </KordCard>
        </div>

        {/* Patterns */}
        <div style={{ padding: '28px 20px 0' }}>
          <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.8, color: theme.textFaint, textTransform: 'uppercase' }}>Dine mønstre</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
            {[
              { title: 'Triggere som drar', segs: [
                { v: 40, c: theme.crisis, l: 'Kveld alene' },
                { v: 28, c: theme.accent1, l: 'Fest' },
                { v: 18, c: theme.textMuted, l: 'Stress' },
                { v: 14, c: theme.hairline, l: 'Annet' },
              ]},
              { title: 'Som hjelper', segs: [
                { v: 34, c: theme.accent2, l: 'Tur' },
                { v: 30, c: theme.primary, l: 'Ring Siri' },
                { v: 22, c: theme.accent1, l: 'Dusj + søvn' },
                { v: 14, c: theme.hairline, l: 'Annet' },
              ]},
            ].map((g, i) => (
              <KordCard key={i} theme={theme} style={{ padding: 14 }}>
                <div style={{ fontFamily: theme.bodyFont, fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>{g.title}</div>
                <div style={{ display: 'flex', justifyContent: 'center' }}><Pie segments={g.segs}/></div>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {g.segs.slice(0,3).map((s, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: theme.bodyFont, fontSize: 11, color: theme.textMuted }}>
                      <span style={{ width: 7, height: 7, borderRadius: 2, background: s.c }}/>{s.l}
                    </div>
                  ))}
                </div>
              </KordCard>
            ))}
          </div>
        </div>

        {/* Numbers */}
        <div style={{ padding: '28px 20px 0' }}>
          <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.8, color: theme.textFaint, textTransform: 'uppercase' }}>Dine tall</div>
          <KordCard theme={theme} style={{ padding: 0, marginTop: 10 }}>
            {[
              { k: 'Dager uten bruk', v: '23', sub: 'siden 30. mars' },
              { k: 'Spart', v: 'kr 9 660', sub: '420 kr/dag' },
              { k: 'Dagbok-innlegg', v: '31', sub: 'snitt 1,3 per dag' },
              { k: 'Kriseplan brukt', v: '4', sub: 'alle innenfor tid' },
            ].map((r, i, arr) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 14, padding: '18px 20px',
                borderBottom: i < arr.length-1 ? `1px solid ${theme.hairline}` : 'none',
              }}>
                <div style={{ flex: 1, fontFamily: theme.bodyFont, fontSize: 14, color: theme.text }}>{r.k}</div>
                <div style={{ fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal', fontSize: 22, color: theme.text, letterSpacing: -0.3 }}>{r.v}</div>
                <div style={{ width: 94, textAlign: 'right', fontFamily: theme.monoFont, fontSize: 10, color: theme.textFaint }}>{r.sub}</div>
              </div>
            ))}
          </KordCard>
        </div>
      </div>
      <KordCrisisFab theme={theme} variant={crisisVariant} onClick={onOpenCrisis} reduceMotion={reduceMotion} style={{ bottom: 84 }}/>
      <KordTabBar theme={theme} active="overview" onChange={onNav}/>
    </div>
  );
}

// ── Kriseplan (sheet) ───────────────────────────────────────────────
function ScreenKriseplan({ theme, onClose }) {
  const steps = [
    'Pust ut lengre enn inn. Fire ganger.',
    'Drikk et glass vann, stående.',
    'Skriv ned hva kroppen kjenner nå.',
    'Gå ut eller åpne et vindu.',
    'Ring Siri eller RUSinfo.',
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.base }}>
      <div style={{ padding: '60px 20px 6px', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.8, color: theme.textFaint, textTransform: 'uppercase' }}>Kriseplan</div>
          <KordSectionTitle theme={theme} size={30} style={{ marginTop: 4 }}>Du er her. Pust.</KordSectionTitle>
        </div>
        <div onClick={onClose} style={{
          width: 34, height: 34, borderRadius: 17, background: theme.surfaceAlt,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={theme.text} strokeWidth="1.5" strokeLinecap="round"><path d="M2 2l10 10M12 2L2 12"/></svg>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 40px' }}>
        {/* breathing circle */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 18px' }}>
          <div style={{ position: 'relative', width: 140, height: 140 }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.crisis}33 0%, transparent 70%)`,
              animation: 'kordBreath 4.2s ease-in-out infinite',
            }}/>
            <div style={{
              position: 'absolute', inset: 22, borderRadius: '50%',
              border: `1px solid ${theme.crisis}88`,
              animation: 'kordBreath 4.2s ease-in-out infinite',
            }}/>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal', fontSize: 18, color: theme.text }}>pust</div>
            </div>
          </div>
        </div>

        <KordCard theme={theme} style={{ padding: 0, marginBottom: 16 }}>
          {steps.map((s, i, a) => (
            <div key={i} style={{
              display: 'flex', gap: 14, padding: '16px 20px',
              borderBottom: i < a.length-1 ? `1px solid ${theme.hairline}` : 'none',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                border: `1px solid ${theme.accent2}`, color: theme.accent2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: theme.monoFont, fontSize: 10,
              }}>{i+1}</div>
              <div style={{ fontFamily: theme.bodyFont, fontSize: 15, color: theme.text, lineHeight: 1.5 }}>{s}</div>
            </div>
          ))}
        </KordCard>

        <KordCard theme={theme} style={{ padding: 18, marginBottom: 10 }}>
          <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.8, color: theme.textFaint, textTransform: 'uppercase', marginBottom: 8 }}>Ring noen</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${theme.accent1}33, ${theme.accent2}33)`, border: `1px solid ${theme.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal', fontSize: 16, color: theme.text }}>S</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: theme.bodyFont, fontSize: 15, color: theme.text }}>Siri</div>
              <div style={{ fontFamily: theme.monoFont, fontSize: 11, color: theme.textMuted }}>+47 •• •• 42 17</div>
            </div>
            <KordButton theme={theme} variant="primary" full={false} style={{ padding: '10px 16px', fontSize: 14 }}>Ring</KordButton>
          </div>
        </KordCard>

        <div onClick={() => {}} style={{
          padding: 18, borderRadius: 18, background: theme.crisis, color: theme.primaryInk,
          display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
          boxShadow: `0 8px 22px ${theme.crisis}33`,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.primaryInk} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h3l2 5-2 1a12 12 0 006 6l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: theme.bodyFont, fontSize: 15, fontWeight: 500 }}>Ring RUSinfo</div>
            <div style={{ fontFamily: theme.monoFont, fontSize: 11, opacity: 0.85 }}>08588 · alltid åpen</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.primaryInk} strokeWidth="1.8" strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenDagbok, ScreenOversikt, ScreenKriseplan });
