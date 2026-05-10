<template>
  <ion-app>
    <ion-menu contentId="main" :swipe-gesture="true" type="push" :disabled="sidemenuDisabled">
      <ion-header>
        <ion-toolbar color="calm3">
          <ion-title>HAP</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list :inset="true" mode="ios">
          <ion-list-header color="calm3">
            <ion-label>Generelt</ion-label>
          </ion-list-header>
          <ion-menu-toggle>
            <ion-item button :detail="false" color="calm3" @click="openModal('settings')">
              <ion-icon slot="start" :icon="cogOutline"></ion-icon>
              <ion-label>Innstillinger</ion-label>
            </ion-item>
          </ion-menu-toggle>
          <ion-menu-toggle>
            <ion-item button :detail="false" color="calm3" @click="openModal('about')">
              <ion-icon slot="start" :icon="informationOutline"></ion-icon>
              <ion-label>Om appen</ion-label>
            </ion-item>
          </ion-menu-toggle>
          <ion-list-header color="calm3">
            <ion-label>Tilbakestilling</ion-label>
          </ion-list-header>
          <ion-menu-toggle>
            <ion-item button :detail="false" color="calm3" @click="showResetModal({ everything: true })">
              <ion-icon slot="start" :icon="warningOutline"></ion-icon>
              <ion-label>Nullstill alt</ion-label>
            </ion-item>
          </ion-menu-toggle>
          <ion-menu-toggle>
            <ion-item button :detail="false" color="calm3" @click="showResetModal({ timer: true })">
              <ion-icon slot="start" :icon="hourglassOutline"></ion-icon>
              <ion-label>Nullstill tidtakeren</ion-label>
            </ion-item>
          </ion-menu-toggle>
          <ion-menu-toggle>
            <ion-item button :detail="false" color="calm3"
              @click="showResetModal({ triggersHelpful: true, triggersUnhelpful: true })">
              <ion-icon slot="start" :icon="listOutline"></ion-icon>
              <ion-label>Nullstill triggere</ion-label>
            </ion-item>
          </ion-menu-toggle>
          <ion-menu-toggle>
            <ion-item button :detail="false" color="calm3" @click="showResetModal({})">
              <ion-icon slot="start" :icon="toggleOutline"></ion-icon>
              <ion-label>Flere valg</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="main" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonMenuToggle, IonIcon, IonMenu, IonToolbar, IonTitle, IonContent, IonHeader, IonList, IonListHeader, IonItem, IonLabel, modalController } from '@ionic/vue';
import { defineComponent, computed, toRefs, reactive } from 'vue';
import { hourglassOutline, warningOutline, informationOutline, listOutline, toggleOutline, cogOutline } from 'ionicons/icons';
import { useStore } from 'vuex';

import resetModal from '@/modals/reset.vue';
import aboutModal from '@/modals/about.vue';
import settingsModal from '@/modals/settings.vue';


export default defineComponent({
  name: 'App',
  setup: () => {
    const store = useStore();
    const data = reactive({
      sidemenuDisabled: computed(() => store.getters['programStartedAt'] === null ? true : false)
    });

    async function showResetModal(props: any = {}) {
      const modal = await modalController.create({
        component: resetModal,
        animated: true,
        // @ts-ignore
        presentingElement: document.getElementById('main'),
        canDismiss: true,
        componentProps: props,
      });
      await modal.present();
      await modal.onDidDismiss();
    }
    async function openModal(name: string) {
      let component = aboutModal; // Default
      if (name === 'about') {
        component = aboutModal;
      } else if (name === 'settings') {
        // @ts-ignore
        component = settingsModal;
      }

      const modal = await modalController.create({
        component,
        animated: true,
        // @ts-ignore
        presentingElement: document.getElementById('main'),
        canDismiss: true,
      });
      await modal.present();
    }

    return {
      ...toRefs(data),
      hourglassOutline, warningOutline, informationOutline, toggleOutline, cogOutline, listOutline,
      showResetModal,
      openModal
    }
  },
  components: {
    IonApp,
    IonRouterOutlet, IonMenuToggle, IonIcon, IonMenu, IonToolbar, IonTitle, IonContent, IonHeader, IonList, IonListHeader, IonItem, IonLabel,
  }
});
</script>