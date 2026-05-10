<template>
    <ion-card @click="openSettingsModal()">
        <ion-card-header>
            <ion-card-subtitle>
                Sparekalkulator
            </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <template v-if="!hasStarted && calculatorValue <= 0">
                Du har valgt en sluttdato frem i tid. Når du har sluttet, vil kalkulatoren fortløpende beregne hvor mye
                du har spart.
            </template>
            <template v-if="!hasStarted && calculatorValue > 0">
                Du har tidligere spart <strong>{{ amountSaved }} kr</strong>. Dette beløpet vil fortsette å øke fra og
                med din planlagte sluttdato.
            </template>
            <template v-if="hasStarted && calculatorActive">
                Du har spart <strong>{{ amountSaved }} kr</strong>.
            </template>
            <template v-if="hasStarted && !calculatorActive">
                Sparekalkulatoren vil fortløpende regne ut hvor mye du har spart på å ikke bruke cannabis.<br /><br />
                <div align="center">
                    <ion-button shape="round" size="default" @click.stop="openSettingsModal({ setActive: true })">
                        <ion-icon :icon="calculatorOutline" slot="start"></ion-icon>
                        Start sparekalkulatoren
                    </ion-button>
                </div>
            </template>
        </ion-card-content>
    </ion-card>
</template>
  
<script lang="ts">
import { defineComponent, toRefs, reactive, computed } from 'vue';
import { IonCard, IonCardContent, IonButton, IonIcon, IonCardHeader, IonCardSubtitle, onIonViewDidLeave, modalController } from '@ionic/vue';
import SavingsCalculatorModal from '../modals/savingsCalculator.vue';
import { useStore } from 'vuex';
import { calculatorOutline } from 'ionicons/icons';

export default defineComponent({
    name: 'SavingsCalculatorComponent',
    setup: () => {
        const store = useStore();
        const data = reactive({
            calculatorActive: computed(() => store.getters['calculator/calculatorSettings'].active),
            calculatorValue: store.getters['calculator/calculatorValue'],
            amountSaved: numberFormat(store.getters['calculator/calculatorValue']),
            interval: undefined,
            hasStarted: computed(() => store.getters['programHasStarted'])
        })


        // Oppdater sum spart hvert sekund
        // @ts-ignore
        data.interval = setInterval(() => {
            update();
        }, 1000);

        function update() {
            data.calculatorValue = store.getters['calculator/calculatorValue'];
            data.amountSaved = numberFormat(store.getters['calculator/calculatorValue']);
        }

        function numberFormat(n: any) {
            n = n.toFixed(2);
            const parts = n.toString().split(".");
            const numberPart = parts[0];
            const decimalPart = parts[1];
            const thousands = /\B(?=(\d{3})+(?!\d))/g;
            return numberPart.replace(thousands, " ") + (decimalPart ? "," + decimalPart : "");
        }

        onIonViewDidLeave(() => {
            clearInterval(data.interval);
        })

        async function openSettingsModal(props = {}) {
            const modal = await modalController.create({
                component: SavingsCalculatorModal,
                animated: true,
                // @ts-ignore
                presentingElement: document.getElementById('main'),
                canDismiss: true,
                componentProps: props
            });
            await modal.present();
            await modal.onDidDismiss();
            update();
        }

        return {
            ...toRefs(data),
            openSettingsModal,
            calculatorOutline
        }
    },
    components: { IonCard, IonCardContent, IonButton, IonIcon, IonCardHeader, IonCardSubtitle }
});
</script>
  
<style scoped>

</style>
  