// @ts-nocheck
import dayjs from 'dayjs';
import _ from 'lodash';

export default {
  namespaced: true,
  state() {
    return {
      availableAwards: [
        {
          id: 1,
          title: 'Første dagen uten!',
          type: 'small',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 86400,
          body: 'Du har klart din første dag uten cannabis!',
          completed: false,
          estimatedTimeLeft: null, // Denne blir kalkulert av calculate()
        },
        {
          id: 2,
          title: '3 dager uten!',
          type: 'small',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 259200,
          body: 'Du har klart 3 dager uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 3,
          title: '2 uker uten!',
          type: 'small',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 1209600,
          body: 'Du har klart to uker uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 4,
          title: '3 uker uten!',
          type: 'small',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 1814400,
          body: 'Du har tre uker uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 5,
          title: 'En måned uten!',
          type: 'small',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 2628003,
          body: 'Du har klart deg en hel måned uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 6,
          title: '5 uker uten!',
          type: 'small',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 3024000,
          body: 'Du har holdt deg fem uker uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 7,
          title: '6 uker uten!',
          type: 'small',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 3628800,
          body: 'Du har holdt deg seks uker uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 8,
          title: '7 uker uten!',
          type: 'small',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 4233600,
          body: 'Du har holdt deg syv uker uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 9,
          title: '2 måneder uten!',
          type: 'small',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 5184000,
          body: 'Du har holdt deg to måneder uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 10,
          title: 'Første skrittet!',
          type: 'small',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 0,
          body: 'Du har tatt det første skrittet mot en rusfri hverdag!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 11,
          title: 'Første uken uten!',
          type: 'small',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 604800,
          body: 'Du har klart en uke uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 12,
          title: 'Fase 1 gjennomført!',
          type: 'large',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 1036800,
          body: 'Du har kommet deg gjennom fase 1 av HAP programmet!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 13,
          title: 'Fase 2 gjennomført!',
          type: 'large',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 1814400,
          body: 'Du har kommet deg gjennom fase 2 av HAP programmet!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 14,
          title: 'HAP gjennomført!',
          type: 'large',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 4838400,
          body: 'Du har kommet deg gjennom HAP programmet, det er 8 uker rusfri!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 15,
          title: 'Et halvt år uten!',
          type: 'large',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 15768000,
          body: 'Du har holdt deg et halvt år uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 16,
          title: 'Et helt år uten!',
          type: 'large',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 31536000,
          body: 'Du har holdt deg et helt år uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 17,
          title: 'To år uten!',
          type: 'large',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 63072000,
          body: 'Du har holdt deg to år uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 18,
          title: 'Tre år uten!',
          type: 'large',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 94608000,
          body: 'Du har holdt deg tre år uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 19,
          title: 'Fire år uten!',
          type: 'large',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 126144000,
          body: 'Du har holdt deg fire år uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 20,
          title: 'Fem år uten!',
          type: 'large',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 157680000,
          body: 'Du har holdt deg fem år uten cannabis!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 21,
          title: 'Brukt kalkulatoren!',
          type: 'economic',
          criteriaType: 'moneySaved',
          criteriaValue: 1,
          body: 'Du har tatt i bruk kalkulatoren!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 22,
          title: '1000 kr Spart!',
          type: 'economic',
          criteriaType: 'moneySaved',
          criteriaValue: 1000,
          body: 'Du har spart 1000 kr!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 23,
          title: '5000 kr Spart!',
          type: 'economic',
          criteriaType: 'moneySaved',
          criteriaValue: 5000,
          body: 'Du har spart 5000 kr!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 24,
          title: '10 000 kr Spart!',
          type: 'economic',
          criteriaType: 'moneySaved',
          criteriaValue: 10000,
          body: 'Du har spart 10 000 kr!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 25,
          title: '20 000 kr Spart!',
          type: 'economic',
          criteriaType: 'moneySaved',
          criteriaValue: 20000,
          body: 'Du har spart 20 000 kr!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 26,
          title: '30 000 kr Spart!',
          type: 'economic',
          criteriaType: 'moneySaved',
          criteriaValue: 30000,
          body: 'Du har spart 30 000 kr!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 27,
          title: '40 000 kr Spart!',
          type: 'economic',
          criteriaType: 'moneySaved',
          criteriaValue: 40000,
          body: 'Du har spart 40 000 kr!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 28,
          title: '50 000 kr Spart!',
          type: 'economic',
          criteriaType: 'moneySaved',
          criteriaValue: 50000,
          body: 'Du har spart 50 000 kr!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 29,
          title: '100 000 kr Spart!',
          type: 'economic',
          criteriaType: 'moneySaved',
          criteriaValue: 100000,
          body: 'Du har spart hele 100 000 kr!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 30,
          title: '1 000 000 kr Spart!',
          type: 'economic',
          criteriaType: 'moneySaved',
          criteriaValue: 1000000,
          body: 'Du har spart hele 1 000 000 kr!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 31,
          title: 'Mer matlyst',
          type: 'health',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 777600,
          body: 'Nå opplever mange å få bedre matlyst/appetitt',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 32,
          title: 'Svetting',
          type: 'health',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 864000,
          body: 'Nå kan du forvente at svettingen begynner å avta',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 33,
          title: 'Mindre rastløshet',
          type: 'health',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 1296000,
          body: 'Her kan du forvente at rastløsheten vil roe seg',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 34,
          title: 'Om følelser',
          type: 'health',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 1814400,
          body: 'Nå opplever flere at følelser som sinne, aggresjon og angst vil roe seg',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 35,
          title: 'Mindre irritasjon',
          type: 'health',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 1900800,
          body: 'Nå opplever mange at de blir mindre irritable',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 36,
          title: 'Bedre korttidshukommelse',
          type: 'health',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 2592000,
          body: 'Ofte vil korttidshukommelsen nå bli bedre',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 37,
          title: 'Bedre Søvn',
          type: 'health',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 3456000,
          body: 'Nå opplever mange at de sover bedre, men søvnforstyrrelser kan vare lenger for noen',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 38,
          title: 'Sov Godt',
          type: 'health',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 4320000,
          body: 'Nå kan du forvente at drømmeaktiviteten din blir mer rolig og stabil, og drømmene mindre intense',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 39,
          title: 'Gratulerer!',
          type: 'large',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 84 * (60 * 60 * 24),
          body: 'Du har nå fullført første vedlikeholdsfase!',
          completed: false,
          estimatedTimeLeft: null,
        },
        {
          id: 40,
          title: 'Gratulerer!',
          type: 'large',
          criteriaType: 'secondsSinceProgramStarted',
          criteriaValue: 100 * (60 * 60 * 24),
          body: 'Det er nå 100 dager siden du startet HAP!',
          completed: false,
          estimatedTimeLeft: null,
        },
      ],
      achievedAwards: [],
    };
  },
  getters: {
    availableAwards: (state) => {
      return state.availableAwards;
    },
    achievedAwards: (state) => {
      return state.achievedAwards;
    },
    upcomingAwards: (state, getters, rootState, rootGetters) => {
      const calculatorActive = rootGetters['calculator/calculatorSettings'].active;
      if (calculatorActive) {
        return _.orderBy(
          state.availableAwards.filter((el) => el.completed === false),
          [['estimatedTimeLeft'], ['asc']]
        );
      } else {
        return _.orderBy(
          state.availableAwards.filter((el) => el.completed === false && el.type !== 'economic'),
          [['estimatedTimeLeft'], ['asc']]
        );
      }
    },
  },
  actions: {
    onAppStartup: async (context) => {
      const stateFromStorage = await context.dispatch('readFromStorage', { key: 'storeAwards' }, { root: true });
      if (stateFromStorage) {
        context.state.achievedAwards = stateFromStorage.achievedAwards;
      }
    },
    saveState: (context, payload) => {
      context.dispatch(
        'saveToStorage',
        {
          key: 'storeAwards',
          data: {
            achievedAwards: payload.achievedAwards,
          },
        },
        { root: true }
      );
    },
    calculate: (context) => {
      const programStartedAt = context.rootGetters['programStartedAt'];

      // Ikke kjør noe av logikken før vi har en sluttdato å forholde oss til
      if (programStartedAt === null) {
        return;
      }

      // Regn ut prestasjoner og kommende prestasjoner
      const achievedAwards = _.cloneDeep(context.state.achievedAwards);
      const achievedAwardsDuringThisCalculation = [];
      const availableAwards = context.state.availableAwards;

      const moneySaved = context.rootGetters['calculator/calculatorValue'];
      const calculatorActive = context.rootGetters['calculator/calculatorSettings'].active;

      const secondsPassed = dayjs().diff(dayjs(programStartedAt), 'second', false); // Antall sekunder som har gått siden bruker startet programmet

      let count = 0;
      let newAwardsAchieved = 0;
      for (const award of availableAwards) {
        let awardAchieved = false;
        // Sjekk om award-vilkår er oppfylt
        if (award.criteriaType === 'secondsSinceProgramStarted') {
          if (secondsPassed > award.criteriaValue) {
            awardAchieved = true;
          }
        } else if (award.criteriaType === 'moneySaved') {
          if (calculatorActive) {
            if (moneySaved >= award.criteriaValue) {
              awardAchieved = true;
            }
          }
        }

        // Har brukeren allerede oppnådd denne prestasjonen?
        let awardAlreadyAchieved = false;
        if (
          achievedAwards.find((el) => {
            if (el.id === award.id) {
              if (el.programStartedAt === programStartedAt) {
                // Identisk dato
                return true;
              }
              if (dayjs(el.programStartedAt).isAfter(dayjs(programStartedAt))) {
                // Bruker skal kunne endre sin sluttdato og sette den lenger bak i tid, uten at det gjør at samme award oppnås om igjen.
                return true;
              }
              if (dayjs(el.achievedAt).isAfter(dayjs(programStartedAt))) {
                // Bruker skal ikke få samme award på nytt dersom den ble oppnådd etter valgt sluttdato. Dvs. å flytte sluttdatoen fremover gjør at du kun får awards på nytt
                return true;
              }
              return false;
            }
          })
        ) {
          awardAlreadyAchieved = true;
        }

        if (awardAchieved) {
          // Sjekk at award ikke allerede er oppnådd
          if (!awardAlreadyAchieved) {
            console.warn(`Award oppnådd: ${award.title}`);
            // Legg til som oppnådd
            newAwardsAchieved++;
            const newlyAchievedAward = {
              ...award,
              completed: true,
              estimatedTimeLeft: 0,
              programStartedAt,
              achievedAt: dayjs().add(count, 'seconds').toISOString(), // Unngå at alle får samme achievedAt, slik at vi kan sortere listen fornuftig etterpå
            };
            achievedAwards.push(newlyAchievedAward);
            achievedAwardsDuringThisCalculation.push(newlyAchievedAward);
            count++;
          } else {
            console.warn(`Award allerede oppnådd: ${award.title}`);
          }
          award.completed = true; // Sett den som completed så vi ikke viser den på "Neste presetasjon"-listen
        } else {
          // Award ikke oppnådd (og ikke allerede oppnådd).
          // Vi må nå regne på hvor lenge det er til den er klar, så vi kan vise hva som er det neste som kommer.
          if (awardAlreadyAchieved) {
            award.completed = true;
          } else {
            let estimatedTimeLeft = 60 * 60 * 24 * 365;

            if (award.criteriaType === 'secondsSinceProgramStarted') {
              estimatedTimeLeft = award.criteriaValue - secondsPassed; // Hvor mange sekunder igjen til denne award er oppnådd
            }
            if (award.criteriaType === 'moneySaved') {
              const moneyLeftToSave = award.criteriaValue - moneySaved;
              const moneySavedPerSecond = context.rootGetters['calculator/moneySavedPerSecond'];
              estimatedTimeLeft = moneyLeftToSave / moneySavedPerSecond;
            }

            if (estimatedTimeLeft < 0) {
              estimatedTimeLeft = estimatedTimeLeft * -1; // Gjør negative tall positive
            }

            award.completed = false;
            award.estimatedTimeLeft = estimatedTimeLeft;
            award.estimatedCompletedAt = dayjs().add(estimatedTimeLeft, 'seconds').toISOString();
          }
        }
      }

      if (newAwardsAchieved > 0) {
        context.state.achievedAwards = achievedAwards; // Oppdater state
        context.dispatch('saveState', { achievedAwards }); // Lagre

        // Varsel
        const notifyAwards = [];
        const settings = context.rootGetters['notifications/settings'];
        for (const award of achievedAwardsDuringThisCalculation) {
          if (settings.small === true && award.type === 'small') notifyAwards.push(award);
          if (settings.economic === true && award.type === 'economic') notifyAwards.push(award);
          if (settings.health === true && award.type === 'health') notifyAwards.push(award);
          if (settings.large === true && award.type === 'large') notifyAwards.push(award);
        }

        let message = '';

        if (notifyAwards.length > 0) {
          if (newAwardsAchieved > 1) {
            message = `Du har oppnådd "${notifyAwards[notifyAwards.length - 1].title}" og ${newAwardsAchieved - 1} andre prestasjoner 👏`;
          } else {
            message = `Du har oppnådd prestasjonen "${notifyAwards[0].title}" 👏`;
          }
          context.dispatch(
            'notifications/notify',
            {
              message,
            },
            { root: true }
          );
        }
      }
    },
    reset: (context) => {
      const arr = context.state.achievedAwards;
      while (arr.length > 0) {
        arr.pop();
      }
      context.dispatch('saveState', { achievedAwards: context.state.achievedAwards });
    },
  },
  mutations: {},
};
