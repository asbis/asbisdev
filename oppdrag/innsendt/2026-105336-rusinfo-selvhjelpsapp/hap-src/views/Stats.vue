<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Oversikt</ion-title>
        <!-- <ion-buttons slot="end">
          <ion-button @click="registerTrigger()" data-click="registerTriggerKnapp">
            <ion-icon slot="start" :icon="addOutline"></ion-icon>
            Registrer
          </ion-button>
        </ion-buttons> -->
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Oversikt</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card v-if="daysPassed < 42 && displayAbstinenceGraph">
        <ion-card-header>
          <ion-card-subtitle>Abstinensoversikt</ion-card-subtitle>

          <ion-button fill="clear" class="infoBtn" @click="openInfoModal()">
            <ion-icon slot="icon-only" :icon="informationCircleOutline"></ion-icon>
          </ion-button>
        </ion-card-header>
        <ion-card-content v-if="daysPassed <= 56">
          <div style="display: flex; margin-left: 34px; margin-right: 20px; color: gray; font-size: 0.85em">
            <div style="flex: 1 1 26.2%" align="center" @click="openPhaseModal(1)" :class="{ active: currentPhase === 1 }">Fase 1</div>
            <div style="flex: 1 1 23.8%" align="center" @click="openPhaseModal(2)" :class="{ active: currentPhase === 2 }">Fase 2</div>
            <div style="flex: 1 1 50%" align="center" @click="openPhaseModal(3)" :class="{ active: currentPhase === 3 }">Fase 3</div>
          </div>
          <ChartAbstinenceGraph :secondsPassed="secondsPassed" @click="openPhaseModal(0)"></ChartAbstinenceGraph>
          <br />
          <div style="display: flex; justify-content: center; align-items: center; font-size: 9px">
            <div class="circle mood"></div>
            &nbsp;Humørsvingninger&nbsp;&nbsp;
            <div class="circle thc"></div>
            &nbsp;THC-metabolitter&nbsp;&nbsp;
            <div class="circle youAreHere"></div>
            &nbsp;Du er her&nbsp;&nbsp;
          </div>
        </ion-card-content>
      </ion-card>
      <ion-card v-else>
        <ion-card-content>
          <p>Du er nå i vedlikeholdsfasen i endringsprosessen din. Følg med på rullerende temaer under hjemfanen. Her kommer ukentlige temaer og øvelser frem til uke 12, og deretter månedlige temaer. Temaene har øvelser og refleksjonsspørsmål som kan gi støtte og motivasjon videre i prosessen din.</p>
          <p>Tips! Bruk gjerne dagboken i øvelsene, da blir det enklere for deg å jobbe aktivt med temaene og du får en god oversikt over egen prosess.</p>
          <p>Hvis du ønsker å se abstinensoversikt finner du denne under info-ikonet.</p>
        </ion-card-content>
      </ion-card>

      <!-- Triggerdagbok: Aktiviteter som hjelper mot suget -->
      <TriggerDiaryPieChart triggerType="helpful"></TriggerDiaryPieChart>

      <!-- Triggerdagbok: Triggere som fører til bruk -->
      <TriggerDiaryPieChart triggerType="unhelpful"></TriggerDiaryPieChart>

      <FABComponent></FABComponent>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, toRefs } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonIcon, IonButtons, IonButton, modalController } from '@ionic/vue';
  import ChartAbstinenceGraph from '@/components/ChartAbstinenceGraph';
  import TriggerDiaryPieChart from '@/components/triggerDiaryPieChart.vue';
  import FABComponent from '@/components/FAB.vue';
  import { pencilOutline } from 'ionicons/icons';
  import { addOutline } from 'ionicons/icons';
  import { useStore } from 'vuex';
  import { informationCircleOutline } from 'ionicons/icons';

  import phaseInfoModal from '@/modals/phaseInfo.vue';
  import abstinenceInfoModal from '@/modals/abstinenceInfoModal.vue';

  import _ from 'lodash';

  export default defineComponent({
    name: 'Tab3Page',
    setup() {
      const store = useStore();

      const data = reactive({
        secondsPassed: computed(() => store.getters['secondsPassed']),
        daysPassed: computed(() => store.getters['daysPassed']),
        currentPhase: computed(() => {
          const daysPassed = store.getters['daysPassed'];
          if (daysPassed <= 11) {
            return 1;
          }
          if (daysPassed <= 21) {
            return 2;
          }
          if (daysPassed <= 56) {
            return 3;
          }
          return 4;
        }),
        originalProgramStartedAt: _.cloneDeep(store.getters['programStartedAt']),
        displayAbstinenceGraph: true,
      });

      /**
       * Dette er en "hack" for å tegne opp hele abstinensgrafen på nytt hvis sluttiden til brukeren blir endret
       * (Sånn er det med umulige deadlines)
       */
      setInterval(() => {
        if (store.getters['programStartedAt'] !== data.originalProgramStartedAt) {
          data.displayAbstinenceGraph = false;
          setTimeout(() => {
            data.displayAbstinenceGraph = true;
            data.originalProgramStartedAt = _.cloneDeep(store.getters['programStartedAt']);
          }, 150);
        }
      }, 1000);

      async function openPhaseModal(phaseNr: number) {
        const currentPhase = data.currentPhase;
        if (phaseNr === 0) {
          phaseNr = currentPhase;
        }

        const modal = await modalController.create({
          component: phaseInfoModal,
          animated: true,
          // @ts-ignore
          presentingElement: document.getElementById('main'),
          canDismiss: true,
          componentProps: {
            phaseNr,
            currentPhase,
          },
        });
        await modal.present();
      }
      async function openInfoModal() {
        const modal = await modalController.create({
          component: abstinenceInfoModal,
          animated: true,
          // @ts-ignore
          presentingElement: document.getElementById('main'),
          canDismiss: true,
        });
        await modal.present();
      }

      return {
        ...toRefs(data),
        pencilOutline,
        addOutline,
        openPhaseModal,
        informationCircleOutline,
        openInfoModal,
      };
    },
    components: { ChartAbstinenceGraph, TriggerDiaryPieChart, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonIcon, IonButtons, IonButton, IonPage, FABComponent },
  });
</script>

<style scoped>
  .circle {
    height: 20px;
    width: 20px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }

  .mood {
    background-color: #b2dae8;
  }

  .thc {
    background-color: #a9d797;
  }

  .youAreHere {
    background-color: black;
  }

  .center {
    height: 309px;
    line-height: 309px;
    /* same as height! */
  }

  .active {
    font-weight: bold;
  }

  .infoBtn {
    position: absolute;
    top: 0px;
    right: 0px;
  }
</style>
