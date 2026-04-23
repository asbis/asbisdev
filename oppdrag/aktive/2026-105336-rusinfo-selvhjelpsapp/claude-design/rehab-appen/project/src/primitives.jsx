// Kord — shared design primitives. All components consume `theme` (from kordTheme).

// ── Placeholder image with monospace label ──────────────────────────
function KordPlaceholder({ label = 'photo', theme, height = 160, tone = 'accent1' }) {
  const color = theme[tone] || theme.accent1;
  return (
    <div style={{
      height, borderRadius: 18, position: 'relative', overflow: 'hidden',
      background: `repeating-linear-gradient(135deg, ${color}22 0 12px, ${color}11 12px 24px)`,
      border: `1px solid ${theme.hairline}`,
    }}>
      <div style={{
        position: 'absolute', left: 12, bottom: 10,
        fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.4,
        color: theme.textMuted, textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
}

// ── Soft card ───────────────────────────────────────────────────────
function KordCard({ children, theme, style = {}, onClick, padded = true, interactive }) {
  return (
    <div onClick={onClick} style={{
      background: theme.surface, borderRadius: 20,
      border: `1px solid ${theme.hairline}`,
      padding: padded ? 20 : 0,
      cursor: interactive || onClick ? 'pointer' : 'default',
      transition: 'transform 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 240ms',
      ...style,
    }}>{children}</div>
  );
}

// ── Primary / secondary button ──────────────────────────────────────
function KordButton({ children, theme, variant = 'primary', onClick, style = {}, full = true }) {
  const base = {
    width: full ? '100%' : undefined, border: 'none', cursor: 'pointer',
    fontFamily: theme.bodyFont, fontSize: 16, fontWeight: 500,
    padding: '16px 20px', borderRadius: 14, letterSpacing: -0.1,
    transition: 'transform 180ms, background 180ms, opacity 180ms',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  };
  if (variant === 'primary') return (
    <button onClick={onClick} style={{ ...base, background: theme.primary, color: theme.primaryInk, ...style }}>{children}</button>
  );
  if (variant === 'ghost') return (
    <button onClick={onClick} style={{ ...base, background: 'transparent', color: theme.text, ...style }}>{children}</button>
  );
  // text-underline secondary
  return (
    <button onClick={onClick} style={{ ...base, background: 'transparent', color: theme.textMuted, textDecoration: 'underline', textUnderlineOffset: 4, ...style }}>{children}</button>
  );
}

// ── Tag (small pill) ────────────────────────────────────────────────
function KordTag({ children, theme, tone }) {
  const color = tone ? theme[tone] : theme.textMuted;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 999,
      border: `1px solid ${theme.hairline}`,
      fontFamily: theme.bodyFont, fontSize: 12, letterSpacing: 0.1,
      color, background: 'transparent',
    }}>{children}</span>
  );
}

// ── Bottom-line input (Material-style, per brief) ───────────────────
function KordInput({ placeholder, value, onChange, theme, multiline, rows = 1 }) {
  const Comp = multiline ? 'textarea' : 'input';
  return (
    <Comp
      value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      style={{
        width: '100%', border: 'none', borderBottom: `1px solid ${theme.hairline}`,
        background: 'transparent', padding: '10px 2px', resize: 'none',
        fontFamily: theme.bodyFont, fontSize: 16, color: theme.text,
        outline: 'none', letterSpacing: -0.1,
      }}
    />
  );
}

// ── Section header in serif ─────────────────────────────────────────
function KordSectionTitle({ children, theme, size = 22, style }) {
  return (
    <h2 style={{
      fontFamily: theme.font.head, fontWeight: 400, fontSize: size,
      color: theme.text, margin: 0, letterSpacing: -0.3, lineHeight: 1.2,
      fontStyle: theme.font.italic ? 'italic' : 'normal', ...style,
    }}>{children}</h2>
  );
}

// ── Tab bar ─────────────────────────────────────────────────────────
function KordTabBar({ active = 'home', onChange, theme }) {
  const tabs = [
    { id: 'home',   label: 'Hjem' },
    { id: 'dagbok', label: 'Dagbok' },
    { id: 'overview', label: 'Oversikt' },
    { id: 'achievements', label: 'Prestasjoner' },
    { id: 'info',   label: 'Info' },
  ];
  const icon = (id, active) => {
    const c = active ? theme.primary : theme.textFaint;
    const s = { width: 22, height: 22, fill: 'none', stroke: c, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
    switch (id) {
      case 'home':   return <svg {...s} viewBox="0 0 24 24"><path d="M3 11.5L12 4l9 7.5M5 10v9h5v-5h4v5h5v-9"/></svg>;
      case 'dagbok':   return <svg {...s} viewBox="0 0 24 24"><path d="M6 4h11a2 2 0 012 2v13a1 1 0 01-1.5.87L14 17.5 9.5 19.87A1 1 0 018 19V6a2 2 0 012-2z"/><path d="M9 9h7M9 12h5"/></svg>;
      case 'overview': return <svg {...s} viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>;
      case 'achievements': return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="9" r="5"/><path d="M8.5 13L7 21l5-3 5 3-1.5-8"/></svg>;
      case 'info': return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M11 12h1v5h1"/></svg>;
    }
  };
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'stretch',
      padding: '8px 4px 14px', background: theme.surface,
      borderTop: `1px solid ${theme.hairline}`,
    }}>
      {tabs.map(t => (
        <div key={t.id} onClick={() => onChange && onChange(t.id)} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          padding: '8px 2px', cursor: 'pointer', userSelect: 'none',
        }}>
          {icon(t.id, active === t.id)}
          <div style={{
            fontFamily: theme.bodyFont, fontSize: 10, letterSpacing: 0.1,
            color: active === t.id ? theme.primary : theme.textFaint,
          }}>{t.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Crisis FAB — breathing, three variants ──────────────────────────
function KordCrisisFab({ theme, variant = 'hand', onClick, reduceMotion = false, style = {} }) {
  const ink = theme.primaryInk;
  const bg = theme.crisis;
  const size = 60;
  const glyph = (() => {
    if (variant === 'shield') return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 3v6c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V6l8-3z"/>
      </svg>
    );
    if (variant === 'circle') return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.6">
        <circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.3" fill={ink}/>
      </svg>
    );
    if (variant === 'ring') return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.4">
        <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6" opacity="0.6"/><circle cx="12" cy="12" r="3" opacity="0.3"/>
      </svg>
    );
    // open hand — default
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 10V5.5a1.5 1.5 0 013 0V10"/>
        <path d="M11 10V4a1.5 1.5 0 013 0v6"/>
        <path d="M14 10V5.5a1.5 1.5 0 013 0V12"/>
        <path d="M8 10v2l-2.3-2a1.4 1.4 0 00-2 2l4.8 5.5A5 5 0 0012 19h1a5 5 0 005-5v-4"/>
      </svg>
    );
  })();
  return (
    <div onClick={onClick} style={{
      position: 'absolute', right: 18, bottom: 90, width: size, height: size,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', zIndex: 20, ...style,
    }}>
      {/* breathing ring */}
      {!reduceMotion && (
        <span aria-hidden style={{
          position: 'absolute', inset: -6, borderRadius: '50%',
          background: bg, opacity: 0.25, animation: 'kordBreath 3.2s ease-in-out infinite',
        }}/>
      )}
      <div style={{
        width: size, height: size, borderRadius: '50%', background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 10px 24px ${bg}55, 0 2px 0 rgba(255,255,255,0.25) inset`,
      }}>{glyph}</div>
    </div>
  );
}

Object.assign(window, {
  KordPlaceholder, KordCard, KordButton, KordTag, KordInput,
  KordSectionTitle, KordTabBar, KordCrisisFab,
});
