<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="ion-no-border">
                <ion-buttons slot="start">
                    <ion-button @click="dismiss(true)" color="danger">Avbryt</ion-button>
                </ion-buttons>
                <ion-title>Velg ny sluttdato</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismiss()">Fortsett</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <!-- <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Hva skjer?</ion-title>
                </ion-toolbar>
            </ion-header> -->
            <div class="ion-padding">
                <p>Sluttdato er datoen du sluttet å bruke hasj, eller datoen du planlegger å slutte.</p>
                <!-- <p>Datoen danner grunnlaget for å vise hvor lenge du har klart deg uten, hvor mye penger du har spart,
                    og hvilke belønninger du har oppnådd i appen.</p> -->
                <p>Valgt dato: <strong>{{ dayjs(programStartedAt).format('LL') }}</strong></p>
                <br />
                <ion-datetime locale="nb-NO" v-model="programStartedAt" :first-day-of-week="1" presentation="date-time"
                    cancel-text="Avbryt" clear-text="Nullstill" done-text="OK">
                    <span slot="time-label">Klokkeslett</span>
                </ion-datetime>
            </div>

            <div align="center">
                <ion-button shape="round" size="default" color="primary" @click="dismiss()">
                    <!-- <ion-icon :icon="thumbsDownOutline" slot="start"></ion-icon> -->
                    Fortsett
                </ion-button>

            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonDatetime, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, modalController } from '@ionic/vue';
import dayjs from 'dayjs';

export default defineComponent({
    name: 'setProgramStartedAtSheet',
    components: { IonHeader, IonToolbar, IonDatetime, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, IonPage },
    setup: () => {
        const data = reactive({
            programStartedAt: dayjs().format()
        });
        async function dismiss(cancelled = false) {
            if (cancelled) {
                await modalController.dismiss({ cancelled: true });
            } else {
                await modalController.dismiss({ programStartedAt: dayjs(data.programStartedAt).toISOString() });
            }
        }

        return {
            ...toRefs(data),
            dayjs,
            dismiss
        }
    }
});
</script>
  
<style scoped>
*,
ion-list,
ion-item,
ion-toolbar,
ion-input {
    --background: var(--ion-color-calm1);
    --ion-background-color: var(--background);
    --color: black;
    color: black;
    --border-width: 0px !important;
}

ion-title {
    padding-top: 20px;
}


ion-button {
    --width: 200px;
}

h2 {
    padding-left: 10px;
    font-size: 34px;
    font-weight: 700;
}
</style>