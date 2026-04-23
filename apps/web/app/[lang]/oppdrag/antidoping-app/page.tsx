"use client";

import React, { useState, useEffect } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "../../../oppdrag/oppdrag.css";

export default function AntidopingPage({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = useState<any>("no");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    params.then(p => setLang(p.lang));
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
      <div className="min-h-screen bg-[var(--background)] flex flex-col">
        <Nav lang={lang} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--hairline)] shadow-xl">
            <h1 className="text-2xl font-serif mb-2">Prototype: Antidoping Norge</h1>
            <p className="text-[var(--muted)] mb-6 text-sm">Vennligst oppgi passord for å teste prototypen.</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passord"
                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--hairline)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs">Feil passord, vennligst prøv igjen.</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
              >
                Lås opp prototype
              </button>
            </form>
          </div>
        </main>
        <Footer lang={lang} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Nav lang={lang} />
      <main className="flex-1 flex flex-col items-center py-12 px-6">
        <div className="text-center max-w-2xl mb-12">
          <h1 className="text-4xl font-serif mb-4">Antidoping Norge</h1>
          <p className="text-lg text-[var(--muted)]">
            Dette er en interaktiv prototype for den nye utøver-appen til Antidoping Norge. 
            Test navigasjon, søk etter medisiner og risikovurdering direkte i mobilsimulatoren nedenfor.
          </p>
        </div>

        <div className="iphone-frame">
          <div className="iphone-button-vup" />
          <div className="iphone-button-vdn" />
          <div className="iphone-button-pwr" />
          <div className="iphone-notch" />
          <div className="iphone-screen">
            <iframe 
              src="/antidoping-proto/index.html" 
              className="w-full h-full border-none"
              title="Antidoping Prototype"
            />
          </div>
        </div>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800 max-w-xl text-center">
          <h2 className="text-blue-800 dark:text-blue-300 font-semibold mb-2">Instruksjoner</h2>
          <p className="text-blue-700/80 dark:text-blue-400 text-sm leading-relaxed">
            Bruk musen for å interagere med appen. Den støtter haptisk feedback (visuell respons på web) 
            og er bygget med samme navigasjonsmønster som en ekte native app.
          </p>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
