"use client";

import React, { useState, useEffect } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "../../../oppdrag/oppdrag.css";

export default function RusinfoPage({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = useState<any>("no");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    params.then(p => setLang(p.lang));
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [params]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "rusinfo2026") {
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
            <div className="absolute top-0 left-0 w-full h-1 bg-[#6B5544] opacity-50" />
            <h1 className="text-3xl font-display mb-3">Prototype</h1>
            <h2 className="text-xl font-sans font-medium mb-6 text-[#6B5544]">RUSinfo - Selvhjelpsapp</h2>
            <p className="text-[var(--muted)] mb-8 text-sm leading-relaxed">
              Vennligst oppgi passord for å teste prototypen for RUSinfo selvhjelpsapp. 
              Dette er en omfattende prototype med dagbok, motivasjonsvegg og kriseplan.
            </p>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold ml-1">Sikkerhetstilgang</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Skriv inn passord..."
                  className="w-full px-5 py-4 rounded-2xl bg-[var(--bg)] border border-[var(--hairline)] focus:outline-none focus:ring-2 focus:ring-[#6B5544] transition-all placeholder:text-[var(--muted)]/40"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-xs font-medium ml-1">Feil passord.</p>}
              <button
                type="submit"
                className="w-full bg-[#6B5544] hover:bg-[#5A4535] text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98]"
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

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-white z-[9999]">
        <iframe 
          src="/rusinfo-proto/index.html" 
          className="w-full h-full border-none"
          title="RUSinfo Prototype"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      <Nav lang={lang} />
      <main className="flex-1 flex flex-col items-center py-16 px-6 relative z-10">
        <div className="text-center max-w-2xl mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-[#6B5544] text-[#6B5544] text-[10px] font-bold tracking-widest uppercase mb-4">
            Interaktiv Prototype
          </div>
          <h1 className="text-5xl font-display mb-6 tracking-tight text-[#231F1C]">RUSinfo Selvhjelp</h1>
          <p className="text-lg text-[var(--muted)] leading-relaxed font-sans">
            En verdig og støttende app for personer som ønsker å endre sine rusvaner. 
            Test den interaktive simulatoren nedenfor.
          </p>
        </div>

        <div className="iphone-frame" style={{ boxShadow: '0 0 0 4px #222, 0 0 0 6px #6B5544, 0 20px 50px rgba(0,0,0,0.3)' }}>
          <div className="iphone-button-vup" />
          <div className="iphone-button-vdn" />
          <div className="iphone-button-pwr" />
          <div className="iphone-notch" />
          <div className="iphone-screen">
            <iframe 
              src="/rusinfo-proto/index.html" 
              className="w-full h-full border-none bg-[#F6F2EC]"
              title="RUSinfo Prototype"
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
          <div className="p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--bg)] shadow-sm">
            <h3 className="text-[#6B5544] font-bold text-xs tracking-widest uppercase mb-4">Instruksjoner</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Bruk musen for å navigere. Appen inkluderer en global kriseknapp (rød sirkel) og et omfattende 
              kartleggingsverktøy for vaner og mestring.
            </p>
          </div>
          <div className="p-8 rounded-3xl border border-[var(--hairline)] bg-[var(--bg)] shadow-sm">
            <h3 className="text-[#6B5544] font-bold text-xs tracking-widest uppercase mb-4">Fokusområder</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Dignitet, ro og varme. Appen er designet for å føles som en trygg følgesvenn i en krevende endringsprosess.
            </p>
          </div>
        </div>
      </main>
      <div className="grain" />
      <Footer lang={lang} />
    </div>
  );
}
