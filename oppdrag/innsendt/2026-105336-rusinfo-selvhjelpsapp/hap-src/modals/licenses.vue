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
                <p>Denne løsningen er bygget ved hjelp av mange små og store biblioteker.</p>
                <p>Tusen takk til teamene bak disse {{   items.length   }} pakkene/bibliotekene:</p>
            </div>

            <ion-list>
                <ion-item v-for="item in items.slice(0, pageSize)" :key="item.key" @click="openLicense(item)" button
                    :detail="false">
                    <ion-label>
                        {{   packageNameFromKey(item.key)   }}
                    </ion-label>
                </ion-item>
            </ion-list>

            <!-- <pre>{{items[0]}}</pre> -->

            <br />
            <ion-infinite-scroll @ionInfinite="loadData($event)" threshold="100px" id="infinite-scroll"
                :disabled="isDisabled">
                <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Laster flere lisenser...">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>

            <br />
            <br />
            <br />

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
// @ts-nocheck
import { defineComponent, toRefs, reactive, onMounted } from 'vue';
import { IonPage, IonHeader, IonToggle, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, modalController, actionSheetController, alertController } from '@ionic/vue';
import appLicenses from '../../public/assets/licenses-app.json';
import backendLicenses from '../../public/assets/licenses-backend.json';
import { Browser } from '@capacitor/browser';

export default defineComponent({
    name: 'LicenseModal',
    components: { IonHeader, IonToggle, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, IonPage },
    props: {
        source: {
            type: String,
            default: 'app'
        }
    },
    setup: (props) => {
        const data = reactive({
            title: 'Lisenser',
            items: [],
            pageSize: 25,
            isDisabled: false
        })

        onMounted(() => {
            if (props.source === 'app') {
                data.items = appLicenses;
            } else if (props.source === 'backend') {
                data.items = backendLicenses;
            }
        });


        async function dismiss() {
            modalController.dismiss();
        }

        const loadData = (ev: any) => {
            setTimeout(() => {
                data.pageSize = data.pageSize + 150;
                ev.target.complete();

                // App logic to determine if all data is loaded
                // and disable the infinite scroll
                if (data.pageSize >= data.items.length) {
                    data.isDisabled = true;
                    ev.target.disabled = true;
                }
            }, 500);
        }

        function packageNameFromKey(key) {
            const temp = key.split('@');
            const name = key.replace('@' + temp[temp.length - 1], ''); // Remove the last @... from the key, so that we don't display version number. I.e. "@babel/parser@7.12.7" turns into ""@babel/parser"
            return name;
        }

        async function presentAlert(melding) {
            const alert = await alertController.create({
                message: melding,
                buttons: ['OK'],
            });

            await alert.present();
        }

        async function openLicense(item) {
            const header = packageNameFromKey(item.key);
            const buttons = [];
            if (item.licenseText) {
                buttons.push({
                    text: 'Vis lisens',
                    handler: async () => {
                        presentAlert(item.licenseText);
                    },
                });
            }
            if (item.repository) {
                buttons.push({
                    text: 'Besøk repository',
                    handler: async () => {
                        await Browser.open({ url: item.repository, presentationStyle: 'popover' });
                    },
                });
            }
            buttons.push({
                text: 'Avbryt',
                role: 'cancel',
            });
            const actionSheet = await actionSheetController.create({
                header,
                subHeader: item.publisher ? `Utgitt av ${item.publisher}` : '',
                buttons,
            });
            return actionSheet.present();
        }


        return {
            ...toRefs(data),
            dismiss,
            loadData,
            openLicense,
            packageNameFromKey
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
    --background: var(--ion-color-calm3);
    --ion-background-color: var(--background);
}


* {
    --ion-toolbar-color: black;
}

ion-label {
    white-space: normal !important;
}
</style>