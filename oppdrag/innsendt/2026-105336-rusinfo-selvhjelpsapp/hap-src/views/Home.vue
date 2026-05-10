<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Hjem</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Hjem</ion-title>
        </ion-toolbar>
      </ion-header>

      <info-component color="calm3"></info-component>
      <timer-component color="calm1" :hasStarted="hasStarted"></timer-component>
      <savings-calculator-component color="calm2" data-test="savingsCalculatorComponent" :hasStarted="hasStarted">
      </savings-calculator-component>
      <theme-of-the-day-component color="calm4"></theme-of-the-day-component>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <FABComponent></FABComponent>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed } from 'vue';
import { IonPage, IonHeader, IonButtons, IonMenuButton, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import InfoComponent from '../components/InfoComponent.vue';
import TimerComponent from '../components/TimerComponent.vue';
import SavingsCalculatorComponent from '../components/SavingsCalculatorComponent.vue';
import ThemeOfTheDayComponent from '@/components/ThemeOfTheDayComponent.vue';
import FABComponent from '@/components/FAB.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Tab1Page',
  setup: () => {
    const store = useStore();
    const data = reactive({
      hasStarted: computed(() => store.getters['programHasStarted'])
    });

    return {
      ...toRefs(data)
    }
  },
  components: { IonHeader, IonButtons, IonMenuButton, IonToolbar, IonTitle, IonContent, IonPage, TimerComponent, InfoComponent, SavingsCalculatorComponent, ThemeOfTheDayComponent, FABComponent }
});
</script>

<style scoped>
ion-menu-button {
  /* --background: var(--ion-color-calm3); */
  --color: black;
}
</style>