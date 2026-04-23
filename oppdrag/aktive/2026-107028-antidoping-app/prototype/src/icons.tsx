import React from 'react';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

type P = { size?: number; stroke?: number; color?: string };

const Icon: React.FC<P & { children: React.ReactNode }> = ({ size = 24, stroke = 1.6, color = 'currentColor', children }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </Svg>
);

export const IconFlask = (p: P) => (<Icon {...p}><Path d="M9 3h6"/><Path d="M10 3v6.5L4.5 19a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9.5V3"/><Path d="M7 14h10"/></Icon>);
export const IconPill = (p: P) => (<Icon {...p}><Rect x="3" y="8" width="18" height="8" rx="4"/><Path d="M12 8v8"/></Icon>);
export const IconShield = (p: P) => (<Icon {...p}><Path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z"/><Path d="m9 12 2 2 4-4"/></Icon>);
export const IconBell = (p: P) => (<Icon {...p}><Path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><Path d="M10 19a2 2 0 0 0 4 0"/></Icon>);
export const IconBook = (p: P) => (<Icon {...p}><Path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z"/><Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H19"/></Icon>);
export const IconFileText = (p: P) => (<Icon {...p}><Path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><Path d="M14 3v6h6"/><Path d="M8 13h8"/><Path d="M8 17h6"/></Icon>);
export const IconLungs = (p: P) => (<Icon {...p}><Path d="M12 4v11"/><Path d="M8 5a3 3 0 0 0-3 3v6a5 5 0 0 0 5 5 2 2 0 0 0 2-2V4"/><Path d="M16 5a3 3 0 0 1 3 3v6a5 5 0 0 1-5 5 2 2 0 0 1-2-2"/></Icon>);
export const IconMegaphone = (p: P) => (<Icon {...p}><Path d="M3 11v2a2 2 0 0 0 2 2h2l7 4V5L7 9H5a2 2 0 0 0-2 2Z"/><Path d="M18 8a5 5 0 0 1 0 8"/></Icon>);
export const IconChat = (p: P) => (<Icon {...p}><Path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7l-5 4v-4H6a2 2 0 0 1-2-2Z"/></Icon>);
export const IconSearch = (p: P) => (<Icon {...p}><Circle cx="11" cy="11" r="7"/><Path d="m20 20-3.5-3.5"/></Icon>);
export const IconArrowLeft = (p: P) => (<Icon {...p}><Path d="M19 12H5"/><Path d="m11 6-6 6 6 6"/></Icon>);
export const IconArrowRight = (p: P) => (<Icon {...p}><Path d="M5 12h14"/><Path d="m13 6 6 6-6 6"/></Icon>);
export const IconX = (p: P) => (<Icon {...p}><Path d="M18 6 6 18"/><Path d="m6 6 12 12"/></Icon>);
export const IconCheck = (p: P) => (<Icon {...p}><Path d="M20 6 9 17l-5-5"/></Icon>);
export const IconInfo = (p: P) => (<Icon {...p}><Circle cx="12" cy="12" r="9"/><Path d="M12 16v-5"/><Path d="M12 8h0"/></Icon>);
export const IconAlert = (p: P) => (<Icon {...p}><Path d="M10.3 3.7 1.7 18a2 2 0 0 0 1.7 3h17.2a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z"/><Path d="M12 9v4"/><Path d="M12 17h0"/></Icon>);
export const IconUser = (p: P) => (<Icon {...p}><Circle cx="12" cy="8" r="4"/><Path d="M4 21a8 8 0 0 1 16 0"/></Icon>);
export const IconChevronRight = (p: P) => (<Icon {...p}><Path d="m9 6 6 6-6 6"/></Icon>);
export const IconChevronDown = (p: P) => (<Icon {...p}><Path d="m6 9 6 6 6-6"/></Icon>);
export const IconMail = (p: P) => (<Icon {...p}><Rect x="3" y="5" width="18" height="14" rx="2"/><Path d="m3 7 9 6 9-6"/></Icon>);
export const IconGlobe = (p: P) => (<Icon {...p}><Circle cx="12" cy="12" r="9"/><Path d="M3 12h18"/><Path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/></Icon>);
export const IconExternal = (p: P) => (<Icon {...p}><Path d="M14 4h6v6"/><Path d="M20 4 10 14"/><Path d="M20 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4"/></Icon>);
export const IconLock = (p: P) => (<Icon {...p}><Rect x="4" y="11" width="16" height="10" rx="2"/><Path d="M8 11V7a4 4 0 0 1 8 0v4"/></Icon>);
export const IconDownload = (p: P) => (<Icon {...p}><Path d="M12 4v12"/><Path d="m7 11 5 5 5-5"/><Path d="M4 20h16"/></Icon>);
export const IconPlay = (p: P) => (<Icon {...p}><Path d="M6 4v16l14-8L6 4Z" fill={p.color || 'currentColor'}/></Icon>);
export const IconBarcode = (p: P) => (<Icon {...p}><Path d="M4 6v12M7 6v12M11 6v12M14 6v12M17 6v12M20 6v12"/></Icon>);
export const IconSparkle = (p: P) => (<Icon {...p}><Path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></Icon>);
export const IconSettings = (p: P) => (<Icon {...p}><Circle cx="12" cy="12" r="3"/><Path d="M19.4 15a1.7 1.7 0 0 0 .4 1.8 2 2 0 1 1-2.8 2.8 1.7 1.7 0 0 0-1.8-.4 1.7 1.7 0 0 0-1 1.5 2 2 0 0 1-4 0 1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.4 2 2 0 1 1-2.8-2.8 1.7 1.7 0 0 0 .4-1.8 1.7 1.7 0 0 0-1.5-1 2 2 0 0 1 0-4 1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.4-1.8 2 2 0 1 1 2.8-2.8 1.7 1.7 0 0 0 1.8.4 1.7 1.7 0 0 0 1-1.5 2 2 0 0 1 4 0 1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.4 2 2 0 1 1 2.8 2.8 1.7 1.7 0 0 0-.4 1.8 1.7 1.7 0 0 0 1.5 1 2 2 0 0 1 0 4 1.7 1.7 0 0 0-1.5 1Z"/></Icon>);

export const IllustShield: React.FC<{ color: string; accent: string }> = ({ color, accent }) => (
  <Svg viewBox="0 0 200 200" width={200} height={200} fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="100" cy="100" r="88" strokeDasharray="2 4" opacity={0.4}/>
    <Path d="M100 40 L60 56 V104 C60 132 78 152 100 160 C122 152 140 132 140 104 V56 Z"/>
    <Path d="M82 102 L96 116 L120 88" stroke={accent} strokeWidth={2}/>
    <Circle cx="100" cy="100" r="56" opacity={0.3}/>
  </Svg>
);

export const IllustRunner: React.FC<{ color: string; accent: string }> = ({ color, accent }) => (
  <Svg viewBox="0 0 200 200" width={160} height={160} fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="100" cy="100" r="88" strokeDasharray="2 4" opacity={0.4}/>
    <Circle cx="100" cy="100" r="64" opacity={0.6}/>
    <Circle cx="120" cy="60" r="8"/>
    <Path d="M116 72 L100 100 L80 104 L64 128"/>
    <Path d="M100 100 L114 120 L110 148"/>
    <Path d="M114 120 L136 112"/>
    <Path d="M80 104 L72 88"/>
    <Line x1="30" y1="150" x2="60" y2="150" stroke={accent} strokeWidth={2}/>
    <Line x1="40" y1="160" x2="70" y2="160" opacity={0.5}/>
  </Svg>
);
