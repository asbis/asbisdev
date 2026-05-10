<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="#" @click.prevent="dismiss()" data-test="customTriggerTilbakeKnapp">
                    </ion-back-button>
                </ion-buttons>
                <ion-title>Legg til trigger</ion-title>
                <!-- <ion-buttons slot="end" v-show="isChanged">
                    <ion-button @click="save()">Lagre</ion-button>
                </ion-buttons> -->
                <ion-buttons slot="end">
                    <ion-button v-if="hasChanged" @click="save()" data-click="customTriggerLagreKnapp">
                        Lagre
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Legg til trigger</ion-title>
                </ion-toolbar>
            </ion-header>



            <ion-list>
                <ion-item>
                    <ion-label position="stacked">Tittel</ion-label>
                    <ion-input placeholder="Skriv her.." v-model="form.title" data-test="inputCustomTriggerTittel">
                    </ion-input>
                </ion-item>
                <ion-item @click="selectIcon()" button :detail="false">
                    <ion-label>Ikon</ion-label>
                    <ion-button color="primary" shape="round" v-if="form.icon === ''"
                        data-test="customTriggerVelgIkonKnapp">Velg ikon
                    </ion-button>
                    <ion-icon slot="end" :src="form.icon" v-if="form.icon !== ''" data-test="customTriggerByttIkonIcon">
                    </ion-icon>
                </ion-item>
            </ion-list>

            <!-- <pre>{{form}}</pre> -->

            <div align="center" v-show="hasChanged">
                <br />
                <br />
                <ion-button size="large" shape="round" color="primary" @click="save()"
                    data-test="customTriggerLagreKnappStor">Lagre</ion-button>
            </div>



        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonIcon, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, modalController } from '@ionic/vue';
import SelectIcon from '@/modals/selectIcon.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';
import { confirm } from '../helpers/confirm'
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
    name: 'TriggerDiaryAddCustomTriggerModal',
    components: { IonHeader, IonToolbar, IonTitle, IonIcon, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, IonPage },
    setup: () => {
        const store = useStore();
        const data = reactive({
            form: {
                title: '',
                icon: '',
                id: ''
            },
            originalForm: {
                title: '',
                icon: '',
            },
            hasChanged: computed(() => {
                const form: any = data.form;
                const originalForm: any = data.originalForm;
                return !_.isEqual(form, originalForm)
            })
        })

        async function save() {
            // Sjekk at ikke samme trigger finnes fra før
            if (store.getters['triggerDiary/triggers'].find((el: any) => el.title === data.form.title)) {
                await confirm({
                    canDismiss: false,
                    header: `"${data.form.title}" finnes fra før`,
                    message: `Du kan ikke ha mer enn èn trigger med samme navn.`,
                    okButtonText: 'OK'
                })
                return;
            }

            if (data.form.title === '') {
                await confirm({
                    canDismiss: false,
                    header: `Ugyldig navn`,
                    message: `Du må oppgi et navn på triggeren`,
                    okButtonText: 'OK'
                })
                return;
            }

            data.form.id = uuidv4();
            store.dispatch('triggerDiary/createCustomTrigger', data.form);

            dismiss(data.form);
        }

        function dismiss(dismissData: any = false) {
            if (dismissData === undefined) {
                dismissData = false;
            }
            modalController.dismiss(dismissData);
        }

        async function selectIcon() {
            const top = await modalController.getTop();
            const modal = await modalController.create({
                component: SelectIcon,
                animated: true,
                // @ts-ignore
                presentingElement: top,
                canDismiss: true,
                componentProps: {
                    iconSet: 'icons',
                    backgroundColor: 'white',
                }
            });
            await modal.present();
            // Oppdater listen lokalt med eventuell ny trigger som brukeren har lagt til
            const modalData = await modal.onDidDismiss();
            if (modalData.data) {
                data.form.icon = modalData.data;
            }
        }

        return {
            ...toRefs(data),
            save,
            dismiss,
            selectIcon
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
    --background: var(--ion-color-calm2);
    --ion-background-color: var(--background);
}

* {
    --ion-toolbar-color: black;
}
</style>