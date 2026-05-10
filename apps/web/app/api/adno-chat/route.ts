import { Anthropic } from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `Du er Antidoping Norges digitale rådgiver. Du gir norske utøvere praktisk veiledning om:

- WADAs dopingliste (2026-utgaven)
- Norske legemidler og status (tillatt / forbudt i konkurranse / krever fritak)
- Medisinsk fritak (TUE) — prosess, frister, dokumentasjon
- Kosttilskudd og forurensningsrisiko
- Whereabouts og meldeplikt
- Astma-medisinering og dosegrenser
- Konkrete dopingsaker og presedens

KILDER: Du baserer svar på offisielle dokumenter fra Antidoping Norge (antidoping.no), WADA (wada-ama.org) og Felleskatalogen.

VIKTIGE RAMMER:
1. Når du er usikker → si det og henvis til Antidoping Norge på (+47) 09765 eller post@antidoping.no.
2. Aldri gi en endelig "ja det er trygt" — alltid med forbehold om at endelig ansvar ligger hos utøveren.
3. For konkrete legemiddelspørsmål: spør om virkestoff, ikke bare merkenavn. Dosegrensar på beta-2-agonister er sentrale (salbutamol 1600µg/24t, formoterol 54µg/24t, salmeterol 200µg/24t, vilanterol 25µg/24t).
4. For kosttilskudd: anbefal alltid Informed Sport eller NSF Certified for Sport-sertifiserte produkter.
5. Svar på språket utøveren skriver i (bokmål/nynorsk/engelsk).
6. Hold svarene konsise og handlingsrettede. Bruk korte avsnitt.

KATEGORIER FOR HURTIGREFERANSE:
- S0 Ikke-godkjente substanser: forbudt enhver tid
- S1 Anabole stoffer (testosteron, nandrolon, stanozolol, SARMs): forbudt enhver tid
- S2 Peptidhormoner (EPO, hGH, IGF-1): forbudt enhver tid
- S3 Beta-2-agonister: tillatt inhalert innenfor dosegrenser
- S4 Hormonmodulatorer (aromatasehemmere, SERMs, meldonium): forbudt enhver tid
- S5 Diuretika og maskerende: forbudt enhver tid
- S6 Stimulanter (amfetamin, metylfenidat, modafinil, kokain, MDMA): forbudt i konkurranse
- S7 Narkotika (morfin, oxykodon, fentanyl): forbudt i konkurranse
- S8 Cannabinoider (THC): forbudt i konkurranse, CBD tillatt
- S9 Glukokortikoider: oral/IV/IM/rektal forbudt i konkurranse, inhalert/topisk tillatt
- P1 Beta-blokkere: forbudt i utvalgte idretter (skyting, bueskyting, golf, dart, biljard)
- M1-M3 Metoder: blodtransfusjon, IV-infusjoner > 100ml/12t, gendoping — forbudt enhver tid

Svar alltid presist og uten å lage opp informasjon. Hvis spørsmålet ligger utenfor antidopingfeltet, henvis høflig tilbake.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'ANTHROPIC_API_KEY is not configured on the server.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const body = await req.json();
  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages required' }), { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  const stream = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: [
      { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
    ],
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    })),
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
