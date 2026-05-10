<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="#" @click.prevent="dismiss()" data-test="sparekalkulatorTilbake">
                    </ion-back-button>
                </ion-buttons>
                <ion-title>Sparekalkulator</ion-title>
                <ion-buttons slot="end" v-show="isChanged">
                    <ion-button @click="save()">Lagre</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Sparekalkulator</ion-title>
                </ion-toolbar>
            </ion-header>

            <div class="content ion-padding">
                <p>Her kan du fylle inn hvor mye du betaler per gram og hvor mye du pleier å bruke. Appen vil automatisk
                    holde kontroll på hvor mye du har spart!</p>
            </div>

            <ion-list>
                <ion-item>
                    <ion-label>
                        Aktiver sparekalkulator
                    </ion-label>
                    <ion-toggle v-model="form.active"></ion-toggle>
                </ion-item>
            </ion-list>
            <br />
            <ion-list>
                <ion-item>
                    <ion-label>
                        Pris per gram
                    </ion-label>
                    <ion-input v-model="form.pricePerGram" :clear-input="true" enterkeyhint="next" inputmode="numeric"
                        type="number" :required="true" class="ion-text-right" data-test="inputPricePerGram"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>
                        Antall gram
                    </ion-label>
                    <ion-input v-model="form.numberOfGrams" :clear-input="true" enterkeyhint="next" inputmode="numeric"
                        type="number" :required="true" class="ion-text-right"></ion-input>
                </ion-item>
            </ion-list>
            <br />
            <!-- <br /> -->
            <ion-list>
                <ion-radio-group v-model="form.unit">
                    <ion-item>
                        <ion-label>
                            Per dag
                        </ion-label>
                        <ion-radio value="days">Dag</ion-radio>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            Per uke
                        </ion-label>
                        <ion-radio value="weeks">Uke</ion-radio>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            Per måned
                        </ion-label>
                        <ion-radio value="months">Måned</ion-radio>
                    </ion-item>
                </ion-radio-group>
            </ion-list>

            <div align="center" v-show="isChanged">
                <br />
                <br />
                <ion-button size="large" shape="round" color="primary" @click="save()"
                    data-test="knappSparekalkulatorLagre">Lagre</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonToggle, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio } from '@ionic/vue';
import { modalController } from '@ionic/core';
import { computed } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';
import { confirm } from '../helpers/confirm'

export default defineComponent({
    name: 'SavingsCalculatorModal',
    components: { IonHeader, IonToolbar, IonToggle, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, IonPage },
    props: {
        setActive: { // Om vi skal tvinge verdien av settins.active til true
            default: null,
            type: Boolean
        }
    },
    setup: (props) => {
        const store = useStore();
        const data = reactive({
            form: {
                pricePerGram: 0,
                numberOfGrams: 0,
                unit: 'days',
                active: false
            },
            settings: computed(() => store.getters['calculator/calculatorSettings']),
            isChanged: computed(() => {
                const settings = store.getters['calculator/calculatorSettings'];
                const formData: any = data.form;
                formData.pricePerGram = parseInt(formData.pricePerGram); // ion-input returnerer string ved en feil, så vi må sammenligne riktig datatype
                formData.numberOfGrams = parseInt(formData.numberOfGrams); // ion-input returnerer string ved en feil, så vi må sammenligne riktig datatype
                return !_.isEqual(settings, formData);
            })
        });
        onMounted(() => {
            const settings = _.cloneDeep(data.settings);
            if (props.setActive) {
                settings.active = true;
            }
            setTimeout(() => {
                data.form = settings;
            }, 100);
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
            store.dispatch('calculator/saveCalculatorSettings', data.form);
            dismiss(true);
        }
        return {
            ...toRefs(data),
            dismiss,
            save
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