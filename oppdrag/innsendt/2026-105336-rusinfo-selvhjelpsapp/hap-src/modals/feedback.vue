<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="#" @click.prevent="dismiss()">
                    </ion-back-button>
                </ion-buttons>
                <ion-title>{{   title   }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{   title   }}</ion-title>
                </ion-toolbar>
            </ion-header>

            <div class="ion-padding">
                <p>Her kan du sende oss anonyme tilbakemeldinger. Dersom du rapporterer om feil i appen, skriv gjerne
                    hva slags mobil og operativsystem du bruker.</p>
                <br />
                <br />
                <ion-item>
                    <ion-textarea placeholder="Skriv din tilbakemelding her.." v-model="feedback" :auto-grow="true"
                        autocapitalize="sentences" enterkeyhint="done" :disabled="posting"></ion-textarea>
                </ion-item>
                <div align="center">
                    <br />
                    <br />
                    <ion-button size="large" shape="round" color="primary" :disabled="feedback.length <= 5 || posting"
                        @click="sendFeedback()">
                        <template v-if="posting">
                            <ion-spinner name="circular"></ion-spinner>
                        </template>
                        <template v-else>
                            Send tilbakemelding
                        </template>
                    </ion-button>
                </div>
            </div>


        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
// @ts-nocheck
import { defineComponent, toRefs, reactive } from 'vue';
import { IonPage, IonHeader, IonToggle, IonTextarea, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonSpinner, IonRadio, modalController, alertController } from '@ionic/vue';
import { useApiService } from '@/composables/apiService';
const api = useApiService();

export default defineComponent({
    name: 'FeedbackModal',
    components: { IonHeader, IonToggle, IonTextarea, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonSpinner, IonRadio, IonPage },
    setup: () => {
        const data = reactive({
            title: 'Gi tilbakemelding',
            feedback: '',
            posting: false
        })


        async function dismiss() {
            modalController.dismiss();
        }

        async function sendFeedback() {
            data.posting = true;
            await api.post('anonymous-feedbacks', {
                data: {
                    body: data.feedback
                }
            });
            setTimeout(async () => {
                data.feedback = '';
                data.posting = false;
                dismiss();
                const alert = await alertController.create({
                    header: 'Takk 🙏',
                    message: 'Din tilbakemelding er nå sendt. Siden den er sendt anonymt, har vi ikke anledning til å svare deg direkte.',
                    buttons: ['OK'],
                });
                await alert.present();
            }, 1000);
        }

        return {
            ...toRefs(data),
            dismiss,
            sendFeedback
        }
    }
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
    --background: var(--ion-color-calm2);
    --ion-background-color: var(--background);
}


* {
    --ion-toolbar-color: black;
}

ion-textarea {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
}
</style>