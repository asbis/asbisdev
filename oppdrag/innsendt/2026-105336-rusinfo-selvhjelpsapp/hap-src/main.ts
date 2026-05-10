import { App as CapApp } from '@capacitor/app';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* DayJS */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/nb';
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale('nb');

/* VueX store */
import store from './stores/index';

/* Capacitor plugins */
import { Preferences } from '@capacitor/preferences';

/* Kryptering */
import { v4 as uuidv4 } from 'uuid';

/* Last lagret data */
store.dispatch('onAppStartup');
store.dispatch('calculator/onAppStartup');
store.dispatch('diary/onAppStartup');
store.dispatch('triggerDiary/onAppStartup');
store.dispatch('awards/onAppStartup');
store.dispatch('notifications/onAppStartup');
store.dispatch('content/onAppStartup');
store.dispatch('themes/onAppStartup');

setTimeout(() => {
  store.dispatch('awards/calculate'); // Kalkuler etter at vi har dekryptert lokal data
}, 500);
setInterval(() => {
  store.dispatch('awards/calculate');
}, 10000);

(async () => {
  await getPassphrase(); // Sørg for at vi har en secret passphrase for kryptering. Hvis den ikke finnes, så lagres den i Preferences

  // Sjekk om brukeren allerede har startet programmet
  const { value: programStartedAt } = await Preferences.get({ key: 'programStartedAt' });
  if (programStartedAt) {
    // @ts-ignore
    window.programStartedAt = programStartedAt; // Denne verdien er kryptert, men det er greit. Vi vil bare vite om den er satt eller ikke, for å overstyre hvilken side som skal vises når appen åpnes. Dekryptering og håndtering av innholdet skjer et annet sted (i store)
  }

  const app = createApp(App)
    .use(IonicVue, {
      backButtonText: 'Tilbake',
      backButtonColor: 'white',
      innerHTMLTemplatesEnabled: true,
      // mode: 'ios', // TODO: Kommenter ut denne. Brukes kun for å tvinge modus i test når vi tar skjermbilder.
    })
    .use(router)
    .use(store);

  router.isReady().then(() => {
    app.mount('#app');

    if (window.location.href.includes('hap-pwa.web.app')) {
      alert('Du bruker nå en testversjon av HAP. Denne appen er ikke ment for annet enn å få tilbakemelding fra kunde underveis i utviklingsløpet.');
    }

    CapApp.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        store.dispatch('content/syncChat');
        store.dispatch('content/syncInfoText');
        store.dispatch('content/syncInfoTextOverRecreationalCategory');
        setTimeout(() => {
          store.dispatch('awards/calculate');
        }, 1000);
      }
    });
  });
})();
/* global.scss */
import './theme/global.css';

async function getPassphrase() {
  const { value } = await Preferences.get({ key: 'secretPassphrase' });
  if (value) {
    return value;
  } else {
    const passphrase = uuidv4();
    await Preferences.set({
      key: 'secretPassphrase',
      value: passphrase,
    });
    return passphrase;
  }
}
