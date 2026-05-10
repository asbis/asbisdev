<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#" @click.prevent="dismiss()"> </ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding">
        <h3>Litt info</h3>
        <p>Appen HAP passer for deg som ønsker å slutte med, trappe ned eller ha en pause i cannabisbruk. Appens program strekker seg over 12 uker og du kan bruke den som et supplement til hasjavvenningsprogram med terapeut/annen behandling, eller du kan bruke den på egenhånd.</p>
        <p>Appen er utviklet av studenter fra Westerdahls i samarbeid med Rusinfo og Uteseksjonen i Oslo. Innholdet i appen er basert på oppdatert forskning om cannabis / behandling og erfaringsbasert kunnskap fra brukere og fagpersoner.</p>

        <p>Vi ønsker å være nøytrale i vår formidling av informasjon om cannabis. Send oss gjerne en melding dersom du har tilbakemeldinger du tenker kan hjelpe oss med å forbedre innholdet i appen. Du kan gi oss tilbakemelding ved å trykke "Gi anonym tilbakemelding" nederst på denne siden.</p>
        <p>RUSinfo sin nettside: <a @click.prevent="openUrl('https://www.rusinfo.no')">www.rusinfo.no</a></p>
        <p>Uteseksjonen i Oslo sin nettside: <a @click.prevent="openUrl('https://www.uteseksjonen.no')">www.uteseksjonen.no</a></p>
        <!-- <p>Denne appen er utviklet av Appfabrikken AS på vegne av .....</p>
                <p>Mer info fra kunde.</p>

                <br /> -->
        <br />
        <h3>Attribusjoner</h3>
        <p>Appen, og serveren appen henter informasjon fra, benytter flere forskjellige biblioteker og pakker. Vi ønsker å rette en stor takk til alle som har bidratt til åpen kildekode denne løsningen benytter seg av.</p>
        <br />
        <ion-list :inset="false">
          <ion-item button @click="showLicenses('app')">
            <ion-label>Vis lisenser for app</ion-label>
          </ion-item>
          <ion-item button @click="showLicenses('backend')">
            <ion-label> Vis lisenser for backend </ion-label>
          </ion-item>
        </ion-list>
        <br />
        <p>Ikonene som er brukt i appen stammer enten fra Ionicons (https://ionic.io/ionicons), eller så er de kjøpt inn fra tjenesten Flaticon (https://www.flaticon.com).</p>
        <br />
        <h3>Gi tilbakemelding</h3>
        <p>Opplever du feil i appen, eller har du andre tilbakemeldinger?</p>
        <ion-list :inset="false">
          <ion-item button @click="openFeedbackModal()">
            <ion-label>Gi anonym tilbakemelding</ion-label>
          </ion-item>
        </ion-list>
        <br />
        <br />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  // @ts-nocheck
  import { defineComponent, toRefs, reactive } from 'vue';
  import { IonPage, IonHeader, IonToggle, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, modalController } from '@ionic/vue';
  import licenseModal from '@/modals/licenses.vue';
  import feedbackModal from '@/modals/feedback.vue';

  import { Browser } from '@capacitor/browser';

  export default defineComponent({
    name: 'AboutModal',
    components: { IonHeader, IonToggle, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, IonPage },
    setup: () => {
      const data = reactive({
        title: 'Om appen',
      });

      async function dismiss() {
        modalController.dismiss();
      }

      async function showLicenses(type = 'app') {
        const top = await modalController.getTop();
        const modal = await modalController.create({
          component: licenseModal,
          animated: true,
          // @ts-ignore
          presentingElement: top,
          canDismiss: true,
          componentProps: {
            source: type,
          },
        });
        await modal.present();
        await modal.onDidDismiss();
      }

      async function openFeedbackModal() {
        const top = await modalController.getTop();
        const modal = await modalController.create({
          component: feedbackModal,
          animated: true,
          // @ts-ignore
          presentingElement: top,
          canDismiss: true,
        });
        await modal.present();
      }

      async function openUrl(url: string) {
        await Browser.open({ url: url, presentationStyle: 'popover' });
      }

      return {
        ...toRefs(data),
        dismiss,
        showLicenses,
        openFeedbackModal,
        openUrl,
      };
    },
  });
</script>

<style scoped>
  *,
  ion-list,
  ion-item,
  ion-toolbar,
  ion-header,
  ion-input,
  .toolbar {
    --background: var(--ion-color-calm4);
    --ion-background-color: var(--background);
  }

  * {
    --ion-toolbar-color: black;
  }

  a {
    text-decoration: none;
  }
</style>
