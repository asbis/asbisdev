// Kord screens — Onboarding + Hjem

const { KordPlaceholder, KordCard, KordButton, KordTag, KordInput,
        KordSectionTitle, KordTabBar, KordCrisisFab } = window;

// ── Onboarding: module select (slide 1) ─────────────────────────────
function ScreenOnboarding({ theme, onContinue, slide = 1, setSlide }) {
  const [module, setModule] = React.useState('stop');
  const [dateMode, setDateMode] = React.useState('today');

  const modules = [
    { id: 'stop',   title: 'Jeg vil slutte helt',        sub: 'Modul 1 · ca. 12 uker', tone: 'accent1' },
    { id: 'reduce', title: 'Jeg vil redusere bruken',    sub: 'Modul 2 · fleksibelt løp', tone: 'accent2' },
    { id: 'learn',  title: 'Jeg vil lære om kokain',     sub: 'Modul 3 · edukativ', tone: 'primary' },
  ];

  const Step = ({ n, active }) => (
    <span style={{
      width: 24, height: 3, borderRadius: 2,
      background: active ? theme.primary : theme.hairline,
    }}/>
  );

  const header = (
    <div style={{ display: 'flex', gap: 6, padding: '70px 24px 0', alignItems: 'center' }}>
      <Step n={1} active={slide >= 1}/>
      <Step n={2} active={slide >= 2}/>
      <Step n={3} active={slide >= 3}/>
      <div style={{ flex: 1 }}/>
      {slide < 3 && (
        <button onClick={onContinue} style={{
          background: 'none', border: 'none', color: theme.textMuted,
          fontFamily: theme.bodyFont, fontSize: 14, cursor: 'pointer',
        }}>Hopp over</button>
      )}
    </div>
  );

  if (slide === 1) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.base }}>
      {header}
      <div style={{ padding: '40px 24px 16px' }}>
        <KordSectionTitle theme={theme} size={34} style={{ lineHeight: 1.15 }}>
          Velkommen.<br/>Du er anonym her.
        </KordSectionTitle>
        <p style={{
          marginTop: 14, color: theme.textMuted, fontFamily: theme.bodyFont,
          fontSize: 15, lineHeight: 1.55,
        }}>Velg et utgangspunkt. Du kan bytte senere.</p>
      </div>
      <div style={{ padding: '8px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {modules.map(m => {
          const active = module === m.id;
          return (
            <div key={m.id} onClick={() => setModule(m.id)} style={{
              padding: '20px 20px', borderRadius: 20, cursor: 'pointer',
              background: active ? theme.surface : 'transparent',
              border: `1px solid ${active ? theme[m.tone] : theme.hairline}`,
              boxShadow: active ? `0 0 0 3px ${theme[m.tone]}22` : 'none',
              transition: 'all 220ms',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: active ? theme[m.tone] : 'transparent',
                  border: `1.5px solid ${active ? theme[m.tone] : theme.textFaint}`,
                }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: theme.bodyFont, fontSize: 17, color: theme.text, letterSpacing: -0.1 }}>{m.title}</div>
                  <div style={{ fontFamily: theme.bodyFont, fontSize: 13, color: theme.textMuted, marginTop: 2 }}>{m.sub}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 20px 40px' }}>
        <KordButton theme={theme} onClick={onContinue}>Fortsett</KordButton>
      </div>
    </div>
  );

  if (slide === 2) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.base }}>
      {header}
      <div style={{ padding: '40px 24px 0' }}>
        <KordSectionTitle theme={theme} size={30}>Sett en startdato.</KordSectionTitle>
        <p style={{ marginTop: 14, color: theme.textMuted, fontFamily: theme.bodyFont, fontSize: 15, lineHeight: 1.55 }}>
          Dette er utgangspunktet. Du kan endre senere hvis livet endrer seg.
        </p>
      </div>
      <div style={{ padding: '28px 20px' }}>
        <div style={{ background: theme.surface, borderRadius: 22, padding: 22, border: `1px solid ${theme.hairline}` }}>
          <div style={{ fontFamily: theme.bodyFont, fontSize: 12, letterSpacing: 1, color: theme.textFaint, textTransform: 'uppercase' }}>April 2026</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6, marginTop: 14 }}>
            {['M','T','O','T','F','L','S'].map((d,i) => (
              <div key={i} style={{ textAlign: 'center', fontFamily: theme.monoFont, fontSize: 10, color: theme.textFaint }}>{d}</div>
            ))}
            {Array.from({length: 30}).map((_,i) => {
              const day = i + 1;
              const today = day === 22;
              return (
                <div key={i} style={{
                  textAlign: 'center', padding: '8px 0', borderRadius: 10,
                  fontFamily: theme.bodyFont, fontSize: 14,
                  color: today ? theme.primaryInk : theme.text,
                  background: today ? theme.primary : 'transparent',
                }}>{day}</div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <KordButton theme={theme} onClick={onContinue}>I dag</KordButton>
        <KordButton theme={theme} variant="secondary" onClick={onContinue}>Velg en annen dato</KordButton>
      </div>
    </div>
  );

  // slide 3: privacy
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.base }}>
      {header}
      <div style={{ padding: '40px 24px 16px' }}>
        <KordSectionTitle theme={theme} size={30}>Løftet vårt.</KordSectionTitle>
      </div>
      <div style={{ padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: 26 }}>
        {[
          { k: 'Ingen data', v: 'Vi sender ingen data om deg noe sted.' },
          { k: 'Ingen konto', v: 'Det finnes ingen konto. Ingen telefonnummer. Ingen e-post.' },
          { k: 'Bare ditt', v: 'Hvis du sletter appen, er alt borte. Det er bare ditt.' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: 16 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              border: `1px solid ${theme.accent2}`, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: theme.font.head, fontSize: 14, fontStyle: theme.font.italic ? 'italic' : 'normal',
              color: theme.accent2,
            }}>{i+1}</div>
            <div>
              <div style={{ fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal', fontSize: 18, color: theme.text, marginBottom: 3 }}>{r.k}</div>
              <div style={{ fontFamily: theme.bodyFont, fontSize: 15, color: theme.textMuted, lineHeight: 1.55 }}>{r.v}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 20px 40px' }}>
        <KordButton theme={theme} onClick={onContinue}>Kom i gang</KordButton>
      </div>
    </div>
  );
}

// ── Home ────────────────────────────────────────────────────────────
function ScreenHome({ theme, layout = 'greeting-first', onOpenCrisis, onNav, crisisVariant, reduceMotion }) {
  const [mood, setMood] = React.useState(null);
  const [checkDone, setCheckDone] = React.useState(false);

  const day = 23; // days since startdato
  const greeting = 'God kveld.';

  const Greeting = (
    <div style={{ padding: '8px 24px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.accent1}33, ${theme.accent2}33)`,
          border: `1px solid ${theme.hairline}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: theme.font.head, fontSize: 15, color: theme.text,
          fontStyle: theme.font.italic ? 'italic' : 'normal',
        }}>m</div>
        <div style={{ fontFamily: theme.bodyFont, fontSize: 14, color: theme.textMuted }}>{greeting}</div>
      </div>
      <div style={{ position: 'relative', marginTop: 20, height: 130 }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 180, height: 180, borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          animation: reduceMotion ? 'none' : 'kordPulse 4.5s ease-in-out infinite',
        }}/>
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{
            fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal',
            fontSize: 88, lineHeight: 1, color: theme.text, letterSpacing: -2,
          }}>{day}</div>
          <div style={{ marginTop: 6, fontFamily: theme.bodyFont, fontSize: 13, color: theme.textMuted, letterSpacing: 0.5 }}>
            dager siden 30. mars
          </div>
        </div>
      </div>
    </div>
  );

  const CheckIn = (
    <div style={{ padding: '24px 20px 0' }}>
      <KordCard theme={theme} style={{ padding: 22 }}>
        <KordSectionTitle theme={theme} size={22}>Hvordan har du det i dag?</KordSectionTitle>
        <div style={{ marginTop: 6, fontFamily: theme.bodyFont, fontSize: 13, color: theme.textMuted }}>
          Ett tap. Du kan endre senere.
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          {[
            { id: 'good', emoji: '🌱', label: 'Bra' },
            { id: 'grey', emoji: '🌫', label: 'Gråsone' },
            { id: 'heavy', emoji: '🌊', label: 'Tung' },
          ].map(m => {
            const active = mood === m.id;
            return (
              <div key={m.id} onClick={() => { setMood(m.id); setCheckDone(true); setTimeout(() => setCheckDone(false), 1800); }} style={{
                flex: 1, padding: '16px 8px 12px', textAlign: 'center', borderRadius: 16,
                background: active ? theme.surfaceAlt : 'transparent',
                border: `1px solid ${active ? theme.accent2 : theme.hairline}`,
                cursor: 'pointer', transition: 'all 200ms',
              }}>
                <div style={{ fontSize: 24 }}>{m.emoji}</div>
                <div style={{ fontFamily: theme.bodyFont, fontSize: 12, color: theme.textMuted, marginTop: 4 }}>{m.label}</div>
              </div>
            );
          })}
        </div>
        {checkDone && (
          <div style={{
            marginTop: 14, display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: theme.bodyFont, fontSize: 12, color: theme.accent2,
            animation: 'kordFadeIn 240ms ease-out',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={theme.accent2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="7" style={{ animation: 'kordGrow 400ms ease-out' }}/>
              <path d="M5 8.5L7 10.5 11 6"/>
            </svg>
            Lagret i dagboka.
          </div>
        )}
      </KordCard>
    </div>
  );

  const Resources = (
    <div style={{ padding: '24px 0 20px' }}>
      <div style={{ padding: '0 20px 10px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <KordSectionTitle theme={theme} size={18}>Nå for deg</KordSectionTitle>
        <span style={{ fontFamily: theme.bodyFont, fontSize: 12, color: theme.textFaint }}>5 kort</span>
      </div>
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px 4px', scrollbarWidth: 'none' }}>
        {[
          { h: 'Ukens tema', t: 'Når kroppen vil ha', sub: '4 min lesing', tone: 'accent1' },
          { h: 'Kriseplan', t: 'Tre linjer du har skrevet', sub: 'oppdatert tirs.', tone: 'crisis' },
          { h: 'Spart', t: 'kr 9 660', sub: 'siste 23 dager', tone: 'accent2' },
          { h: 'Prestasjon', t: 'Én måned', sub: 'om 7 dager', tone: 'primary' },
        ].map((c, i) => (
          <div key={i} style={{
            minWidth: 170, padding: '16px 16px 18px', borderRadius: 18,
            background: theme.surface, border: `1px solid ${theme.hairline}`,
          }}>
            <div style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.8, color: theme[c.tone] || theme.accent1, textTransform: 'uppercase', marginBottom: 8 }}>{c.h}</div>
            <div style={{ fontFamily: theme.font.head, fontStyle: theme.font.italic ? 'italic' : 'normal', fontSize: 22, color: theme.text, lineHeight: 1.15, letterSpacing: -0.3 }}>{c.t}</div>
            <div style={{ marginTop: 8, fontFamily: theme.bodyFont, fontSize: 12, color: theme.textMuted }}>{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: theme.base }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 54, paddingBottom: 10 }}>
        {layout === 'greeting-first' ? <>{Greeting}{CheckIn}{Resources}</> : <>{CheckIn}{Greeting}{Resources}</>}
      </div>
      <KordCrisisFab theme={theme} variant={crisisVariant} onClick={onOpenCrisis} reduceMotion={reduceMotion} style={{ bottom: 84 }}/>
      <KordTabBar theme={theme} active="home" onChange={onNav}/>
    </div>
  );
}

Object.assign(window, { ScreenOnboarding, ScreenHome });
