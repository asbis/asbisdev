<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#" @click.prevent="dismiss()" :disabled="resetting"> </ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
      <!-- <ion-toolbar>
                <ion-searchbar placeholder="Søk" v-model="searchQuery"></ion-searchbar>
            </ion-toolbar> -->
    </ion-header>
    <ion-content :fullscreen="false">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div v-if="resetting" align="center">
        <img src="assets/flaticon.com/single/trash.gif" style="width: 50%; max-width: 300px" /><br />
        Nullstiller...
      </div>
      <ion-list :inset="true" mode="ios" v-else>
        <ion-list-header color="calm3">
          <ion-label>Hva vil du nullstille?</ion-label>
        </ion-list-header>
        <ion-item :detail="false" color="calm3">
          <ion-label>Nullstill alt</ion-label>
          <ion-toggle slot="end" v-model="reset.everything" color="danger" @ionChange="toggleEverything($event)"> </ion-toggle>
        </ion-item>
        <ion-item :detail="false" color="calm3">
          <ion-label>Tidtakeren</ion-label>
          <ion-toggle slot="end" v-model="reset.timer" :disabled="everythingIsChecked" @ionChange="toggleChanged($event)"></ion-toggle>
        </ion-item>
        <ion-item :detail="false" color="calm3">
          <ion-label>Ting som hjelper mot suget</ion-label>
          <ion-toggle slot="end" v-model="reset.triggersHelpful" :disabled="everythingIsChecked" @ionChange="toggleChanged($event)"></ion-toggle>
        </ion-item>
        <ion-item :detail="false" color="calm3">
          <ion-label>Triggere som fører til bruk</ion-label>
          <ion-toggle slot="end" v-model="reset.triggersUnhelpful" :disabled="everythingIsChecked" @ionChange="toggleChanged($event)"> </ion-toggle>
        </ion-item>
        <ion-item :detail="false" color="calm3">
          <ion-label>Egendefinerte triggere</ion-label>
          <ion-toggle slot="end" v-model="reset.triggersCustom" :disabled="everythingIsChecked" @ionChange="toggleChanged($event)"> </ion-toggle>
        </ion-item>
        <ion-item :detail="false" color="calm3">
          <ion-label>Dagbok</ion-label>
          <ion-toggle slot="end" v-model="reset.diary" :disabled="everythingIsChecked" @ionChange="toggleChanged($event)"></ion-toggle>
        </ion-item>
        <ion-item :detail="false" color="calm3">
          <ion-label>Sparekalkulator</ion-label>
          <ion-toggle slot="end" v-model="reset.savingsCalculator" :disabled="everythingIsChecked" @ionChange="toggleChanged($event)"> </ion-toggle>
        </ion-item>
        <ion-item :detail="false" color="calm3">
          <ion-label>Innstillinger for sparekalkulator</ion-label>
          <ion-toggle slot="end" v-model="reset.savingsCalculatorSettings" :disabled="everythingIsChecked" @ionChange="toggleChanged($event)"> </ion-toggle>
        </ion-item>
        <ion-item :detail="false" color="calm3">
          <ion-label>Avatar</ion-label>
          <ion-toggle slot="end" v-model="reset.avatar" :disabled="everythingIsChecked" @ionChange="toggleChanged($event)"></ion-toggle>
        </ion-item>
        <ion-item :detail="false" color="calm3">
          <ion-label>Oppnådde prestasjoner</ion-label>
          <ion-toggle slot="end" v-model="reset.awards" :disabled="everythingIsChecked" @ionChange="toggleChanged($event)"></ion-toggle>
        </ion-item>
      </ion-list>
      <br />
      <div align="center" v-if="!resetting">
        <ion-button size="large" color="danger" shape="round" :disabled="!hasChanges" @click="resetData()"> Nullstill </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  // @ts-nocheck
  import { defineComponent, toRefs, reactive, computed } from 'vue';
  import { IonPage, IonHeader, IonToggle, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, modalController, ToggleCustomEvent, alertController } from '@ionic/vue';
  import _ from 'lodash';
  import { useStore } from 'vuex';
  import { Preferences } from '@capacitor/preferences';
  import selectProgramStartedAt from '@/modals/selectProgramStartedAt.vue';
  import dayjs from 'dayjs';

  export default defineComponent({
    name: 'ResetModal',
    components: { IonHeader, IonToggle, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, IonPage },
    props: {
      everything: {
        type: Boolean,
        default: false,
      },
      timer: {
        type: Boolean,
        default: false,
      },
      triggersHelpful: {
        type: Boolean,
        default: false,
      },
      triggersUnhelpful: {
        type: Boolean,
        default: false,
      },
      triggersCustom: {
        type: Boolean,
        default: false,
      },
      diary: {
        type: Boolean,
        default: false,
      },
      savingsCalculator: {
        type: Boolean,
        default: false,
      },
      savingsCalculatorSettings: {
        type: Boolean,
        default: false,
      },
      avatar: {
        type: Boolean,
        default: false,
      },
      awards: {
        type: Boolean,
        default: false,
      },
    },
    setup: (props) => {
      const store = useStore();
      const data = reactive({
        title: 'Nullstill app',
        reset: {
          // Tving boolean siden props kommer som 0/1
          everything: props.everything == true ? true : false,
          timer: props.everything == true || props.timer == true ? true : false,
          triggersHelpful: props.everything == true || props.triggersHelpful == true ? true : false,
          triggersUnhelpful: props.everything == true || props.triggersUnhelpful == true ? true : false,
          triggersCustom: props.everything == true || props.triggersCustom == true ? true : false,
          diary: props.everything == true || props.diary == true ? true : false,
          savingsCalculator: props.everything == true || props.savingsCalculator == true ? true : false,
          savingsCalculatorSettings: props.everything == true || props.savingsCalculatorSettings == true ? true : false,
          avatar: props.everything == true || props.avatar == true ? true : false,
          awards: props.everything == true || props.awards == true ? true : false,
        },
        hasChanges: computed(() => {
          return data.reset.everything === true || data.reset.timer === true || data.reset.triggersHelpful === true || data.reset.triggersUnhelpful === true || data.reset.triggersCustom === true || data.reset.diary === true || data.reset.savingsCalculator === true || data.reset.savingsCalculatorSettings === true || data.reset.avatar === true || data.reset.awards === true;
        }),
        everythingIsChecked: computed(() => {
          return data.reset.everything;
        }),
        beforeToggleAll: {},
        resetting: false,
      });

      async function dismiss() {
        modalController.dismiss();
      }

      async function toggleEverything(event: ToggleCustomEvent) {
        if (event.detail.checked) {
          data.beforeToggleAll = _.cloneDeep(data.reset);
          data.reset.everything = true;
          data.reset.timer = true;
          data.reset.triggersHelpful = true;
          data.reset.triggersUnhelpful = true;
          data.reset.triggersCustom = true;
          data.reset.diary = true;
          data.reset.savingsCalculator = true;
          data.reset.savingsCalculatorSettings = true;
          data.reset.avatar = true;
          data.reset.awards = true;
        } else {
          data.reset = _.cloneDeep(data.beforeToggleAll);
          data.reset.everything = false;
        }
      }

      async function toggleChanged(event) {
        if (event.detail.checked) {
          if (data.reset.timer === true && data.reset.triggersHelpful === true && data.reset.triggersUnhelpful === true && data.reset.diary === true && data.reset.savingsCalculator === true && data.reset.avatar === true) {
            data.reset.everything = true;
          }
        }
      }

      async function resetData() {
        if (data.reset.everything) {
          const confirmed = await confirm({ header: 'Er du sikker?', message: 'Du vil nå slette alt innhold i HAP, og dette kan ikke gjenopprettes.<br /><br />Husk at du vil miste din dagbok, triggerdagbok, sparekalkulator, oppnådde prestasjoner m.m.' });
          if (!confirmed) return;
          data.resetting = true; // Starter animasjon
          await Preferences.clear();
          localStorage.clear();
          window['programStartedAt'] = undefined; // Nullstill denne siden vi bruker den som "guards" i routeren
          setTimeout(() => {
            window.location = '/'; // Restarter appen ved å laste webview på nytt på /
            return;
          }, 3500);
        } else {
          // Bekreft
          let msg = `Det er ikke mulig å gjenopprette data som er nullstilt. Er du sikker på at du vil nullstille:<br /><br />`;

          if (data.reset.timer) msg += `- Tidtakeren<br />`;
          if (data.reset.triggersHelpful) msg += `- Positive triggere<br />`;
          if (data.reset.triggersUnhelpful) msg += `- Negative triggere<br />`;
          if (data.reset.triggersCustom) msg += `- Egendefinerte triggere<br />`;
          if (data.reset.diary) msg += `- Dagbok<br />`;
          if (data.reset.savingsCalculator) msg += `- Sparekalkulator<br />`;
          if (data.reset.savingsCalculatorSettings) msg += `- Innstillinger for sparekalkulator<br />`;
          if (data.reset.avatar) msg += `- Avatar<br />`;
          if (data.reset.awards) msg += `- Oppnådde prestasjoner<br />`;

          const confirmed = await confirm({ header: 'Er du sikker?', message: msg });
          if (!confirmed) {
            return;
          }

          let newProgramStartedAt = false;

          /**
           *  Finn først ut som sluttdato skal nullstilles. Dette krever i så fall at bruker velger en ny sluttdato.
           *  Hvis bruker ikke velger ny sluttdato, så avbryter vi nullstillingen.
           *  Hvis bruker velger ny sluttdato, så behandler vi denne helt til slutt, etter eventuelt andre stores er nullstilt.
           */
          if (data.reset.timer) {
            const top = await modalController.getTop();
            const modal = await modalController.create({
              component: selectProgramStartedAt,
              // @ts-ignore
              presentingElement: top,
              animated: true,
            });
            await modal.present();
            const resp = await modal.onDidDismiss();
            if (resp.data.cancelled) {
              const alert = await alertController.create({
                header: 'Avbrutt',
                message: 'Nullstilling ble avbrutt. Ingen av dine data er slettet.',
                buttons: ['OK'],
              });
              await alert.present();
              return;
            } else {
              newProgramStartedAt = resp.data.programStartedAt;
              window['programStartedAt'] = newProgramStartedAt;
            }
          }

          // Nullstill stores individuelt
          if (data.reset.triggersHelpful) {
            store.dispatch('triggerDiary/reset', { type: 'triggersHelpful' });
          }
          if (data.reset.triggersUnhelpful) {
            store.dispatch('triggerDiary/reset', { type: 'triggersUnhelpful' });
          }
          if (data.reset.triggersCustom) {
            store.dispatch('triggerDiary/reset', { type: 'triggersCustom' });
          }
          if (data.reset.diary) {
            store.dispatch('diary/reset');
          }
          if (data.reset.savingsCalculator) {
            store.dispatch('calculator/reset');
          }
          if (data.reset.savingsCalculatorSettings) {
            store.dispatch('calculator/resetSettings');
          }
          if (data.reset.avatar) {
            store.dispatch('setAvatar', 'assets/flaticon.com/collection-4/svg/078-user-8.svg');
          }
          if (data.reset.awards) {
            store.dispatch('awards/reset');
          }

          if (newProgramStartedAt !== false) {
            if (!data.reset.savingsCalculator) {
              /**
               *  Hvis sparekalkulator ikke skal nullstilles, men tidtakeren endres...
               *      - Skal vi da lagre verdien av kalkulatoren?
               */

              if (dayjs().isBefore(dayjs(newProgramStartedAt))) {
                // JA hvis slutttid er i fremtiden
                store.dispatch('calculator/saveCalculatorValue');
              } else {
                // Hvis ikke, så spør vi hva brukeren vil
                const confirmed = await confirm({
                  header: 'Vil du nullstille sparekalkulatoren?',
                  message: `Du har valgt å endre sluttdato, men ikke krysset av for å nullstille sparekalkulatoren. For at beregningen skal bli riktig anbefaler vi at du også nullstiller sparekalkulatoren. Hva vil du gjøre?`,
                  cancelText: 'Ikke nullstill sparekalkulatoren',
                  OKText: 'Nullstill sparekalkulatoren',
                });
                if (confirmed) {
                  store.dispatch('calculator/reset');
                  store.dispatch('calculator/resetSettings');
                }
              }
            }

            store.dispatch('setProgramStartedAt', { programStartedAt: newProgramStartedAt });
          }

          store.dispatch('awards/calculate');

          dismiss();
        }
      }

      async function confirm(options = { header: '', message: '', cancelText: null, OKText: null }) {
        const alert = await alertController.create({
          header: options.header,
          message: options.message,
          buttons: [
            {
              text: options.cancelText ? options.cancelText : 'Avbryt',
              role: 'cancel',
            },
            {
              text: options.OKText ? options.OKText : 'Fortsett',
              role: 'confirm',
            },
          ],
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();
        if (role === 'confirm') return true;
        return false;
      }

      return {
        ...toRefs(data),
        toggleEverything,
        toggleChanged,
        dismiss,
        resetData,
      };
    },
  });
</script>

<style scoped>
  ion-icon {
    font-size: var(--selectIconIconFontSize);
  }
</style>
