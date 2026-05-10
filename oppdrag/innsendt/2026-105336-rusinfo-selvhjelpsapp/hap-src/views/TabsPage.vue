<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/home" data-test="tabButtonHjem">
          <ion-icon :icon="home" />
          <ion-label>Hjem</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/diary" data-test="tabButtonDagbok">
          <ion-icon :icon="bookOutline" />
          <ion-label>Dagbok</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/stats" data-test="tabButtonOversikt">
          <ion-icon :icon="statsChart" />
          <ion-label>Oversikt</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/awards" data-test="tabButtonPrestasjoner">
          <ion-icon :icon="trophy" />
          <ion-label>Prestasjoner</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab5" href="/tabs/info" data-test="tabButtonInfo">
          <ion-icon :icon="book" />
          <ion-label>Info</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { home, statsChart, trophy, book, pencil, bookOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      home, statsChart, trophy, book, pencil, bookOutline
    }
  }
});
</script>
