"use client";

import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "../../../oppdrag/oppdrag.css";

export default function AntidopingPage({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = useState<any>("no");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    params.then(p => setLang(p.lang));

    // Simple mobile detection for layout purposes
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Build a URL that the QR code points to. On localhost, fetch the LAN IP
    // so phones on the same wifi can reach the dev server.
    const buildUrl = async () => {
      let host = window.location.hostname;
      const port = window.location.port ? `:${window.location.port}` : "";
      const proto = window.location.protocol;
      if (host === 'localhost' || host === '127.0.0.1') {
        try {
          const res = await fetch('/api/lan-host', { cache: 'no-store' });
          const json = await res.json();
          if (json?.lanHost) host = json.lanHost;
        } catch { /* fall back to localhost (won't work from phone but won't crash) */ }
      }
      setShareUrl(`${proto}//${host}${port}${window.location.pathname}`);
    };
    buildUrl();

    return () => window.removeEventListener('resize', checkMobile);
  }, [params]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "antidoping2026") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
        <Nav lang={lang} />
        <main className="flex-1 flex items-center justify-center p-6 relative z-10">
          <div className="max-w-md w-full bg-[var(--bg)] p-10 rounded-3xl border border-[var(--hairline)] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent)] opacity-50" />
            <h1 className="text-3xl font-display mb-3">Prototype</h1>
            <h2 className="text-xl font-sans font-medium mb-6 text-[var(--accent)]">Antidoping Norge</h2>
            <p className="text-[var(--muted)] mb-8 text-sm leading-relaxed">
              Vennligst oppgi passord for å teste prototypen.
            </p>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold ml-1">Sikkerhetstilgang</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Skriv inn passord..."
                  className="w-full px-5 py-4 rounded-2xl bg-[var(--bg)] border border-[var(--hairline)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-xs font-medium ml-1">Feil passord.</p>}
              <button
                type="submit"
                className="w-full bg-[var(--ink)] hover:bg-[var(--accent)] text-[var(--bg)] font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98]"
              >
                Lås opp prototype
              </button>
            </form>
          </div>
        </main>
        <div className="grain" />
        <Footer lang={lang} />
      </div>
    );
  }

  // Mobile version: True fullscreen without any site UI
  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-white z-[9999]">
        <iframe 
          src="/antidoping-proto/index.html" 
          className="w-full h-full border-none"
          title="Antidoping Prototype"
        />
      </div>
    );
  }

  // Desktop version: Styled iPhone frame
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      <Nav lang={lang} />
      <main className="flex-1 flex flex-col items-center py-16 px-6 relative z-10">
        <div className="text-center max-w-2xl mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-[var(--accent)] text-[var(--accent)] text-[10px] font-bold tracking-widest uppercase mb-4">
            Interaktiv Prototype
          </div>
          <h1 className="text-5xl font-display mb-6 tracking-tight">Antidoping Norge</h1>
          <p className="text-lg text-[var(--muted)] leading-relaxed font-sans">
            Dette er en interaktiv simulator for den nye utøver-appen.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="iphone-frame">
            <div className="iphone-button-vup" />
            <div className="iphone-button-vdn" />
            <div className="iphone-button-pwr" />
            <div className="iphone-notch" />
            <div className="iphone-screen">
              <iframe
                src="/antidoping-proto/index.html"
                className="w-full h-full border-none bg-white"
                title="Antidoping Prototype"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {shareUrl && (
              <div className="flex flex-col items-center max-w-xs">
                <div className="bg-white p-4 rounded-2xl border border-[var(--hairline)] shadow-lg">
                  <QRCodeSVG
                    value={shareUrl}
                    size={150}
                    level="M"
                    marginSize={0}
                    fgColor="#0a0a0a"
                    bgColor="#ffffff"
                  />
                </div>
                <h3 className="mt-4 text-[var(--accent)] font-bold text-[10px] tracking-widest uppercase">
                  Web · Åpne på mobil
                </h3>
                <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed text-center">
                  Skann med kamera. Åpner i mobilbrowser i fullskjerm.
                </p>
              </div>
            )}

            <div className="flex flex-col items-center max-w-xs">
              <div className="bg-white p-4 rounded-2xl border-2 border-[var(--accent)] shadow-lg relative">
                <QRCodeSVG
                  value="exp://u.expo.dev/9c444e7c-82c8-4b28-b53a-7b438dbae2e6?channel-name=preview&runtime-version=exposdk:54.0.0"
                  size={150}
                  level="M"
                  marginSize={0}
                  fgColor="#0a0a0a"
                  bgColor="#ffffff"
                />
                <div className="absolute -top-2 -right-2 bg-[var(--accent)] text-white text-[8px] font-bold px-2 py-1 rounded-full tracking-widest uppercase">
                  Native
                </div>
              </div>
              <h3 className="mt-4 text-[var(--accent)] font-bold text-[10px] tracking-widest uppercase">
                Expo Go · Native
              </h3>
              <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed text-center">
                Krever Expo Go-app fra App Store. Ekte native push, kamera, haptics.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
          <div className="p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--bg)] shadow-sm">
            <h3 className="text-[var(--accent)] font-bold text-xs tracking-widest uppercase mb-4">Instruksjoner</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Bruk musen for å interagere. Appen har simulerte haptiske responser og native overganger.
            </p>
          </div>
          <div className="p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--bg)] shadow-sm">
            <h3 className="text-[var(--accent)] font-bold text-xs tracking-widest uppercase mb-4">Målsetning</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Vise hvordan en moderne og tilgjengelig app kan forenkle hverdagen for toppidrettsutøvere.
            </p>
          </div>
        </div>
      </main>
      <div className="grain" />
      <Footer lang={lang} />
    </div>
  );
}
