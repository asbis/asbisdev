// @ts-nocheck
import dayjs from 'dayjs';
import _ from 'lodash';
// import { useStore } from 'vuex';
// const store = useStore();

export default {
  namespaced: true,
  state() {
    return {
      calculator: {
        value: 0,
        settings: {
          // PS: Endrer du her, endre også under "resetSettings" i actions
          active: false, // Spec. sier at bruker skal trykke "Start sparekalkulator" for å komme i gang med den
          pricePerGram: 150,
          numberOfGrams: 1,
          unit: 'days',
        },
      },
    };
  },
  //   mutations: {
  // setCalculatorValue(state, payload) {
  // Denne benyttes kun dersom brukeren nullstiller tidtakeren, men vil ivareta sparingen
  //   state.calculator.value = _.cloneDeep(payload); // TODO: Implementer
  // },
  //   },
  getters: {
    calculatorValue: (state, getters, rootState, rootGetters) => {
      // @ts-ignore
      if (rootGetters['programHasStarted']) {
        const programStartedAt = rootGetters['programStartedAt'];
        const units = dayjs().diff(dayjs(programStartedAt), state.calculator.settings.unit, true);
        const calculatedSpend = units * (state.calculator.settings.pricePerGram * state.calculator.settings.numberOfGrams);
        return calculatedSpend + state.calculator.value;
      }
      return state.calculator.value; // Sluttdato er frem i tid. Men vi kan ha tatt vare på verdier fra tidligere forsøk på å slutte, som uansett skal vises.
    },
    calculatorSettings: (state) => {
      return state.calculator.settings;
    },
    moneySavedPerSecond: (state) => {
      const pricePer = state.calculator.settings.pricePerGram * state.calculator.settings.numberOfGrams;
      const unit = state.calculator.settings.unit;
      if (unit === 'days') {
        return pricePer / (60 * 60 * 24);
      }
      if (unit === 'weeks') {
        return pricePer / (60 * 60 * 24 * 7);
      }
      if (unit === 'months') {
        return pricePer / (60 * 60 * 24 * 31);
      }
    },
  },
  actions: {
    onAppStartup: async (context) => {
      const stateFromStorage = await context.dispatch('readFromStorage', { key: 'storeCalculator' }, { root: true });
      if (stateFromStorage) {
        context.state.calculator = stateFromStorage.calculator;
      }
    },
    saveCalculatorSettings: (context, payload) => {
      // Siden ion-input dessverre returnerer string istedenfor number så konverterer vi her for å sikre at vi alltid har riktig datatype i store
      payload.pricePerGram = parseInt(payload.pricePerGram);
      payload.numberOfGrams = parseInt(payload.numberOfGrams);
      context.state.calculator.settings = _.cloneDeep(payload);
      context.dispatch('saveState', context.state);
      context.dispatch('awards/calculate', null, { root: true });
    },
    reset: (context) => {
      context.state.calculator.value = 0;
      context.state.calculator.settings.active = false; // Man forventer at å nullstille kalkulatoren gjør at den er som når man starter app første gang. Derfor må den aktiveres igjen for å begynne å regne.
      context.dispatch('saveState', context.state);
    },
    resetSettings: (context) => {
      context.state.calculator.settings.pricePerGram = 150;
      context.state.calculator.settings.numberOfGrams = 1;
      context.state.calculator.settings.unit = 'days';
      context.dispatch('saveState', context.state);
    },
    saveCalculatorValue: (context) => {
      // Lagre kalkulatorens verdi i forbindelse med nullstilling. Hvis man velger å ikke nullstille beløpet man har spart, så må calculatorValue lagers inn i value i forbindelse med endring av sluttdato.
      context.state.calculator.value = _.cloneDeep(context.getters['calculatorValue']);
      context.dispatch('saveState', context.state);
    },
    saveState: (context, payload) => {
      context.dispatch(
        'saveToStorage',
        {
          key: 'storeCalculator',
          data: payload,
        },
        { root: true }
      );
    },
  },
};
