<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="ion-no-border">
                <ion-title>Triggerdagbok</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="ion-padding">
                <h2>Hva skjer?</h2>
            </div>

            <div align="center">
                <br />
                <ion-button shape="round" size="large" color="calm3" @click="openTriggerDiaryModal('helpful')"
                    data-test="JegMotstodRusKnapp">
                    <!-- <ion-icon :icon="thumbsUpOutline" slot="start"></ion-icon> -->
                    Jeg brukte ikke cannabis
                </ion-button><br />
                <ion-button shape="round" size="large" color="calm1" @click="openTriggerDiaryModal('unhelpful')"
                    data-test="JegRusetMegKnapp">
                    <!-- <ion-icon :icon="thumbsDownOutline" slot="start"></ion-icon> -->
                    Jeg brukte cannabis
                </ion-button>

            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, modalController, useIonRouter } from '@ionic/vue';
import TriggerDiaryModal from '@/modals/triggerDiary-modal.vue';

export default defineComponent({
    name: 'triggerDiarySheet',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, IonPage },
    setup: () => {
        const router = useIonRouter();

        async function openTriggerDiaryModal(triggerType: "helpful" | "unhelpful") {
            await modalController.dismiss();
            const modal = await modalController.create({
                component: TriggerDiaryModal,
                animated: true,
                // @ts-ignore
                presentingElement: document.getElementById('main'),
                canDismiss: true,
                componentProps: {
                    triggerType
                }
            });
            await modal.present();
            router.replace('/tabs/stats');
        }

        return {
            openTriggerDiaryModal
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
    --background: var(--ion-color-calm4);
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