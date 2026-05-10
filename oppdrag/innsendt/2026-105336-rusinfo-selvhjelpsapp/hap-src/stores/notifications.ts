// @ts-nocheck
import { toastController } from '@ionic/vue';
import { trophyOutline } from 'ionicons/icons';
import router from '@/router/index';

export default {
  namespaced: true,
  state() {
    return {
      settings: {
        small: true,
        economic: true,
        health: true,
        large: true,
      },
    };
  },
  getters: {
    settings: (state) => {
      return state.settings;
    },
  },
  actions: {
    onAppStartup: async (context) => {
      const stateFromStorage = await context.dispatch('readFromStorage', { key: 'storeNotifications' }, { root: true });
      if (stateFromStorage) {
        context.state.settings = stateFromStorage.settings;
      }
    },
    setSettings: async (context, payload) => {
      context.state.settings = payload;
      context.dispatch('saveState', context.state);
    },
    saveState: (context, payload) => {
      context.dispatch(
        'saveToStorage',
        {
          key: 'storeNotifications',
          data: payload,
        },
        { root: true }
      );
    },
    notify: async (context, payload) => {
      const toast = await toastController.create({
        message: payload.message,
        duration: 4000,
        position: 'top',
        icon: trophyOutline,
        color: 'dark',
        buttons: [
          {
            side: 'end',
            text: 'Vis ',
            handler: () => {
              router.replace('/tabs/awards');
            },
          },
        ],
      });

      await toast.present();
    },
  },
  mutations: {},
};
