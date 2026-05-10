// @ts-nocheck
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default {
  namespaced: true,
  state() {
    return {
      entries: [
        // {
        //     id: uuidv4(),
        //     date: dayjs().subtract(1, 'week').toISOString(),
        //     message: `Kort tekst her.
        //         Med linjeskift og alt mulig.
        //         Og enda litt mer info. Og så til slutt en hel masse forskjellig Lorem Ipsum Dipsum Osv.
        //         Det det handler om nå er å begrense den til tre linjehøyder.`,
        //     tags: ['xyz', 'Glad', 'Trist', '🚀']
        // }
      ],
    };
  },
  getters: {
    entries: (state) => {
      return state.entries;
    },
    tags: (state) => {
      let tags: string[] = [];
      for (const entry of state.entries) {
        tags = tags.concat(entry.tags);
      }
      return _.orderBy([...new Set(tags)]); // Returner unike
    },
    entryById: (state) => (id) => {
      const el = state.entries.find((el) => el.id === id);
      return el;
    },
  },
  actions: {
    onAppStartup: async (context) => {
      const stateFromStorage = await context.dispatch('readFromStorage', { key: 'storeDiary' }, { root: true });
      if (stateFromStorage) {
        context.state.entries = stateFromStorage.entries;
      }
    },
    saveEntry: (context, payload) => {
      if (payload.id === 'new') {
        payload.id = uuidv4();
        context.state.entries.push(payload);
      } else {
        const entry = context.state.entries.find((el) => el.id === payload.id);
        if (entry) {
          entry.message = payload.message;
          entry.tags = payload.tags;
          entry.date = payload.date;
        } else {
          console.error('Feil ved oppdatering av innlegg i dagbok. Fant ikke opprinnelig innlegg.');
        }
      }
      context.dispatch('saveState', context.state);
      return true;
    },
    reset: async (context) => {
      const arr = context.state.entries;
      while (arr.length > 0) {
        arr.pop();
      }
      context.dispatch('saveState', context.state);
    },
    deleteEntry: (context, payload) => {
      const entryIndex = context.state.entries.findIndex((el) => el.id === payload.id);
      context.state.entries.splice(entryIndex, 1);
      context.dispatch('saveState', context.state);
      return true;
    },
    saveState: (context, payload) => {
      context.dispatch(
        'saveToStorage',
        {
          key: 'storeDiary',
          data: payload,
        },
        { root: true }
      );
    },
  },
  mutations: {},
};
