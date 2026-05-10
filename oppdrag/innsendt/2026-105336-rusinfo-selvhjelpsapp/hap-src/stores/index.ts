/* VueX stores */
import { createStore } from 'vuex';

import diary from '@/stores/diary';
import calculator from '@/stores/calculator';
import triggerDiary from '@/stores/triggerDiary';
import awards from '@/stores/awards';
import content from '@/stores/content';
import notifications from '@/stores/notifications';
import themes from '@/stores/themes';

import { Preferences } from '@capacitor/preferences';
import { AES, enc } from 'crypto-js';
import dayjs from 'dayjs';

import { isPlatform } from '@ionic/vue';

export default createStore({
  modules: {
    diary,
    calculator,
    triggerDiary,
    awards,
    content,
    notifications,
    themes,
  },
  state() {
    return {
      programStartedAt: null,
      avatar: 'assets/flaticon.com/collection-4/svg/078-user-8.svg', // NB: Endrer du denne, endre også i reset.vue() som kaller opp setAvatar('') med url til default avatar
    };
  },
  getters: {
    programStartedAt: (state) => {
      return state.programStartedAt;
    },
    avatar: (state) => {
      return state.avatar;
    },
    programHasStarted: (state) => {
      return dayjs().isAfter(dayjs(state.programStartedAt));
    },
    secondsPassed: (state) => {
      const secondsDiff = dayjs().diff(dayjs(state.programStartedAt), 'second');
      if (secondsDiff < 0) {
        return 0; // Returnerer 0 hvis sluttdato er frem i tid
      }
      return secondsDiff;
    },
    daysPassed: (state) => {
      const daysDiff = dayjs().diff(dayjs(state.programStartedAt), 'days');
      if (daysDiff < 0) {
        return 0; // Returnerer 0 hvis sluttdato er frem i tid
      }
      return daysDiff;
    },
    isAndroid: () => {
      return isPlatform('android');
    },
  },
  actions: {
    onAppStartup: async (context) => {
      const stateFromStorage = await context.dispatch('readFromStorage', { key: 'programStartedAt' }, { root: true });
      if (stateFromStorage) {
        context.state.programStartedAt = stateFromStorage;
      }
      const stateFromStorage2 = await context.dispatch('readFromStorage', { key: 'avatar' }, { root: true });
      if (stateFromStorage2) {
        context.state.avatar = stateFromStorage2;
      }
    },
    setProgramStartedAt: (context, payload) => {
      context.state.programStartedAt = payload.programStartedAt;
      // @ts-ignore
      window['programStartedAt'] = payload.programStartedAt;
      context.dispatch('saveToStorage', {
        key: 'programStartedAt',
        data: payload.programStartedAt,
      });
    },
    setAvatar: (context, payload) => {
      context.state.avatar = payload;
      context.dispatch('saveToStorage', {
        key: 'avatar',
        data: payload,
      });
    },
    saveToStorage: async (context, payload) => {
      const startTime = performance.now();
      const { value: passphrase } = await Preferences.get({ key: 'secretPassphrase' });

      const { key, data } = payload;

      let saveStr;
      if (typeof payload === 'object') {
        saveStr = 'object:' + JSON.stringify(data);
      } else {
        saveStr = 'string:' + data;
      }

      // @ts-ignore
      const encrypted = AES.encrypt(saveStr, '03c273a7-1679-427b-8590-cb67e36a3f4e' + passphrase).toString(); // Key for kryptering er: Kombinert hardkodet del 1 med unik (og tilfeldig) del 2.

      await Preferences.set({
        key,
        value: encrypted,
      });

      const endTime = performance.now();
      console.log(`${key} ble kryptert og lagret på: ${endTime - startTime} ms`);

      return true;
    },
    readFromStorage: async (context, payload) => {
      const startTime = performance.now();
      const { value: passphrase } = await Preferences.get({ key: 'secretPassphrase' });

      // @ts-ignore
      const { key } = payload;

      // @ts-ignore
      const { value: storageValue } = await Preferences.get({ key });

      // Unngå å dekryptere hvis verdi ikke er satt
      if (!storageValue) {
        const endTime = performance.now();
        console.log(`${key} ble åpnet på: ${endTime - startTime} ms`);

        return false;
      }

      // @ts-ignore
      let decrypted = AES.decrypt(storageValue, '03c273a7-1679-427b-8590-cb67e36a3f4e' + passphrase).toString(enc.Utf8); // Key for kryptering er: Kombinert hardkodet del 1 med unik (og tilfeldig) del 2

      if (decrypted.substring(0, 7) === 'object:') {
        decrypted = JSON.parse(decrypted.substring(7)); // Fjerner "object:" og konverterer til objekt
      } else {
        decrypted = decrypted.substring(7); // Fjerner "string:"
      }

      const endTime = performance.now();
      console.log(`${key} ble åpnet og dekryptert på: ${endTime - startTime} ms`);

      return decrypted;
    },
  },
});
