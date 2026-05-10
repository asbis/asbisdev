// @ts-nocheck
import _ from 'lodash';

export default {
  namespaced: true,
  state() {
    return {
      themes: [
        { from: 1, to: 1, title: 'Dagens tema', content: 'Det er vanlig å oppleve noe ubehag i starten av slutteprossessen. Dette kan være svetting, rastløshet, dårlig matlyst og søvnproblemer.  Hva tror du kan hjelpe deg med å dempe og lindre ubehaget? <br /><br />Hva har du gjort tidligere som har fungert når du har hatt pauser?' },
        { from: 2, to: 2, title: 'Dagens tema', content: 'De fysiske abstinenssymptomene er sterkest første uka du slutter og kan vare i rundt 2–3 uker. Søvnproblemer, mareritt og russug kan vare noe lenger.<br /><br />Hva tror du selv vil være bra å gjøre når du opplever spesifikke abstinenser?<br /><br />Har du opplevd andre utfordringer i livet og gjort konkrete ting som har hjulpet deg?' },
        { from: 3, to: 3, title: 'Dagens tema', content: 'Hva er dine hovedgrunner til at du har sluttet med cannabis?<br /><br />Det kan være nyttig å notere ned for deg selv de tre viktigste grunner til at du nå vil slutte med cannabis. Dersom HAP viser seg å være veldig vellykket for deg, hvordan har du det om 8 uker? Skriv ned dine mål for slutteprosessen.' },
        {
          from: 4,
          to: 4,
          title: 'Dagens tema',
          content:
            'Hvilke situasjoner, følelser og mennesker kan trigge lysten til å bruke cannabis? <br /><br />Tenk gjennom hva du kan gjøre når suget kommer, når du er i en situasjon som typisk vekker minner om å bruke cannabis, eller når du står i sterke følelser. Finnes det noen måter du kan avlede suget på når det er sterkt?<br /><br />Du kan lese om tips til å håndtere suget under informasjonsfanen.',
        },
        { from: 5, to: 5, title: 'Dagens tema', content: 'Hvordan skal du forholde deg til ditt nettverk og dine venner som bruker cannabis i starten av slutteprosessen? Dette er viktig å tenke gjennom. Mange kan være ekstra sårbare de første ukene de har sluttet og det kan være lett å bli fristet til å bruke cannabis om de er sammen med andre som bruker cannabis.' },
        { from: 6, to: 6, title: 'Dagens tema', content: 'Har du prøvd å slutte før? Hva var motivasjonen din da? Hvilke strategier fungerte? Hva var det som gjorde at du begynte å bruke cannabis igjen (triggere / risikosituasjoner)? Sjekk gjerne ut triggerdagboken i appen, for å få en oversikt over hva du opplever at hjelper deg eller trigger deg.' },
        { from: 7, to: 7, title: 'Dagens tema', content: 'Husk at det du opplever av fysisk ubehag nå er abstinenssymptomer. Dette er kun en overgangsfase siden du har sluttet med cannabis. Det er ikke sånn du er som person når du ikke bruker cannabis. Det vil gå over og bli bedre. Hold ut! Når det har gått tre uker er du over kneika med fysiske abstinenssymptomer og angst.' },
        { from: 8, to: 8, title: 'Dagens tema', content: '<strong>Øvelse:</strong> En måte å forebygge sprekk ved russug, er å utforske egne tanker som kan bidra til tilbakefall. Et eksempel er å lage en unnskyldningsliste slik at du kan oppdage mulige tanker som kan bidra til sprekk. Tenk gjennom tre unnskyldninger du har hatt / kan ha som unnskyldning for å bruke cannabis.' },
        { from: 9, to: 9, title: 'Dagens tema', content: 'Er det noen interesser eller aktiviteter du ønsker å fordype deg i? Er det noen hobbyer du har drevet med før som du kunne tenke deg oppta?' },
        { from: 10, to: 10, title: 'Dagens tema', content: 'Hvilke risikosituasjoner (situasjoner som kan trigge suget etter cannabis) kan du unngå? Hvilke situasjoner er uungåelige? Hvordan kan du møte disse? Skriv gjerne ned strategier.' },
        { from: 11, to: 11, title: 'Dagens tema', content: 'Hva tror du at dine nærmeste synes om at du slutter med cannabis? Er det noen rundt deg du tror vil støtte deg i slutteprosessen?' },
        {
          from: 12,
          to: 12,
          title: 'Dagens tema',
          content:
            'Har du merket noen endringer siden du sluttet? Legg merke til hvordan morgenen din er idag sammenlignet med når du brukte cannabis. Se om det er noen endringer i ditt energinivå, i måten du kommuniserer med andre på, hvordan du har det inni deg, hvordan du har det når du sitter på bussen, går ute, handler etc. Prøv å legge merke til været ute, omgivelsene dine, menneskene rundt deg, pusten din, tilstedeværelsen din her og nå.',
        },
        { from: 13, to: 13, title: 'Dagens tema', content: 'Gratulerer, du er kommet til fase 2! Det er vanlig å oppleve svingninger i humøret i denne fasen. Følelser kan forsterkes og det kan føre til at du noen ganger lettere kan overreagere eller for eksempel ta deg nær av det som blir sagt. Noen kan lettere havne i krangler eller konflikter med de nærmeste.' },
        {
          from: 14,
          to: 14,
          title: 'Dagens tema',
          content:
            'Dersom du blir overmannet av sterke følelser eller angst, prøv å stoppe litt opp, puste dypt og tenk etter hva som skjer med deg. Ta et steg ut av situasjonen og forsøk å se deg selv utenfra. Minn deg selv på at følelsene ofte forsterkes og kan virke overveldene, slik at de nærmest velter “usortert” ut. Dette er ikke deg som person, men abstinenssymptomer. Hold ut. Følelsene vil roe seg mer når du kommer over i fase 3 (fra Dag 22).',
        },
        { from: 15, to: 15, title: 'Dagens tema', content: 'Det kan være lurt å utsette å ta store avgjørelser. Ta en dag av gangen. Husk at det vil bli bedre.' },
        { from: 16, to: 16, title: 'Dagens tema', content: 'Legg merke til følelsene dine. I hvilke situasjoner oppstår de? Hva slags intensitet er det? Hva gjør de med deg? På hvilken måte styrer de handlingene dine? Legg merke til gode løsningsstrategier.' },
        { from: 17, to: 17, title: 'Dagens tema', content: 'Om du opplever at du blir overmannet av negative tanker rundt en hendelse eller situasjon, kan du forsøke å stille spørsmålene: er mine tanker om situasjonen rimelige? Finnes det noen alternative måter å tolke situasjonen på? De tanker man gjør seg om en hendelse påvirker hvordan man føler det, kroppslige fornemmelser og atferd.' },
        { from: 18, to: 18, title: 'Dagens tema', content: 'Hvilken følelse har du kjent mest på de siste dagene? Hvordan uttrykker du denne følelsen (ansiktsuttrykk, ord, kroppsspråk)? Hvor kjenner du den i kroppen din? Hvilken farge har den? Hva sier den?' },
        { from: 19, to: 19, title: 'Dagens tema', content: 'Det er vanlig å oppleve følelser av ensomhet, isolasjon, forlatthet og sinne i denne fasen, men også øyeblikk av lykke og oppstemthet.' },
        { from: 20, to: 20, title: 'Dagens tema', content: 'Merker du noen forandringer i måten som du fungerer på? Hvordan er din hjemmesituasjon (med samboer, foreldre, venner)?' },
        { from: 21, to: 21, title: 'Dagens tema', content: 'På en scala fra 0–5 hvor 0= ”svært misfornøyd” og 5= “veldig fornøyd”, totalt sett hvor fornøyd er du med livet ditt nå?' },
        { from: 22, to: 22, title: 'Dagens tema', content: 'Gratulerer, du har kommet til fase 3! Denne fasen handler om å bygge nettverk og identitet, og fokusere på fremtiden.  Her er det viktig å jobbe med å redusere risikoen for tilbakefall.' },
        { from: 23, to: 23, title: 'Dagens tema', content: 'Noen merker at konsentrasjonen og oppmerksomheten blir bedre etter 3 til 4 uker. Har du merket noen bedringer?' },
        { from: 24, to: 24, title: 'Dagens tema', content: 'Noen kan slite med å finne ord til å beskrive hva de tenker og føler når de bruker cannabis. Mange opplever en bedring ved å slutte. Legg merke til om du finner ordene lettere og klarer å beskrive bedre hva du tenker og føler.' },
        { from: 25, to: 25, title: 'Dagens tema', content: 'Kortidshukommelsen kan bli dårligere når man bruker cannabis over tid. Ofte vil man merke at denne blir bedre og normaliseres etter 4–8 uker.' },
        { from: 26, to: 26, title: 'Dagens tema', content: 'Rutinene kan skli ut når man bruker mye cannabis over tid. Mange opplever at rutiner kommer naturlig tilbake når de slutter og trives med å få mer rutiner i hverdagen. Har du en rutine som er viktig for deg? Merker du at det har blitt lettere å komme inn i små rutiner som å pusse tenner om kvelden og å stå opp til samme tid?' },
        { from: 27, to: 27, title: 'Dagens tema', content: 'Husk tilbake på dine hovedmotivasjoner som du hadde for å slutte med cannabis. Hva er hovedgrunnen til at du vil fortsette å slutte? Har det kommet noen nye grunner til at du vil opprettholde sluttingen?' },
        { from: 28, to: 28, title: 'Dagens tema', content: 'Hva er du fornøyd med ved deg selv? Hvilke ressurser har du som har hjulpet deg i denne slutteprosessen?' },
        { from: 29, to: 29, title: 'Dagens tema', content: 'Har du merket forskjell på hvordan du kommuniserer med andre? Merker du noe annerledes når du snakker med venner / kollegaer / familie / kjæreste? Ofte vil kommunikasjonen med andre endre seg ved at man lytter og tenker mer før man snakker.' },
        { from: 30, to: 30, title: 'Dagens tema', content: 'Dersom du er med andre som fortsatt bruker cannabis, legg merke til dialogen og tenk etter om du opplever det annerledes før og nå. ' },
        { from: 31, to: 31, title: 'Dagens tema', content: 'Hva er dine tre viktigste mål for de neste seks månedene?' },
        { from: 32, to: 32, title: 'Dagens tema', content: 'Dersom du skulle velge en verdi og ta med deg videre i livet ditt, hvilken velger du? Skriv ned tre viktige verdier for deg.' },
        {
          from: 33,
          to: 33,
          title: 'Dagens tema',
          content: 'Tenk over hvem du ønsker å ha i livet ditt og som er viktige for deg. Hva kan du gjøre for å ha et godt og nært forhold til dem? Er det noen som har støttet deg i denne prosessen, og er det noen du opplever at du ikke lenger har så mye til felles med? Hvilke andre ting og akiviteter som ikke involverer cannabis kan du finne på sammen med dem du har pleid å bruke cannabis med?',
        },
        {
          from: 34,
          to: 34,
          title: 'Dagens tema',
          content: 'Hvordan skal du forholde deg til de i ditt nettverk som bruker cannabis? Noen kan oppleve sorg og negative sider ved tap av nettverk når de tar et valg om å slutte eller ha en lengre pause i cannabisbruken. Hvordan er dette for deg? Finnes det noen andre arenaer i ditt liv hvor du kan bli kjent med andre mennesker? (skole, jobb, hobbyer).',
        },
        { from: 35, to: 35, title: 'Dagens tema', content: 'Er det noen personer i livet ditt som du beundrer? Hva er det med disse som er viktig for deg?' },
        { from: 36, to: 36, title: 'Dagens tema', content: 'Hvordan opplever du at du fungerer i hverdagen? Føler du at du hører hjemme i samfunnet? Hvilke endringer i måten å fungere på legger du merke til? ' },
        { from: 37, to: 37, title: 'Dagens tema', content: 'Hvilke personer i livet ditt er viktige for deg? Hvem ønsker du å ha mer kontakt med, og det noen personer som har vært viktige tidligere i livet som du ønsker å ta kontakt med igjen? Er det noen personer du ønsker å ta mer avstand til?' },
        { from: 38, to: 38, title: 'Dagens tema', content: 'Merker du noen endringer ved deg selv nå sammenlignet med da du brukte cannabis? Dette kan for eksempel være hvordan du har det, hvordan du fungerer i hverdagen, eller hvordan du er sammen med andre mennesker. Har dine foreldre, venner, kollegaer, kjæreste lagt merke til noen forandringer ved deg?' },
        { from: 39, to: 39, title: 'Dagens tema', content: 'Hvilke venner er det som gir deg positiv energi, støtte og utfordringer? Er det noen venner du opplever som ikke er bra for deg?' },
        { from: 40, to: 40, title: 'Dagens tema', content: 'Tenk gjennom hva du kan gjøre for å ha mer kontakt med de i livet som er bra for deg.' },
        { from: 41, to: 41, title: 'Dagens tema', content: 'Ofte kan det oppstå et tomrom når man slutter med cannabis. For mange har cannabis vært en nær venn. Derfor er det viktig å fokusere på nytt innhold i livet. Har du funnet en ny hobby eller aktivitet? Hva liker du å gjøre? Hva gir deg god energi? Er det noe du er nysgjerrig på som du kunne tenke deg å starte med?' },
        { from: 42, to: 42, title: 'Dagens tema', content: 'Ofte kan tidsopplevelsen endre seg i løpet av slutteprosessen, noen vil kunne oppleve at ting går raskere eller tregere.' },
        { from: 43, to: 43, title: 'Dagens tema', content: 'Hva innebærer glede for deg? Hva gjør deg glad? Legg merke til hva som gjør deg glad i løpet av en dag. Hvordan kommer gleden til uttrykk hos deg? Hvilken farge har gleden, hvor i kroppen sitter den, hva sier den?' },
        { from: 44, to: 44, title: 'Dagens tema', content: 'Tenk gjennom tre gode egenskaper / ressurser som du har. Hva sier dine nærmeste at de liker best ved deg?' },
        { from: 45, to: 45, title: 'Dagens tema', content: 'Når man slutter med cannabis trenger noen å finne tilbake til sin gamle identitet eller skape en ny identitet. Hvem var du før du begynte å bruke cannabis? Hvem ønsker du å være?' },
        { from: 46, to: 46, title: 'Dagens tema', content: 'Noen kan bli utålmodige og rastløse i denne fasen og ønske å få på plass alt i livet på en gang. Her er det viktig å ta en ting om gangen og prøve å være tålmodig.' },
        { from: 47, to: 47, title: 'Dagens tema', content: 'Har du merket noen forskjeller ved deg selv siden du slutta med cannabis? Hvordan hadde du det for en uke siden sammenlignet med nå? Hva er den viktigste endringen du opplever siden du sluttet?' },
        { from: 48, to: 48, title: 'Dagens tema', content: 'Mange opplever bedre konsentrasjon noen uker etter å ha sluttet med cannabis. Det vil bli lettere å forstå situasjoner i sammenheng, og lettere å løse konflikter. Hvordan er det for deg?' },
        { from: 49, to: 49, title: 'Dagens tema', content: 'Har du opplevd situasjoner og følelser hvor du vanligvis ville ha brukt cannabis, men hvor du gjorde noe annerledes? Hva gjorde du istedenfor å ta cannabis? Hva var det i situasjonen som gjorde at du valgte annerledes? Var det noe du sa til deg selv eller tenkte? Hvordan føltes det å velge annerledes?' },
        { from: 50, to: 50, title: 'Dagens tema', content: 'Dersom du skrev ned noen mål du satte deg da du startet, finn fram disse nå. Har du nådd disse målene? Har noen av målene dine endret seg?' },
        { from: 51, to: 51, title: 'Dagens tema', content: 'Hvor ser du deg selv om fem år? Se flere spørsmål om mål for fremtiden under identitet og fremtid i informasjonsfanen. ' },
        { from: 52, to: 52, title: 'Dagens tema', content: 'Hvilket verdier verdsetter du høyest fra din egen oppvekst og vil ta med deg videre? Hva vil du kvitte deg med? Hvordan vil du være mot andre og mot deg selv?' },
        { from: 53, to: 53, title: 'Dagens tema', content: 'Hvordan ser du for deg at ditt forhold til cannabis vil være i fremtiden? Prøv å se for deg hvordan livet ditt vil være med og uten cannabis.' },
        { from: 54, to: 54, title: 'Dagens tema', content: 'Cannabis kan for endel knyttes til identitet. Hva innebærer identitet for deg? Merker du noen endringer på din identitet før og nå?  Hvem var du før? Hvem er du nå? Hvem ønsker du å være?' },
        { from: 55, to: 55, title: 'Dagens tema', content: 'På en skala fra 0–5 hvor 0= ”svært misfornøyd” og 5= “veldig fornøyd”, totalt sett hvor fornøyd er du med livet ditt nå? Har du opplevd endring siden du sluttet?' },
        {
          from: 56,
          to: 56,
          title: 'Dagens tema',
          content:
            'Gratulerer du har fullført HAP programmet! Du har god grunn til å være stolt av deg selv! <br /><br /> Du går nå inn i første vedlikeholdsfase - her vi du få ukens tema med øvelser som du kan følge dersom du føler at du har behov for mer støtte. <br /><br /> Fokus vil være videre støtte, motivasjon, tips og refleksjon.  Noen av temaene vil du kjenne igjen fra de først 8 ukene, men det kan likevel være nyttig for deg å fortsatt ha fokus på disse.  ',
        },
        {
          from: 57,
          to: 59,
          title: 'Ukens tema',
          content:
            '<strong>Uke 9: Markering av mål </strong><br /><br /> Det kan være motiverende å markere at du har oppnådd et eller flere mål. Hvordan kan du markere at du har fullført HAP på 8 uker? Hvem har støttet deg i perioden? Hvordan har du støttet og oppmuntret deg selv? <br /><br /> <strong>Øvelse 1:</strong>  Hvis du har fått støtte av noen i prosessen din, inviter på middag eller gjør noe hyggelig sammen. Uttrykk gjerne betydningen hjelpen/støtten har hatt for deg og hvordan det har bidratt til at du har klart dette. ',
        },
        {
          from: 60,
          to: 63,
          title: 'Ukens tema',
          content:
            '<strong>Uke 9: Markering av mål</strong>  <br /><br /> Det kan være motiverende å markere at du har oppnådd et eller flere mål. Hvordan kan du markere at du har fullført HAP på 8 uker? Hvem har støttet deg i denne perioden? Hvordan har du støttet og oppmuntret deg selv?  <br /><br /> <strong>Øvelse 2:</strong> Gi deg selv en belønning eller markering på at du har kommet langt i din endringsprosess. Hva setter du pris på, og ønsker deg, hva gjør deg glad?  Noter i dagboken din de tre viktigste endringene du har merket fra du startet HAP og frem til nå.  Hva var de største utfordringene i denne perioden? Hvordan kom du deg gjennom dem?  ',
        },
        {
          from: 64,
          to: 66,
          title: 'Ukens tema',
          content:
            '<strong>Uke 10: Nettverk og aktiviteter</strong> <br /><br /> Å bygge gode og nære relasjoner som kan gi sosial støtte kan være en god investering. Husk at dette kan ta tid enten det er å bygge nye relasjoner eller å finne tilbake til nærheten med venner du har hatt tidligere i livet. Å oppsøke aktiviteter med andre kan være en god start. <br /><br /> <strong>Øvelse 1:</strong>  Tenk over hvilke arenaer du har for aktiviteter i livet ditt idag - gir de deg energi og påfyll? Hva gir deg ro og pause? Bestem deg for å oppsøke en arena for aktivitet eller interesse som du er nysgjerrig på i løpet av tre måneder – merk datoen i dagboken din! ',
        },
        {
          from: 67,
          to: 70,
          title: 'Ukens tema',
          content:
            '<strong>Uke 10: Nettverk og aktiviteter</strong> <br /><br /> Å bygge gode og nære relasjoner som kan gi sosial støtte kan være en god investering. Husk at dette kan ta tid enten det er å bygge nye relasjoner eller å finne tilbake til nærheten med venner du har hatt tidligere i livet. Å oppsøke aktiviteter med andre kan være en god start. <br /><br /> <strong>Øvelse 2:</strong> Tenk over om det er noen du ønsker å tilbringe mer tid sammen med. Reflekter over hva du legger i det å være en god venn og hva som er viktig for deg i et vennskap. Drøft gjerne dette med en som står deg nær, eller lag notater i dagboken din. ',
        },
        {
          from: 71,
          to: 72,
          title: 'Ukens tema',
          content:
            '<strong>Uke 11: Sprekk eller nesten-sprekk</strong> <br /><br /> Sprekk er normalt, og kan skje på flere tidspunkter i en prosess når du endrer på en vane. Ting som tidligere kunne trigge deg trenger ikke å gjøre det nå. Derfor er det viktig å utforske hva som kan være nye triggere og lage en realistisk plan du kan bruke enten for å forebygge eller for å hente deg inn ved behov. Les mer under fanen sprekk/tilbakefall og under fanen råd og tips -  jeg sprakk, hva nå?  <br /><br /> <strong>Øvelse 1:</strong> Se i triggerdagboken hva som har vært dine viktigste triggere til å bruke cannabis, og hva som har vært beskyttende og motiverende faktorer for å ikke bruke cannabis. Hvordan er dette i dag? - Sammenlikn. ',
        },
        {
          from: 73,
          to: 74,
          title: 'Ukens tema',
          content:
            '<strong>Uke 11: Sprekk eller nesten-sprekk</strong> <br /><br /> Sprekk er normalt, og kan skje på flere tidspunkter i en prosess når du endrer på en vane. Ting som tidligere trigget deg trenger ikke å gjøre det nå. Derfor er det viktig å utforske hva som kan være nye triggere og lage en realistisk plan du kan bruke enten for å forebygge eller for å  hente deg inn ved behov. Les mer under fanen sprekk/tilbakefall og under fanen råd og tips -  jeg sprakk, hva nå?  <br /><br /> <strong>Øvelse 2:</strong> Reflekter rundt hva det er som trigger deg nå. Hvordan har dette eventuelt bygget seg opp over tid? Finn tre nyttige og realistiske tiltak i din hverdag som du tror kan forebygge sprekk. Start allerede i dag med tiltakene du har valgt.  ',
        },
        {
          from: 75,
          to: 77,
          title: 'Ukens tema',
          content:
            '<strong>Uke 11: Sprekk eller nesten-sprekk</strong> <br /><br /> Sprekk er normalt, og kan skje på flere tidspunkter i en prosess når du endrer på en vane. Ting som tidligere trigget deg trenger ikke å gjøre det nå. Derfor er det viktig å utforske hva som kan være nye triggere og lage en realistisk plan du kan bruke enten for å forebygge eller for å hente deg inn ved behov. Les mer under fanen sprekk/tilbakefall og under fanen råd og tips -  jeg sprakk, hva nå?  <br /><br /> <strong>Øvelse 3:</strong> Tenk på en gang du har blitt trigget, men likevel ikke brukte cannabis. Hva var det i situasjonen som gjorde at du valgte å ikke bruke cannabis?  ',
        },
        {
          from: 78,
          to: 80,
          title: 'Ukens tema',
          content:
            '<strong>Uke 12: Følelser.</strong> <br /><br /> Vi har flere grunnleggende følelser, for eksempel glede, sorg og sinne. Noen ganger kan det være vanskelig å skille eller nyansere mellom en eller flere følelser. Det går for eksempel an å være glad og nervøs samtidig, og det kan være vanskelig å nyansere mellom uro, irritasjon og sinne. <br /><br /> <strong>Øvelse 1:</strong> Se filmen "Alfred og skyggen - en liten film om følelser" (Norsk institutt for psykologisk rådgivning) <a href="https://www.youtube.com/watch?v=UYDUocIGep4">https://www.youtube.com/watch?v=UYDUocIGep4</a>. <br /><br /> Legg merke til hvordan dine følelser kjennes.  Bruk gjerne 5 minutter hver dag på å legge merke til og nærme deg følelsene dine med nysgjerrighet og tålmodighet. Snakk om egne følelser med noen du stoler på, øv deg på å vise dem, og å akseptere det at du har ulike følelser.',
        },
        {
          from: 81,
          to: 83,
          title: 'Ukens tema',
          content:
            '<strong>Uke 12: Følelser.</strong> <br /><br /> Vi har flere grunnleggende følelser, for eksempel glede, sorg og sinne. Noen ganger kan det være vanskelig å skille eller nyansere mellom en eller flere følelser. Det går for eksempel an å være glad og nervøs samtidig, og det kan være vanskelig å nyansere mellom uro, irritasjon og sinne. <br /><br /> <strong>Øvelse 2:</strong> Reflekter over følelser du har hatt, hvor du kjente de i kroppen og hvordan du viste dem til andre. Tenk over om du selv mener at du klarte å formidle og håndtere følelsen på en god måte til deg selv og dine omgivelser, noter gjerne i dagboken din!  ',
        },
        { from: 84, to: 84, title: 'Dagens tema', content: 'Du har nå gjennomført til sammen 12 uker med hasjavvenning og vedlikehold – godt jobba!! Heretter vil du få tips til månedlige temaer vi tenker det er nyttig å være bevisst på. Fortsett gjerne med å bruke triggeroversikt og dagbok, dette kan være hjelpsomme redskaper i tiden som kommer. ' },
      ],
      /**
       * Rullerende tema skal vises 28 dager hver i loop, fra og med dag 85
       */
      alternatingThemes: [
        {
          id: 1,
          periods: [],
          title: 'Månedens tema',
          content: `<strong>Identitet</strong> <br/><br/> Hvordan du oppfatter og kategoriserer deg selv er viktig for din selvfølelse. Personlighetstrekk og gruppeidentitet kan endre seg over tid, både fordi omgivelsene dine endrer seg og fordi du utvikler deg. Du kan for eksempel gå fra å være student til å bli arbeidstaker, eller du kan gå fra å være bråsint til å bli ettertenksom. <br/><br/> <strong>Øvelse:</strong> Tenk over hvilke roller og personlighetstrekk du har, og reflekter over om disse har endret seg den siste tiden. I så fall hvordan og hvorfor? Hvilke grupper i samfunnet identifiserer du deg med, hva kjennetegner disse gruppene for deg og hvorfor? Skriv ned i dagboken, og lag gjerne en oversikt over hvordan disse tingene endrer seg i livet ditt etter hvert som tiden går.`,
        },
        {
          id: 2,
          periods: [],
          title: 'Månedens tema',
          content: `<strong>Skyld og skam</strong> <br/><br/> Det er vanlig å kjenne på følelsene skyld og skam i blant. Skyld er følelsen av å ha gjort noe feil og skam er følelsen av å være feil/ikke være god nok. Skyld dreier seg om handlinger du har gjort som er ansett som feil eller galt og skam handler om hvordan du opplever deg som person. Skam er en sosial følelse -  du ser deg selv i andres øyne slik du tror de ser deg.  Fysiske reaksjoner på skam kan være  hjertebank, rødming eller å bli varm.  <br/><br/> <strong>Øvelse 1:</strong> Beskriv en situasjon som har trigget skamfølelse hos deg.  Beskriv hendelsen, tanker og følelser, fysiske reaksjoner, og din atferd i situasjonen. Tenk over om skamfølelsen i situasjonen hadde en funksjon og om funksjonen var positiv eller negativ. Trigges følelsen av noe i livet ditt her og nå eller tidligere i livet ditt? Hvilke alternative tanker rundt situasjonen har du nå? <br/><br/> <strong>Øvelse 2:</strong> Beskriv hva du føler når du kjenner på skyld.  Har du grader av følelsen? Hvilke fysiske symptomer kjenner du? Hvilke tanker dukker typisk opp? `,
        },
        {
          id: 3,
          periods: [],
          title: 'Månedens tema',
          content: `<strong>Verdiprinsipper</strong> <br/><br/> Verdiprinsipper sier noe om hva slags menneske du ønsker å være; hvordan du ønsker å forholde deg til verden rundt deg, andre mennesker og deg selv.  Alle har noen verdiprinsipper de ønsker å leve etter, disse kan variere fra person til person og også endre seg over tid. Det finnes ikke noe rett og galt. <br/><br/> <strong>Øvelse:</strong> Tenk over hva som er viktige verdier for deg og hvorfor. Har det vært endringer?  Er det noen kjerneverdier som går  igjen i livet ditt?  Hva kan du gjøre for å leve i tråd med dine viktigste verdier i hverdagen? `,
        },
        {
          id: 4,
          periods: [],
          title: 'Månedens tema',
          content: `<strong>Uro og vonde tanker</strong> <br/><br/> Å kjenne på negative tanker, uro og angst kan være utfordrende. Dine tanker og tolkninger av deg selv og verden rundt deg kan påvirke hva du føler, hvordan du handler og fysiologiske reaksjoner i kroppen din. Ved å utfordre og utforske dine egne tanker og tolkninger kan du bli bevisst på automatiserte og uønskede atferdsmønstre og dermed jobbe målrettet for å bryte dem. Les mer om dette under øvelser - ABC-modellen. <br/><br/> <strong>Øvelse:</strong>  Forsker og vennlig støttespiller. Ta for deg en typisk negativ tanke du ofte har om deg selv. Tenk deg at du er en forsker: Hvilken informasjon går jeg glipp av her? Tenker jeg “alltid, aldri, enten / eller” og mister nyansene?  Hvilke alternative tolkninger finnes? Hvilken funksjon har den kritiske stemmen?  Vær en vennlig støttespiller: Hva ville jeg sagt til en nær venn som gikk gjennom noe lignende og hadde negative tanker? Hvordan gi støtte og forståelse til meg selv? `,
        },
        {
          id: 5,
          periods: [],
          title: 'Månedens tema',
          content: `<strong>Selvomsorg</strong><br/><br/> I hverdagen kan det være lett å glemme å ta vare på seg selv både fysisk og psykisk. Det kan handle om at du glemmer å gi deg selv omtanke og varme ord, eller at du ikke ivaretar egen fysisk helse.  Det er viktig å prioritere deg selv og dine behov. Forsøk å behandle deg selv som din bestevenn. <br/><br/> <strong>Øvelse:</strong> Hvordan tar du vare på og viser omsorg til deg selv i hverdagen? Hva mer kan du gjøre for å ta vare på deg selv? Reflekter over hvordan du viser forståelse og omsorg til deg selv i utfordrende situasjoner.  `,
        },
        {
          id: 6,
          periods: [],
          title: 'Månedens tema',
          content: `<strong>Tålmodighet og støtte</strong> <br/><br/>  Du har kommet deg gjennom slutteprosessen, og har god grunn til å være stolt og fornøyd! Likevel er det ikke sikkert at du opplever at du har det helt bra. Det er viktig å gi deg selv forståelse, raushet og oppmuntring på veien videre. Endring er krevende og tar tid, og du er fortsatt i en endringsprosess. <br/><br/><strong>Øvelse:</strong> Tenk etter om du har vært i en situasjon der du hadde behov for hjelp eller støtte. Klarte du å be om hjelp? Hvorfor/hvorfor ikke? Hva ble utfallet?     `,
        },
        {
          id: 7,
          periods: [],
          title: 'Månedens tema',
          content: `<strong>Bygge mestringstillit</strong> <br/><br/> Det å kjenne på mestring i hverdagen og på ulike livsområder kan bidra til å styrke troen på deg selv, noe som igjen påvirker din selvtillit. Det kan være nyttig å analysere hverdagssituasjoner hvor du mestrer, for å fremheve hva du sa til deg selv og tenkte i en gitt situasjon, og se på hvordan dette påvirker dine følelser, kroppslige reaksjoner og handlinger. <br/><br/><strong>Øvelse 1:</strong> Tenk på en situasjon den siste uka hvor du kjente på mestring. Hva følte og tenkte du underveis i situasjonen og etter situasjonen? Hva gjorde du? Hvordan føles det når du tenker på situasjonen nå? <br/><br/> <strong>Øvelse 2:</strong> Se tilbake på en situasjon i livet ditt som har vært utfordrende og som du har håndtert bra.  Hvilke egenskaper, styrker og ressurser brukte du for å håndtere situasjonen?  `,
        },
        {
          id: 8,
          periods: [],
          title: 'Månedens tema',
          content: `<strong>Pusten din</strong> <br/><br/> Pusten din er nært forbundet med nervesystemet. Du kan regulere egen aktivering ved å fokusere på pusten. Ved å fokusere på innpust vekker du kroppen, og ved å fokusere på utpust roer du kroppen. <br/><br/> <strong>Øvelse:</strong> Fokuser på pusten din ved å heise skuldrene opp når du puster inn og senke skuldrene dine ned når du puster ut. Gjenta fem ganger. <br/><br/> Øv på å fokusere på lang utpust når du er stresset, rastløs, gira eller urolig i kroppen og trenger å roe deg ned. Du kan gjerne telle til fem mens du puster ut. Legg merke til endringer etter at du har gjort øvelsen.  `,
        },
        {
          id: 9,
          periods: [],
          title: 'Månedens tema',
          content: `<strong>Oppmerksomt nærvær</strong> <br/><br/> Mindfulness eller oppmerksomt nærvær handler om å styrke oppmerksomhet mot nåtiden og utvikle økt empati og vennlighet til seg selv. <br/><br/> <strong>Øvelse:</strong>  Ta deg en liten pause et sted hvor du kan sitte i ro. Lukk gjerne øynene dersom det føles greit. Om noe i øvelsen føles ukomfortabelt kan du stoppe opp eller hoppe over det. Plasser føttene godt på gulvet og hvil ryggen inntil et stolsete etc.  La armene hvile ned i fanget ditt. Legg merke til hvordan du har det i ulike deler av kroppen din, armene, føttene, nakken, ansiktet osv.  Kanskje er du varm, kald, anspent, rolig eller urolig. Alt er helt greit. Det er naturlig at tankene begynner å vandre når du flytter fokuset mot kroppen. Om du oppdager det, bring fokuset vennlig tilbake til pusten din. Pust rolig inn og ut flere ganger. Gni hender og fingre mot hverandre, rull på tærne dine. Legg merke til endringer etter øvelsen. For flere slike øvelser, se under infofanen - øvelser.  `,
        },
        {
          id: 10,
          periods: [],
          title: 'Månedens tema',
          content: `<strong>Unngåelsesatferd</strong> <br/><br/> Når du bryter eller endrer på en vane som har hatt en spesifikk funksjon for deg (for eksempel å stresse ned/ unngå vanskelige følelser), er det viktig å være bevisst på om du erstatter denne vanen med nye vaner som opprettholder ditt gamle mønster. Det kan for eksempel være overdreven overspising, bruk av andre rusmidler, gaming, shopping, sex, sosiale medier etc. Husk at vaner kan være både positive og negative, forsøk å ha fokus på å finne en balanse. <br/><br/> <strong>Øvelse:</strong> Har du erstattet cannabisbruk med en annen vane? I så fall hvilken? Hvilken funksjon har den nye vanen? Holder denne vanen deg igjen i gamle atferdsmønstre?  `,
        },
        {
          id: 11,
          periods: [],
          title: 'Månedens tema',
          content: `<strong>Triggere og sprekk</strong><br/><br/> Det er helt naturlig å føle trang til å bruke cannabis igjen når du møter utfordringer i livet. Automatiserte tanker som kan dukke opp er: «Det har fungert før, det hjelper, da får jeg pause, ro, demper følelser, slipper ansvar osv.». Når slike tanker kommer er det viktig å være oppmerksom og forsøke å finne andre løsninger. Hver gang du velger noe annet og får en annen erfaring med noe som fungerer, bygges det nye nervebaner i hjernen din. Etterhvert vil koblingen mellom det å løse et problem og det å bruke cannabis bli litt svakere, og koblingen til andre erfaringer bygges og styrkes. <br/><br/> <strong>Øvelse:</strong> Hvordan kan du skape deg en timeout hvor du kan finne ro, kjenne etter, og tenke gjennom alternativer istedenfor å handle på automatikk og bruke cannabis?`,
        },
        {
          id: 12,
          periods: [],
          title: 'Månedens tema',
          content: `<strong>Endring</strong> <br/><br/> Nå har du kommet langt i prosessen din. Dette er fantastisk og utrolig bra jobbet! <br/><br/> Endring er svært krevende på mange nivåer, og du har gjort denne jobben. <br/><br/> <strong>Øvelse 1:</strong> Tenk over hvordan du har endret deg i denne perioden. Hvilke endringer legger du merke til etter at du sluttet med eller reduserte din cannabisbruk? Hva var din hovedmotivasjon for å begynne med HAP? Hva er din motivasjon nå for å fortsette videre / for å opprettholde din endring? <br/><br/> <strong>Øvelse 2:</strong> Noter hvilke egenskaper du mener beskriver deg best som person i dag. Les det du har notert høyt for deg selv. Legg merke til hva du føler og hvor i kroppen du kjenner det når du leser dette opp for deg selv. <br/><br/> <strong>Øvelse 3:</strong> Forsøk å visualisere deg selv et år frem i tid. Hvordan har du det, hvem har du rundt deg, hva gjør du? Hvor er du i endringsprosessen din?  `,
        },
      ],
    };
  },
  getters: {
    currentTheme: (state, getters, rootState, rootGetters) => {
      const day = rootGetters['daysPassed'];
      return getters['themeOfTheDay'](day);
    },
    themeOfTheDay: (state) => (day) => {
      day = day + 1; // +1, siden kunden begynner å telle på 1 (første dag er dag 1, ikke dag 0)
      let theme = _.cloneDeep(state.themes.find((el) => el.from <= day && el.to >= day));
      if (!theme) {
        theme = getAlternatingTheme(day - 84, state.alternatingThemes);
      }
      return theme;
    },
    // Brukes for å liste alle dager samtidig, så vi kan se over at alt ser riktig ut
    generatedThemes: (state, getters) => {
      const returnArr = [];
      for (let i = 0; i < 900; i++) {
        const theme = getters['themeOfTheDay'](i);
        theme.day = i + 1;
        returnArr.push(theme);
      }
      return returnArr;
    },
  },
  actions: {
    onAppStartup: async (context) => {
      // Her legger vi inn from og to på alternatingThemes, 24 år frem i tid. Så kan vi slå opp dag nummer mot det.
      let themeId = 0;
      for (let i = 1; i < 365 * 24; i = i + 28) {
        context.state.alternatingThemes[themeId].periods.push({
          from: i,
          to: i + 27,
        });
        if (themeId === 11) {
          themeId = 0;
        } else {
          themeId++;
        }
      }
    },
  },
  mutations: {},
};

function getAlternatingTheme(day, alternatingThemes) {
  //   console.log(`Leter etter månedens tema for dag ${day}`);
  for (const alternatingTheme of alternatingThemes) {
    // console.log(alternatingTheme);
    for (const period of alternatingTheme.periods) {
      //   console.log(`${day} sammenlignes med ${period.from} og ${period.to}`);
      if (period.from <= day && period.to >= day) {
        // console.log(`> Fant!`);
        return _.cloneDeep(alternatingTheme);
      }
    }
  }
  console.error(`Finner ikke månedens tema for dag ${day}`);
  return {
    title: 'En feil har oppstått',
    content: 'Finner ikke dagens/ukens/månedens tema.',
  };
}
