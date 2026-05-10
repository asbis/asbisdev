<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="#" @click.prevent="dismiss()" data-test="dagbokRedigerKnappTilbake">
                    </ion-back-button>
                </ion-buttons>
                <ion-title>{{title}}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="del()" color="danger" v-if="form.id !== 'new'"
                        data-test="dagbokRedigerKnappSlett">Slett</ion-button>
                    <ion-button @click="save()" v-show="isChanged" data-test="dagbokRedigerKnappLagre">Lagre
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{title}}</ion-title>
                </ion-toolbar>
            </ion-header>

            <div class="content ion-padding">

            </div>

            <ion-list>
                <ion-item>
                    <ion-label>
                        Dato
                    </ion-label>
                    <ion-datetime-button datetime="datetime" color="calm1" data-test="dagbokRedigerKnappDatetime">
                    </ion-datetime-button>
                    <ion-modal :keep-contents-mounted="true" data-test="dagbokRedigerModalDatetime">
                        <ion-datetime v-model="form.date" id="datetime" presentation="date" :max="maxDate"
                            :show-default-buttons="true" done-text="OK" cancel-text="Avbryt">
                            <span slot="title">Velg dato for dagboknotat</span>
                        </ion-datetime>
                    </ion-modal>

                </ion-item>
                <ion-item>
                    <ion-label position="stacked">
                        Notat
                    </ion-label>
                    <ion-textarea placeholder="Skriv her..." :auto-grow="true" v-model="form.message"
                        data-test="dagbokRedigerInputNotat"></ion-textarea>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">
                        Tags ({{form.tags.length === 0 ? 'Ingen ' : form.tags.length }} er valgt)
                    </ion-label>
                    <ion-buttons slot="end">
                        <ion-button @click="createTag()" data-test="dagbokRedigerKnappNyTag">
                            <ion-icon :icon="addOutline"></ion-icon>
                            Ny tag
                        </ion-button>
                    </ion-buttons>
                    <br />
                    <div>

                        <ion-chip v-for="(tag, index) in availableTags" :key="tag" @click="selectTag(tag)"
                            :class="form.tags.find(el => el === tag) ? 'selected' : 'unselected'"
                            :color="form.tags.find(el => el === tag) ? 'primary' : 'medium'"
                            :data-test="'dagbokRedigerTag-'+index">{{tag}}</ion-chip>


                    </div>
                </ion-item>
            </ion-list>

            <div align="center" v-show="isChanged">
                <br />
                <br />
                <ion-button size="large" shape="round" color="primary" @click="save()"
                    data-test="dagbokRedigerKnappLagreStor">Lagre</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted } from 'vue';
import { IonIcon, IonChip, IonTextarea, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonDatetimeButton, IonDatetime, IonModal, IonRadio } from '@ionic/vue';
import { alertController, modalController } from '@ionic/core';
import { computed } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';
import { confirm } from '../helpers/confirm'
import dayjs from 'dayjs';
import { addOutline } from 'ionicons/icons';

export default defineComponent({
    name: 'DiaryEditModal',
    components: { IonIcon, IonChip, IonTextarea, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonDatetimeButton, IonDatetime, IonModal, IonRadio },
    props: {
        id: {
            type: String
        }
    },
    setup: (props) => {
        const store = useStore();
        const data = reactive({
            form: {
                id: props.id,
                date: dayjs().toISOString(),
                message: '',
                tags: []
            },
            title: computed(() => {
                if (props.id === 'new') return 'Nytt dagboknotat'
                const form: any = data.form;
                return 'Notat ' + dayjs(form.date).format('DD.MM.YYYY')
            }),
            originalForm: {}, // Her lagrer vi en kopi av originalt notat så vi har noe å sammenligne med for å detektere endringer
            isChanged: computed(() => {
                // const dataForm:any = data.form;
                const form: any = data.form;
                const originalForm: any = data.originalForm;
                return !_.isEqual(form, originalForm);
            }),
            maxDate: dayjs().toISOString(),
            availableTags: store.getters['diary/tags']
        });
        onMounted(() => {
            if (props.id !== 'new') {
                data.originalForm = _.cloneDeep(store.getters['diary/entryById'](props.id));
                data.form = _.cloneDeep(store.getters['diary/entryById'](props.id));
            } else {
                data.originalForm = _.cloneDeep(data.form);
            }
        });
        async function dismiss(force = false) {
            if (!force) {
                if (data.isChanged) {
                    const confirmed = await confirm({
                        header: 'Er du sikker?',
                        message: 'Endringene du har gjort blir ikke lagret.'
                    });
                    if (!confirmed) {
                        return;
                    }
                }
            }
            await modalController.dismiss();
        }
        function save() {
            store.dispatch('diary/saveEntry', data.form);
            dismiss(true);
        }
        async function del() {
            const confirmed = await confirm({
                header: 'Er du sikker?',
                message: 'Hvis du sletter ditt innlegg i daboken kan det ikke hentes frem igjen.'
            });
            if (confirmed) {
                store.dispatch('diary/deleteEntry', data.form);
                dismiss(true);
            }
        }
        function selectTag(tag: any) {
            const exists = data.form.tags.findIndex(el => el === tag);
            if (exists === -1) {
                // @ts-ignore
                data.form.tags.push(tag);
                return true;
            } else {
                data.form.tags.splice(exists, 1);
                return false;
            }
        }
        async function createTag() {
            const alert = await alertController.create({
                header: 'Opprett ny tag',
                buttons: [{
                    text: 'Legg til',
                    cssClass: 'alertCreateTagOKButtonClass',
                    role: 'confirm'
                }],
                inputs: [
                    {
                        placeholder: 'Skriv her...',
                        attributes: {
                            maxlength: 20,
                        },
                        name: 'tag'
                    }
                ],
            });

            await alert.present();
            const resp = await alert.onDidDismiss();
            const newTag = resp.data.values.tag;

            // @ts-ignore
            selectTag(newTag);
            // @ts-ignore
            const exists = data.availableTags.findIndex(el => el === newTag);
            if (exists === -1) {
                data.availableTags.push(newTag);
            }
        }
        return {
            ...toRefs(data),
            dismiss,
            save,
            del,
            selectTag,
            addOutline,
            createTag
        }
    }
});
</script>
  
<style scoped>
ion-page,
ion-content,
ion-list,
ion-item,
ion-toolbar,
ion-input {
    --background: var(--ion-color-calm1);
    --ion-background-color: var(--background);
}

ion-datetime {
    /* --background: white; */
    --background: var(--ion-color-calm1);
    color: black;
    border: 1px solid black;
}

* {
    --ion-toolbar-color: black;
}

.selected {
    border: 2px solid green;
}

.unselected {
    border: none;
}
</style>