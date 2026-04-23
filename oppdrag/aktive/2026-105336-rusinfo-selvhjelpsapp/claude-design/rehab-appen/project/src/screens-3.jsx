// Kord screens 3 — Prestasjoner, Info, Motivasjonsvegg, Kalender

const { KordPlaceholder, KordCard, KordButton, KordTag, KordInput,
        KordSectionTitle, KordTabBar, KordCrisisFab } = window;

// ── Prestasjoner ────────────────────────────────────────────────────
function ScreenPrestasjoner({ theme, onNav, onOpenCrisis, crisisVariant, reduceMotion }) {
  const items = [
    { id: 'next', kind: 'next',  title: 'Én måned ren', date: 'om 7 dager', desc: '30 dager siden startdato.' },
    { id: 0, date: '17. apr', title: '23 dager', desc: 'Du har passert første kritiske fase.', icon: 'disk' },
    { id: 1, date: '10. apr', title: 'Ti dager', desc: 'Søvn-mønsteret har begynt å normalisere seg.', icon: 'arc' },
    { id: 2, date: '07. apr', title: 'Første kriseplan brukt', desc: 'Du valgte planen fremfor bruk.', icon: 'hand' },
    { id: 3, date: '03. apr', title: 'Første uke', desc: 'Syv dager. Kroppens første rydding.', icon: 'line' },
    { id: 4, date: '30. mar', title: 'Startdato satt', desc: 'Du åpnet døra.', icon: 'dot' },
  ];

  const glyph = (k, c) => {
    const s = { width: 20, height: 20, fill: 'none', stroke: c, strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
    if (k === 'disk') return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>;
    if (k === 'arc') return <svg {...s} viewBox="0 0 24 24"><path d="M4 18a8 8 0 0116 0"/><path d="M12 18V6"/></svg>;
    if (k === 'hand') return <svg {...s} viewBox="0 0 24 24"><path d="M8 10V6a1.5 1.5 0 013 0v4M11 10V4a1.5 1.5 0 013 0v6M14 10V6a1.5 1.5 0 013 0v6M8 10l-2-2a1.4 1.4 0 00-2 2l4.5 5.5A5 5 0 0012 18h1a5 5 0 005-5v-3"/></svg>;
    if (k === 'line') return <svg {...s} viewBox="0 0 24 24"><path d="M4 12h16M8 8v8M16 8v8"/></svg>;
    return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/></svg>;
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.base }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '60px 0 20px' }}>
        <div style={{ padding: '0 20px 8px' }}>
          <KordSectionTitle theme={theme} size={34}>Prestasjoner</KordSectionTitle>
        </div>
        <div style={{ padding: '18px 24px 0', position: 'relative' }}>
          {/* vertical connector */}
          <div style={{ position: 'absolute', left: 35, top: 30, bottom: 10, width: 1, background: theme.hairline }}/>
          {items.map((it, i) => {
            const isNext = it.kind === 'next';
            return (
              <div key={it.id} style={{ display: 'flex', gap: 16, paddingBottom: 26, position: 'relative' }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                  background: isNext ? 'transparent' : theme.surface,
                  border: `1px solid ${isNext ? theme.accent1 : theme.hairline}`,
                  borderStyle: isNext ? 'dashed' : 'solid',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', zIndex: 1,
                }}>
                  {!isNext && glyph(it.icon, theme.accent1)}
                  {isNext && <span style={{ width: 6, height: 6, borderRadius: 3, background: theme.accent1 }}/>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.6, color: isNext ? theme.accent1 : theme.textFaint, textTransform: 'uppercase' }}>
                    {isNext ? `Neste · ${it.date}` : it.date}
                  </div>
                  <div style={{ fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal', fontSize: 22, color: theme.text, marginTop: 2, letterSpacing: -0.3 }}>
                    {it.title}
                  </div>
                  <div style={{ marginTop: 4, fontFamily: theme.bodyFont, fontSize: 13, color: theme.textMuted, lineHeight: 1.5 }}>
                    {it.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <KordCrisisFab theme={theme} variant={crisisVariant} onClick={onOpenCrisis} reduceMotion={reduceMotion} style={{ bottom: 84 }}/>
      <KordTabBar theme={theme} active="achievements" onChange={onNav}/>
    </div>
  );
}

// ── Info ────────────────────────────────────────────────────────────
function ScreenInfo({ theme, onNav, onOpenCrisis, crisisVariant, reduceMotion }) {
  const hubs = [
    { k: 'Kropp & hjerne', n: 12, tone: 'accent1' },
    { k: 'Når trangen kommer', n: 8, tone: 'crisis' },
    { k: 'Søvn & energi', n: 6, tone: 'accent2' },
    { k: 'Relasjoner', n: 5, tone: 'primary' },
    { k: 'Hjelp i Norge', n: 9, tone: 'accent1' },
  ];
  const articles = [
    { title: 'Hvorfor kroppen lurer deg etter tre uker.', time: '6 min', tag: 'kropp' },
    { title: 'Trygge samtaler med nære uten å skamme.', time: '4 min', tag: 'relasjoner' },
    { title: 'Hva søvnapneadetektor faktisk måler.', time: '3 min', tag: 'søvn' },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.base }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '60px 0 20px' }}>
        <div style={{ padding: '0 20px 8px' }}>
          <KordSectionTitle theme={theme} size={34}>Info</KordSectionTitle>
        </div>
        <div style={{ padding: '14px 20px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
            background: theme.surface, borderRadius: 14, border: `1px solid ${theme.hairline}`,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
            <div style={{ flex: 1, fontFamily: theme.bodyFont, fontSize: 14, color: theme.textFaint }}>Søk i artikler, temaer, hjelp…</div>
          </div>
        </div>
        <div style={{ padding: '6px 20px' }}>
          <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.8, color: theme.textFaint, textTransform: 'uppercase', marginBottom: 10 }}>Temaer</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {hubs.map((h, i) => (
              <div key={i} style={{
                padding: '16px 16px', borderRadius: 16, background: theme.surface,
                border: `1px solid ${theme.hairline}`, display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `${theme[h.tone]}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: theme[h.tone] }}/>
                </div>
                <div style={{ flex: 1, fontFamily: theme.bodyFont, fontSize: 15, color: theme.text }}>{h.k}</div>
                <div style={{ fontFamily: theme.monoFont, fontSize: 11, color: theme.textFaint }}>{h.n}</div>
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke={theme.textFaint} strokeWidth="1.6" strokeLinecap="round"><path d="M2 2l6 6-6 6"/></svg>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '26px 20px 0' }}>
          <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.8, color: theme.textFaint, textTransform: 'uppercase', marginBottom: 10 }}>Nye artikler</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {articles.map((a, i) => (
              <div key={i} style={{ paddingBottom: 14, borderBottom: i < articles.length-1 ? `1px solid ${theme.hairline}` : 'none' }}>
                <div style={{ fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal', fontSize: 19, color: theme.text, lineHeight: 1.25, letterSpacing: -0.3 }}>{a.title}</div>
                <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'center', fontFamily: theme.monoFont, fontSize: 11, color: theme.textFaint }}>
                  <span>{a.time}</span><span>·</span><span>#{a.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <KordCrisisFab theme={theme} variant={crisisVariant} onClick={onOpenCrisis} reduceMotion={reduceMotion} style={{ bottom: 84 }}/>
      <KordTabBar theme={theme} active="info" onChange={onNav}/>
    </div>
  );
}

// ── Motivasjonsvegg ─────────────────────────────────────────────────
function ScreenVegg({ theme, onBack }) {
  const posts = [
    { tone: 'accent1', label: 'still water', quote: 'Jeg er ikke ferdig. Jeg bygger.', date: '22. apr' },
    { tone: 'accent2', label: 'mountains', quote: 'Sakte er fortsatt fremover.', date: '20. apr' },
    { tone: 'primary', label: 'morning light', quote: 'Én dag til, én dag til.', date: '15. apr' },
    { tone: 'accent1', label: 'ceramic', quote: 'Ting kan gå i stykker og bygges igjen.', date: '10. apr' },
    { tone: 'accent2', label: 'forest floor', quote: 'Jeg velger hvem jeg blir i morgen.', date: '07. apr' },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.base }}>
      <div style={{ padding: '60px 20px 6px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div onClick={onBack} style={{ width: 34, height: 34, borderRadius: 17, background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={theme.text} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2L3 7l6 5"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.8, color: theme.textFaint, textTransform: 'uppercase' }}>Motivasjonsvegg</div>
          <KordSectionTitle theme={theme} size={26}>Ditt galleri.</KordSectionTitle>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {posts.map((p, i) => (
            <div key={i} style={{
              borderRadius: 18, overflow: 'hidden', border: `1px solid ${theme.hairline}`,
              background: theme.surface, aspectRatio: i === 0 ? '1/1.35' : '1/1.15',
              gridColumn: i === 0 ? '1 / -1' : 'auto',
              position: 'relative', padding: 14, display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(160deg, ${theme[p.tone]}66 0%, ${theme[p.tone]}22 40%, ${theme.surface} 100%)`,
              }}/>
              <div style={{
                position: 'absolute', inset: 0,
                background: `repeating-linear-gradient(45deg, transparent 0 18px, ${theme[p.tone]}14 18px 19px)`,
              }}/>
              <div style={{ position: 'relative', fontFamily: theme.monoFont, fontSize: 9, letterSpacing: 0.5, color: theme.textMuted, textTransform: 'uppercase' }}>photo: {p.label}</div>
              <div style={{ flex: 1 }}/>
              <div style={{ position: 'relative' }}>
                <div style={{ fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal', fontSize: i === 0 ? 24 : 16, color: theme.text, lineHeight: 1.2, letterSpacing: -0.3 }}>
                  {p.quote}
                </div>
                <div style={{ marginTop: 6, fontFamily: theme.monoFont, fontSize: 10, color: theme.textFaint }}>{p.date}</div>
              </div>
            </div>
          ))}
          <div style={{
            aspectRatio: '1/1.15', borderRadius: 18, border: `1.5px dashed ${theme.hairline}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
            color: theme.textMuted,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            <div style={{ fontFamily: theme.bodyFont, fontSize: 13 }}>Ny vegg</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Kartlegging kalender ────────────────────────────────────────────
function ScreenKalender({ theme, onBack }) {
  // 28-day grid: planned (bg) vs actual (fg)
  const weeks = 4;
  const days = Array.from({length: 28}).map((_, i) => {
    // plan: a few planned days in weeks 1-2
    const planned = [2, 5, 9, 13, 17, 21].includes(i);
    // actual: matched on some, extra on others, missed some
    const actual = [2, 5, 9, 17].includes(i); // kept
    const extra  = [12].includes(i);           // unplanned
    return { i, planned, actual, extra, date: i + 1 };
  });
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.base }}>
      <div style={{ padding: '60px 20px 6px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div onClick={onBack} style={{ width: 34, height: 34, borderRadius: 17, background: theme.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={theme.text} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2L3 7l6 5"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.8, color: theme.textFaint, textTransform: 'uppercase' }}>Kartlegging</div>
          <KordSectionTitle theme={theme} size={26}>Planlagt vs. faktisk.</KordSectionTitle>
        </div>
      </div>
      <div style={{ padding: '10px 20px 6px', display: 'flex', gap: 16, fontFamily: theme.bodyFont, fontSize: 11, color: theme.textMuted }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: `${theme.accent2}40`, border: `1px dashed ${theme.accent2}` }}/>planlagt</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: theme.accent1 }}/>faktisk</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: theme.crisis }}/>ekstra</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 30px' }}>
        <KordCard theme={theme} style={{ padding: 16 }}>
          <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.6, color: theme.textFaint, textTransform: 'uppercase' }}>Periode · 4 uker</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginTop: 12 }}>
            {['M','T','O','T','F','L','S'].map((d,i) => (
              <div key={i} style={{ textAlign: 'center', fontFamily: theme.monoFont, fontSize: 9, color: theme.textFaint }}>{d}</div>
            ))}
            {days.map((d) => {
              const bg = d.planned ? `${theme.accent2}30` : 'transparent';
              const border = d.planned ? `1px dashed ${theme.accent2}` : `1px solid ${theme.hairline}`;
              const fg = d.actual ? theme.accent1 : d.extra ? theme.crisis : null;
              return (
                <div key={d.i} style={{
                  aspectRatio: '1/1', borderRadius: 10, background: bg, border,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                }}>
                  <span style={{ fontFamily: theme.monoFont, fontSize: 10, color: theme.textMuted }}>{d.date}</span>
                  {fg && (
                    <span style={{
                      position: 'absolute', right: 4, bottom: 4, width: 8, height: 8, borderRadius: '50%', background: fg,
                    }}/>
                  )}
                </div>
              );
            })}
          </div>
        </KordCard>
        <div style={{ marginTop: 16, padding: 16, borderRadius: 18, background: theme.surfaceAlt, border: `1px solid ${theme.hairline}` }}>
          <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.6, color: theme.textFaint, textTransform: 'uppercase' }}>Sammenligning</div>
          <div style={{ marginTop: 8, fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal', fontSize: 20, color: theme.text, lineHeight: 1.3 }}>
            Du holdt planen på 4 av 6 dager. Én uplanlagt bruk, tirsdag den 13.
          </div>
          <div style={{ marginTop: 10, fontFamily: theme.bodyFont, fontSize: 13, color: theme.textMuted, lineHeight: 1.55 }}>
            Tirsdag er tilbakevendende. Vil du legge inn en "varm tirsdag"-plan neste uke?
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenPrestasjoner, ScreenInfo, ScreenVegg, ScreenKalender });
