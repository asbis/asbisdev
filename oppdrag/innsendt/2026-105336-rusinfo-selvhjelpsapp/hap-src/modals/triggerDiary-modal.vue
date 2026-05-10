<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#" @click.prevent="dismiss()"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <!-- <ion-buttons slot="end" v-show="isChanged">
                    <ion-button @click="save()">Lagre</ion-button>
                </ion-buttons> -->
        <ion-buttons slot="end">
          <ion-button v-if="hasChanged" @click="save()" data-test="triggerDagbokLagreKnapp"> Lagre </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" data-test="triggerDagbokContent">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" data-test="triggerDagbokContentTitle">{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list data-test="triggerDagbokList">
        <ion-item v-for="item in triggers" :key="item.id">
          <ion-icon slot="start" :src="item.icon"> </ion-icon>
          <ion-label>{{ item.title }}</ion-label>
          <ion-checkbox slot="end" v-model="item.selected" :data-test="'trigger-' + item.id"> </ion-checkbox>
        </ion-item>
      </ion-list>
      <br />
      <ion-list lines="none">
        <ion-item @click="addCustomTrigger()" button :detail="false" data-test="leggTilEgenTriggerKnapp">
          <ion-icon slot="start" :icon="icons.addOutline"></ion-icon>
          <ion-label>Legg til egen trigger</ion-label>
        </ion-item>
      </ion-list>
      <br />
      <br />
      <div data-test="triggerDagbokBunn" style="width: 100%; height: 10px"></div>
      <!-- <pre>{{triggers}}</pre> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonIcon, IonCheckbox, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, modalController } from '@ionic/vue';
  import * as icons from 'ionicons/icons';
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import _ from 'lodash';
  import TriggerDiaryAddCustomTriggerModal from '@/modals/triggerDiary-addCustomTrigger.vue';

  export default defineComponent({
    name: 'TriggerDiaryModal',
    components: { IonHeader, IonToolbar, IonTitle, IonIcon, IonCheckbox, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, IonPage },
    props: {
      triggerType: {
        type: String,
        validator: (value: string) => {
          return ['helpful', 'unhelpful'].includes(value);
        },
      },
    },
    setup: (props) => {
      const store = useStore();

      const data = reactive({
        title: props.triggerType === 'helpful' ? 'Hva hjalp deg?' : 'Hva trigget deg?',
        triggerType: props.triggerType,
        triggers: _.cloneDeep(store.getters['triggerDiary/triggers']),
        hasChanged: computed(() => {
          const change = (data as any).triggers.find((el: any) => el.selected === true);
          if (change) return true;
          return false;
        }),
      });

      function toggleSelect(item: any) {
        console.warn('toggleSelect');
        if (item.selected === undefined || item.selected === false) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        console.warn('New value set to:', item.selected);
      }

      async function save() {
        await store.dispatch('triggerDiary/register', {
          triggerType: data.triggerType,
          triggers: data.triggers.filter((el: any) => el.selected === true),
        });
        dismiss();

        // TODO: Bytt til riktig tab, siden FAB for å legge til triggere er synlig også på andre tabs enn "Stats"
      }
      async function addCustomTrigger() {
        const top = await modalController.getTop();
        const modal = await modalController.create({
          component: TriggerDiaryAddCustomTriggerModal,
          animated: true,
          // @ts-ignore
          presentingElement: top,
          canDismiss: true,
        });
        await modal.present();
        // Oppdater listen lokalt med eventuell ny trigger som brukeren har lagt til
        const newTriggerData = await modal.onDidDismiss();
        if (newTriggerData.data) {
          data.triggers.push(newTriggerData.data);
        }
      }

      function dismiss() {
        modalController.dismiss();
      }

      return {
        ...toRefs(data),
        icons,
        toggleSelect,
        save,
        addCustomTrigger,
        dismiss,
      };
    },
  });
</script>

<style scoped>
  *,
  ion-list,
  ion-item,
  ion-toolbar,
  ion-input {
    --background: var(--ion-color-calm2);
    --ion-background-color: var(--background);
  }
</style>
