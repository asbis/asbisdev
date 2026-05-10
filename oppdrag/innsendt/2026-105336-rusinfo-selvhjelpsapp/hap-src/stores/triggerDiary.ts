// @ts-nocheck
import _ from 'lodash';

export default {
  namespaced: true,
  state() {
    return {
      triggers: {
        default: [
          {
            icon: 'assets/flaticon.com/collection-1/svg/027-alcohol.svg',
            title: 'Alkohol',
            id: '1',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/037-anxiety-2.svg',
            title: 'Angst',
            id: '2',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/050-reward.svg',
            title: 'Belønning',
            id: '3',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/063-coffee-cup-1.svg',
            title: 'Drikke',
            id: '4',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/020-cannabis.svg',
            title: 'Eksponering',
            id: '5',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/066-alone-1.svg',
            title: 'Ensom',
            id: '6',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/076-summer-holidays.svg',
            title: 'Ferie',
            id: '7',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/080-party.svg',
            title: 'Fest',
            id: '8',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/091-watching-a-movie.svg',
            title: 'Film',
            id: '9',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/102-happy-3.svg',
            title: 'Glad',
            id: '10',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/107-suitcase.svg',
            title: 'Jobb',
            id: '12',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/117-bored-3.svg',
            title: 'Kjedsomhet',
            id: '13',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/121-argument.svg',
            title: 'Krangel',
            id: '14',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/128-night-mode.svg',
            title: 'Kveldstid',
            id: '15',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/136-books-1.svg',
            title: 'Lesing',
            id: '16',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/138-tv.svg',
            title: 'Media',
            id: '17',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/142-eat.svg',
            title: 'Mett',
            id: '18',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/149-morning-1.svg',
            title: 'Morgen',
            id: '19',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/165-music-1.svg',
            title: 'Musikk',
            id: '20',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/170-meeting.svg',
            title: 'Møte',
            id: '21',
          },
          {
            icon: 'assets/flaticon.com/collection-2/svg/008-laptop-1.svg',
            title: 'PC',
            id: '22',
          },
          {
            icon: 'assets/flaticon.com/collection-2/svg/016-screaming.svg',
            title: 'Redd',
            id: '23',
          },
          {
            icon: 'assets/flaticon.com/collection-2/svg/021-love-birds.svg',
            title: 'Romanse',
            id: '24',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/172-hygiene-routine.svg',
            title: 'Rutine',
            id: '25',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/180-conversation.svg',
            title: 'Samtale',
            id: '11',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/191-sex-1.svg',
            title: 'Sex',
            id: '27',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/199-angry-5.svg',
            title: 'Sint',
            id: '28',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/227-sleeping-3.svg',
            title: 'Sliten',
            id: '29',
          },
          {
            icon: 'assets/flaticon.com/collection-2/svg/042-gamepad.svg',
            title: 'Spill',
            id: '30',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/213-under-stress.svg',
            title: 'Stressa',
            id: '31',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/217-hungry.svg',
            title: 'Sulten',
            id: '32',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/221-sick-1.svg',
            title: 'Syk',
            id: '33',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/226-sleeping-2.svg',
            title: 'Søvn',
            id: '34',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/228-box.svg',
            title: 'Tomhet',
            id: '35',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/236-workout-2.svg',
            title: 'Trening',
            id: '36',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/239-sad-2.svg',
            title: 'Trist',
            id: '37',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/242-walking-1.svg',
            title: 'Tur',
            id: '38',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/245-friends.svg',
            title: 'Venner',
            id: '39',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/251-cloudy-day.svg',
            title: 'Været',
            id: '40',
          },
          {
            icon: 'assets/flaticon.com/collection-1/svg/256-credit.svg',
            title: 'Økonomi',
            id: '41',
          },
        ], // Settet som følger med automatisk
        custom: [], // Brukerens egne
      },
      diary: {
        helpful: [], // "Hjelper mot suget"
        unhelpful: [], // "Fører til bruk"
      },
    };
  },
  getters: {
    entries: (state) => (triggerType) => {
      return state.diary[triggerType];
    },
    triggers: (state) => {
      let items = state.triggers.default.concat(state.triggers.custom); // Slå sammen de to arrayene
      items = items.map((el) => {
        el.selected = false;
        return el;
      }); // Sett selected til false som default
      return _.orderBy(items, ['title'], ['asc']); // Sorter alfabetisk
    },
  },
  actions: {
    onAppStartup: async (context) => {
      const stateFromStorage = await context.dispatch('readFromStorage', { key: 'storeTriggerDiary' }, { root: true });
      if (stateFromStorage) {
        context.state.triggers.custom = stateFromStorage.triggers.custom;
        context.state.diary = stateFromStorage.diary;
      }
    },
    register: (context, payload) => {
      context.commit('registerTrigger', payload);
      context.dispatch('saveState', context.state);
    },
    createCustomTrigger: (context, payload) => {
      context.commit('addCustomTrigger', payload);
      context.dispatch('saveState', context.state);
      return true;
    },
    deleteCustomTrigger: (context, payload) => {
      const entryIndex = context.state.triggers.custom.findIndex((el) => el.id === payload.id);
      context.state.entries.splice(entryIndex, 1);
      context.dispatch('saveState', context.state);
      return true;
    },
    reset: (context, payload) => {
      const type = payload.type;
      if (type === 'triggersHelpful') {
        const arr = context.state.diary.helpful;
        while (arr.length > 0) {
          arr.pop();
        }
      }
      if (type === 'triggersUnhelpful') {
        const arr = context.state.diary.unhelpful;
        while (arr.length > 0) {
          arr.pop();
        }
      }
      if (type === 'triggersCustom') {
        const arr = context.state.triggers.custom;
        while (arr.length > 0) {
          arr.pop();
        }
      }
      context.dispatch('saveState', context.state);
      return true;
    },
    saveState: (context, payload) => {
      context.dispatch(
        'saveToStorage',
        {
          key: 'storeTriggerDiary',
          data: {
            triggers: {
              custom: payload.triggers.custom,
            },
            diary: payload.diary,
          },
        },
        { root: true }
      );
    },
  },
  mutations: {
    registerTrigger(state, payload) {
      const { triggerType, triggers } = payload;
      if (triggerType === 'helpful') {
        for (const item of triggers) {
          state.diary.helpful.push(item);
        }
      } else if (triggerType === 'unhelpful') {
        for (const item of triggers) {
          state.diary.unhelpful.push(item);
        }
      }
      return;
    },
    addCustomTrigger(state, payload) {
      state.triggers.custom.push(payload);
      return;
    },
  },
};
