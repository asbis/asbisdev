<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="#" @click.prevent="dismiss()">
                    </ion-back-button>
                </ion-buttons>
                <ion-title>{{ title }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <h1 class="condenseTitle" v-if="title.length > 19">{{ title }}</h1>
                    <ion-title size="large" v-else>{{ title }}</ion-title>
                </ion-toolbar>
            </ion-header>

            <div align="center">
                <br />
                <img src="assets/Abstinensgraf.png" style="width: 90%; border-radius: 20px"> <br />
                <span style="font-size: 0.9em">Illustrasjonsbilde av abstinensgrafen (ikke klikkbar)</span>
            </div>
            <div class="ion-padding">
                <p>Den svarte streken viser hvor du befinner deg i programmet. Klikk på faseoverskriftene for å lese
                    mer.</p>

                <p>Grafene er kun en visuell illustrasjon for at du lettere vil kunne få en oversikt over vanlige
                    utfordringer og abstinenssymptomer i en slutteprosess, og for å vise at THC-metabolitter
                    (nedbrytningsprodukter) skilles ut av kroppen over tid. Det er ikke nødvendigvis noe forhold mellom
                    THC grafen, humørsvingninger og andre abstinenssymptomer.</p>

                <p>Modellen er basert på kliniske erfaringer og empiri. Det vil si brukeres erfaringer med å slutte med
                    cannabis. Dette er ikke en modell som forteller hvordan slutteprosessen fungerer nevrobiologisk.</p>

                <p>Det kan komme endringer og justeringer i denne modellen over tid, når ytterligere kliniske erfaringer
                    vil bli systematisert sammen med forskningen på feltet.</p>

                <br />
                <br />
                <strong>Graf THC-metabolitter</strong>
                <p>Denne grafen viser tiden det kan ta for THC-metabolitter å skilles ut av kroppen om du har brukt
                    cannabis regelmessig. Det kan ta opptil seks uker (og i noen tilfeller lengre) før THC-metabolitter
                    er skilt ut av kroppen, dersom du har brukt cannabis over tid.</p>

                <br />
                <br />
                <strong>Graf humørsvingninger</strong>
                <p>Denne grafen viser hva du kan forvente av humørsvingninger og andre abstinenssymptomer når du slutter
                    med cannabis etter jevnlig bruk. Grafen viser at perioden med abstinenser kan deles inn i ulike
                    faser der både intensitet og kvalitet kan variere. I den første fasen kan det ofte være fysiske
                    abstinensplager. Deretter øker abstinensene og går over til å ha mer psykisk karakter (sterke
                    følelser) med en topp rundt 2 – 2,5 uker, før abstinensplagene avtar i sum etter rundt 3-4 uker, og
                    man går inn i fase 3. Grafen er en generell fremstilling, men det vil være individuelle forskjeller
                    i graden av humørsvingninger og andre abstinensplager man kan oppleve når man slutter.</p>

            </div>

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
// @ts-nocheck
import { defineComponent, toRefs, reactive } from 'vue';
import { IonPage, IonHeader, IonCard, IonCardContent, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, modalController } from '@ionic/vue';

export default defineComponent({
    name: 'AbstinenceInfoModal',
    components: { IonHeader, IonCard, IonCardContent, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, IonPage },
    setup: () => {
        const data = reactive({
            title: 'Abstinensoversikt'
        });


        async function dismiss() {
            modalController.dismiss();
        }

        return {
            ...toRefs(data),
            dismiss,
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

p {
    margin-bottom: 0px;
}

ion-card {
    margin-top: 0px;
}
</style>