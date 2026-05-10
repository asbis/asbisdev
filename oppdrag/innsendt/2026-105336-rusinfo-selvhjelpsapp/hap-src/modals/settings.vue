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
                <p>Varsler vises kun når du er inne i HAP-appen. Vi vil aldri sende deg pushvarsler eller på
                    annen måte varsle deg utenfor bruk av appen.</p>
            </div>

            <ion-list :inset="true" mode="ios">
                <ion-list-header color="light">
                    <ion-label>Vis varsel ved</ion-label>
                </ion-list-header>
                <ion-item :detail="false" color="light">
                    <ion-label>Små prestasjoner</ion-label>
                    <ion-toggle slot="end" v-model="notifications.small">
                    </ion-toggle>
                </ion-item>
                <ion-item :detail="false" color="light">
                    <ion-label>Store prestasjoner</ion-label>
                    <ion-toggle slot="end" v-model="notifications.large">
                    </ion-toggle>
                </ion-item>
                <ion-item :detail="false" color="light">
                    <ion-label>Helse prestasjoner</ion-label>
                    <ion-toggle slot="end" v-model="notifications.health">
                    </ion-toggle>
                </ion-item>
                <ion-item :detail="false" color="light">
                    <ion-label>Økonomiske prestasjoner</ion-label>
                    <ion-toggle slot="end" v-model="notifications.economic">
                    </ion-toggle>
                </ion-item>
            </ion-list>
            <br />
            <div align="center">
                <ion-button size="large" color="primary" shape="round" :disabled="!hasChanges" @click="save()">
                    Lagre
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
// @ts-nocheck
import { defineComponent, toRefs, reactive, computed, onMounted } from 'vue';
import { IonPage, IonHeader, IonToggle, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, modalController, alertController } from '@ionic/vue';
import _ from 'lodash';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'SettingsModal',
    components: { IonHeader, IonToggle, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, IonPage },
    setup: () => {
        const store = useStore();
        const data = reactive({
            title: 'Varslingsinnstillinger',
            notifications: { // Tving boolean siden props kommer som 0/1
                small: false,
                economic: false,
                health: false,
                large: false
            },
            original: {},
            hasChanges: computed(() => !_.isEqual(data.notifications, data.original))
        });

        onMounted(() => {
            data.original = _.cloneDeep(store.getters['notifications/settings']);
            data.notifications = _.cloneDeep(store.getters['notifications/settings']);
        });

        async function dismiss(force = false) {
            if (data.hasChanges && force === false) {
                const confirmed = await confirm({ header: 'Vil du lagre endringene?', message: 'Du har ikke lagret endringene dine. Vil du gå tilbake uten å lagre?' });
                if (confirmed) {
                    save();
                } else {
                    dismiss(true);
                }
            } else {
                modalController.dismiss();
            }
        }

        async function save() {
            store.dispatch('notifications/setSettings', data.notifications);
            dismiss(true);
        }


        async function confirm(options = { header: '', message: '' }) {
            const alert = await alertController.create({
                header: options.header,
                message: options.message,
                backdropDismiss: false,
                buttons: [
                    {
                        text: 'Ikke lagre',
                        role: 'cancel',
                    },
                    {
                        text: 'Lagre endringer',
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
            dismiss,
            save,
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

ion-toggle {
    --background: var(--ion-color-light-shade);
}

* {
    --ion-toolbar-color: black;
}

a {
    text-decoration: none;
}
</style>