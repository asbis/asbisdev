// Kord prototype app — ties screens together with interactive nav + tweaks

const { ScreenOnboarding, ScreenHome, ScreenDagbok, ScreenOversikt,
        ScreenKriseplan, ScreenPrestasjoner, ScreenInfo, ScreenVegg, ScreenKalender } = window;

function KordApp({ defaults = {}, embedded = false }) {
  const TWEAKS = /*EDITMODE-BEGIN*/{
    "palette": "A",
    "dark": false,
    "grayscale": false,
    "font": "Instrument Serif",
    "homeLayout": "greeting-first",
    "crisisVariant": "hand",
    "reduceMotion": false
  }/*EDITMODE-END*/;

  const [state, setState] = React.useState({ ...TWEAKS, ...defaults });
  const [screen, setScreen] = React.useState(defaults.initial || 'onboarding-1');
  const [crisisOpen, setCrisisOpen] = React.useState(false);
  const [showTweaks, setShowTweaks] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  const theme = window.kordTheme({ palette: state.palette, dark: state.dark, grayscale: state.grayscale, font: state.font });

  // Edit mode handshake
  React.useEffect(() => {
    if (embedded) return;
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') { setEditMode(true); setShowTweaks(true); }
      if (e.data?.type === '__deactivate_edit_mode') { setEditMode(false); setShowTweaks(false); }
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, [embedded]);

  const updateState = (edits) => {
    const next = { ...state, ...edits };
    setState(next);
    if (!embedded) {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    }
  };

  const onNav = (tab) => {
    const map = { home: 'home', dagbok: 'dagbok', overview: 'overview', achievements: 'achievements', info: 'info' };
    setScreen(map[tab]);
  };
  const onOpenCrisis = () => setCrisisOpen(true);

  const sharedProps = {
    theme, onNav,
    onOpenCrisis,
    crisisVariant: state.crisisVariant,
    reduceMotion: state.reduceMotion,
  };

  const renderScreen = () => {
    if (crisisOpen) return <ScreenKriseplan theme={theme} onClose={() => setCrisisOpen(false)}/>;
    switch (screen) {
      case 'onboarding-1': return <ScreenOnboarding theme={theme} slide={1} onContinue={() => setScreen('onboarding-2')}/>;
      case 'onboarding-2': return <ScreenOnboarding theme={theme} slide={2} onContinue={() => setScreen('onboarding-3')}/>;
      case 'onboarding-3': return <ScreenOnboarding theme={theme} slide={3} onContinue={() => setScreen('home')}/>;
      case 'home': return <ScreenHome {...sharedProps} layout={state.homeLayout}/>;
      case 'dagbok': return <ScreenDagbok {...sharedProps}/>;
      case 'dagbok-empty': return <ScreenDagbok {...sharedProps} empty/>;
      case 'overview': return <ScreenOversikt {...sharedProps}/>;
      case 'achievements': return <ScreenPrestasjoner {...sharedProps}/>;
      case 'info': return <ScreenInfo {...sharedProps}/>;
      case 'vegg': return <ScreenVegg theme={theme} onBack={() => setScreen('home')}/>;
      case 'kalender': return <ScreenKalender theme={theme} onBack={() => setScreen('home')}/>;
      default: return <ScreenHome {...sharedProps} layout={state.homeLayout}/>;
    }
  };

  const body = (
    <div key={screen + String(crisisOpen)} style={{
      width: '100%', height: '100%', animation: state.reduceMotion ? 'none' : 'kordFadeSlide 280ms cubic-bezier(0.22,1,0.36,1)',
    }}>
      {renderScreen()}
    </div>
  );

  // Standalone: wrap in iOS frame, centred
  if (!embedded) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: state.dark ? '#05040A' : '#E8E3DA',
        padding: 40,
        fontFamily: theme.bodyFont,
      }}>
        <div style={{ position: 'relative' }}>
          <IOSDevice dark={state.dark}>
            {body}
          </IOSDevice>
          {/* Quick nav rail for demo purposes */}
          <KordDemoRail state={state} screen={screen} setScreen={setScreen}/>
        </div>
        {showTweaks && (
          <KordTweaksPanel state={state} updateState={updateState} onClose={() => setShowTweaks(false)}/>
        )}
      </div>
    );
  }

  // Embedded (canvas artboard): no frame, no rail
  return <div style={{ width: '100%', height: '100%' }}>{body}</div>;
}

// ── Side rail for demo navigation (always visible in prototype) ─────
function KordDemoRail({ state, screen, setScreen }) {
  const theme = window.kordTheme({ palette: state.palette, dark: state.dark, grayscale: state.grayscale, font: state.font });
  const stops = [
    { g: 'Onboarding', items: [
      ['onboarding-1', '1 · Modulvalg'],
      ['onboarding-2', '2 · Startdato'],
      ['onboarding-3', '3 · Løfte'],
    ]},
    { g: 'App', items: [
      ['home', 'Hjem'],
      ['dagbok', 'Dagbok'],
      ['dagbok-empty', 'Dagbok tom'],
      ['overview', 'Oversikt'],
      ['achievements', 'Prestasjoner'],
      ['info', 'Info'],
    ]},
    { g: 'Ekstra', items: [
      ['vegg', 'Motivasjonsvegg'],
      ['kalender', 'Kartlegging'],
    ]},
  ];
  const darkUI = state.dark;
  return (
    <div style={{
      position: 'absolute', left: -220, top: 0, width: 200,
      fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
      color: darkUI ? 'rgba(255,255,255,0.7)' : '#4a4035',
    }}>
      <div style={{
        fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic',
        fontSize: 28, color: darkUI ? '#f1eadf' : '#231F1C', letterSpacing: -0.5,
      }}>Kord</div>
      <div style={{ fontSize: 11, marginTop: 2, marginBottom: 18, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.6, fontFamily: 'IBM Plex Mono, monospace' }}>prototype · tapp</div>
      {stops.map((s, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase', opacity: 0.5, fontFamily: 'IBM Plex Mono, monospace', marginBottom: 6 }}>{s.g}</div>
          {s.items.map(([id, label]) => {
            const active = screen === id;
            return (
              <div key={id} onClick={() => setScreen(id)} style={{
                padding: '5px 8px', borderRadius: 6, cursor: 'pointer',
                fontSize: 13, color: active ? (darkUI ? '#f1eadf' : '#231F1C') : 'inherit',
                background: active ? (darkUI ? 'rgba(255,255,255,0.08)' : 'rgba(35,31,28,0.06)') : 'transparent',
                marginBottom: 1,
              }}>{label}</div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ── Tweaks panel ────────────────────────────────────────────────────
function KordTweaksPanel({ state, updateState, onClose }) {
  const Section = ({ label, children }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase', color: '#888', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
  const Row = ({ options, value, onChange }) => (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {options.map(o => (
        <div key={o.v} onClick={() => onChange(o.v)} style={{
          padding: '6px 10px', borderRadius: 8, cursor: 'pointer',
          fontSize: 12, fontFamily: 'IBM Plex Sans, system-ui',
          background: value === o.v ? '#231F1C' : '#f5f2ec',
          color: value === o.v ? '#fff' : '#231F1C',
        }}>{o.l}</div>
      ))}
    </div>
  );
  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{
      width: 36, height: 20, borderRadius: 12, background: value ? '#6B5544' : '#d4ccc0',
      position: 'relative', cursor: 'pointer', transition: 'background 180ms',
    }}>
      <div style={{ position: 'absolute', top: 2, left: value ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 180ms' }}/>
    </div>
  );
  return (
    <div style={{
      position: 'fixed', right: 20, top: 20, width: 260, zIndex: 100,
      background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 18,
      boxShadow: '0 12px 40px rgba(0,0,0,0.14)', padding: 18,
      fontFamily: 'IBM Plex Sans, system-ui, sans-serif', color: '#231F1C',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 22 }}>Tweaks</div>
        <div style={{ flex: 1 }}/>
        <div onClick={onClose} style={{ cursor: 'pointer', fontSize: 14, opacity: 0.5 }}>×</div>
      </div>
      <Section label="Palett">
        <Row value={state.palette} onChange={v => updateState({ palette: v })}
          options={[{v:'A',l:'Varm stein'},{v:'B',l:'Stille vann'},{v:'C',l:'Nordlys'}]}/>
      </Section>
      <Section label="Modus">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, marginBottom: 8 }}>
          <Toggle value={state.dark} onChange={v => updateState({ dark: v })}/>Mørk (OLED)
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, marginBottom: 8 }}>
          <Toggle value={state.grayscale} onChange={v => updateState({ grayscale: v })}/>Gråskala
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
          <Toggle value={state.reduceMotion} onChange={v => updateState({ reduceMotion: v })}/>Redusert bevegelse
        </div>
      </Section>
      <Section label="Overskriftsfont">
        <Row value={state.font} onChange={v => updateState({ font: v })}
          options={[{v:'Instrument Serif',l:'Instr.'},{v:'Lora',l:'Lora'},{v:'Source Serif Pro',l:'Source'},{v:'IBM Plex Serif',l:'Plex'}]}/>
      </Section>
      <Section label="Hjem-layout">
        <Row value={state.homeLayout} onChange={v => updateState({ homeLayout: v })}
          options={[{v:'greeting-first',l:'Hilsen først'},{v:'checkin-first',l:'Check-in først'}]}/>
      </Section>
      <Section label="Kriseknapp">
        <Row value={state.crisisVariant} onChange={v => updateState({ crisisVariant: v })}
          options={[{v:'hand',l:'Hånd'},{v:'shield',l:'Skjold'},{v:'circle',l:'Sirkel'},{v:'ring',l:'Ring'}]}/>
      </Section>
    </div>
  );
}

Object.assign(window, { KordApp, KordTweaksPanel });
