<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#" @click.prevent="dismiss()"> </ion-back-button>
        </ion-buttons>
        <ion-title>{{ shortTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <h1 class="condenseTitle" v-if="title.length > 19">{{ title }}</h1>
          <ion-title size="large" v-else>{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <h1 class="condenseTitle" v-if="title.length > 19 && !isPlatform('ios')">{{ title }}</h1>

      <ion-card v-if="phaseNr === currentPhase" color="calm4">
        <ion-card-content>
          <p>Dette er fasen du befinner deg i nå.</p>
        </ion-card-content>
      </ion-card>

      <div class="ion-padding">
        <template v-if="phaseNr === 1">
          <p>Har man brukt mye cannabis over tid, vil mange oppleve at kroppen reagerer med abstinensplager når man slutter.</p>
          <p>Fasen etter å ha sluttet med cannabis kjennetegnes for mange av fysiske reaksjoner som svetting, nedsatt appetitt, søvnforstyrrelser og rastløshet.</p>
          <p>Abstinenssymptomene er kroppens måte å si at den ønsker «påfyll» av THC.</p>
          <p>Ubehaget er forbigående, og dette er ikke en tilstand du vil være i over lang tid.</p>
          <h2>Gode huskeregler:</h2>
          <p>Ubehaget du opplever nå er abstinenssymptomer. Det er naturlige reaksjoner på at du har sluttet med cannabis. Ha fokus på å lage gode strategier for å klare deg gjennom ubehaget. Og husk at det går over! Se mer info under tips og råd til å slutte, og strategier.</p>
          <br />
          <div align="center">
            <img src="assets/images/fase1.png" alt="To personer med hette på står i en mørk skog. Foto." /><br />
            Foto: Stig Hauger
          </div>
        </template>
        <template v-if="phaseNr === 2">
          <p>I fase 2 er det mange som opplever å kjenne på følelser som angst, uro og rastløshet.</p>
          <p>I denne fasen er det vanlig å kjenne på ensomhet og isolasjon, men positive og gode følelser kan også få mer plass.</p>
          <p>Følelsene svinger, og du vil kanskje merke at du blir mer nærtagen, sårbar og sensitiv. Dette kan gjøre at man lettere kommer i konflikt og krangel med sine nærmeste.</p>
          <p>Det er vanlig å kjenne på følelser som irritasjon, sinne og aggresjon.</p>
          <p>Noen gråter mye og “fylles” eller overveldes av følelser, samtidig som opplevelsen kan være vanskelig å beskrive med ord.</p>
          <p>Alle slike reaksjoner er helt normale og er naturlig konsekvens av at du har sluttet med cannabis.</p>
          <p>Etter ca. tre til fire uker vil de fleste oppleve at følelsene roer seg.</p>
          <p>Mange opplever også positiv forandring når de nærmer seg fase tre. Dette kan være økt kontroll over tanker, større grad av sammenheng, bedre hukommelse og konsentrasjon, samt styrket evne til å analysere og sette ord på egne følelser/opplevelser.</p>
          <p>Det er forskjeller i intensiteten av følelser. Noen opplever mye følelser og angst her, andre rapporterer om at de nesten ikke kjenner noe til dette. Det er ingen fasitsvar her. Noen har også underliggende psykiske plager som kan komme mer opp i denne fasen.</p>
          <h2>Gode huskeregler:</h2>
          <p>Det vil bli bedre, ta en dag av gangen. Vær bevisst at følelser kan ta litt overhånd i denne fasen – vent med store beslutninger til du har vært lenger uten cannabis. Snakk med noen om det som er vanskelig (venn, familie, noen i hjelpeapparatet, RUStelefonen). Fokuser på positive aktiviteter, unngå andre rusalternativer som f.eks. alkohol.</p>
          <br />
          <div align="center">
            <img src="assets/images/fase2.png" alt="En jente sykler i oppoverbakke. Foto." /><br />
            Foto: Stig Hauger
          </div>
        </template>
        <template v-if="phaseNr === 3">
          <p>Fasen starter etter ca. 21 dager og varer 8 uker eller lenger.</p>
          <p>Angst og følelsesmessige svingninger vil gradvis avta.</p>
          <p>Fokus rettes mot identitetsoppbygging, nettverk og fremtiden (Hvem er du, hvem ønsker du å være, hvem var du før du begynte med cannabis?)</p>
          <p>Her kan det være lurt å undersøke gamle måter å løse problemer på og finne nye strategier.</p>
          <p>Ulike sorgreaksjoner er vanlige i fase 3, f.eks. nedstemthet, tomhet, savn. Plagene kan være naturlige reaksjoner på psykososiale eller nevrobiologiske endringer som resultat av å ha sluttet med cannabis, f.eks:</p>
          <ul>
            <li>sorg ved å gi opp cannabis</li>
            <li>sorg ved tap av sosialt nettverk</li>
            <li>tomhet som resultat av store livsendringer</li>
            <li>utfordringer ved å skulle håndtere livet på nye måter uten cannabis</li>
            <li>nedregulering av kjemiske stoffer i hjernen (f.eks dopamin og anandamid).</li>
          </ul>
          <p>Dopamin påvirker opplevelsen av naturlige stimuli som mat, sex, trening, nærhet og belønning.</p>
          <h2>Gode huskeregler:</h2>
          <p>Vær tålmodig – endringer skjer saktere i fase 3. Ta ett skritt av gangen, du har fått til mye på kort tid og har sluttet med cannabis!</p>
          <p>Lag planer og jobb mot langsiktige mål, legg merke til hvordan nye strategier hjelper deg.</p>
          <p>OBS! Om plagene vedvarer, oppsøk profesjonell hjelp.</p>
          <br />
          <div align="center">
            <img src="assets/images/fase3.png" alt="Fem personer sitter i en sirkel på en bro. Sort-hvitt. Foto." /><br />
            Foto: Stig Hauger
          </div>
        </template>
        <template v-if="phaseNr === 4">
          <p>Du er nå i vedlikeholdsfasen i endringsprosessen din. Følg med på rullerende temaer under hjemfanen. Her kommer ukentlige temaer og øvelser frem til uke 12, og deretter månedlige temaer. Temaene har øvelser og refleksjonsspørsmål som kan gi støtte og motivasjon videre i prosessen din.</p>
          <p>Tips! Bruk gjerne dagboken i øvelsene, da blir det enklere for deg å jobbe aktivt med temaene og du får en god oversikt over egen prosess.</p>
        </template>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  // @ts-nocheck
  import { defineComponent, toRefs, reactive, computed } from 'vue';
  import { IonPage, IonHeader, IonCard, IonCardContent, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, modalController, isPlatform } from '@ionic/vue';

  export default defineComponent({
    name: 'PhaseInfoModal',
    components: { IonHeader, IonCard, IonCardContent, IonListHeader, IonToolbar, IonTitle, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonGrid, IonRow, IonCol, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonButton, IonRadioGroup, IonRadio, IonPage },
    props: {
      phaseNr: {
        type: Number,
        defaultValue: 1,
      },
      currentPhase: {
        type: Number,
        defaultValue: 1,
      },
    },
    setup: (props) => {
      const data = reactive({
        title: computed(() => {
          if (props.phaseNr === 1) return `Fase 1 - Fysisk fokus, dag 1-11`;
          if (props.phaseNr === 2) return `Fase 2 - Psykologisk fokus, dag 12-21`;
          if (props.phaseNr === 3) return `Fase 3 - Sosialt fokus, dag 21-56`;
          if (props.phaseNr === 4) return `Fase 4 - Vedlikehold`;
          return `Fase ${props.phaseNr}`;
        }),
        shortTitle: `Fase ${props.phaseNr}`,
        currentPhase: props.currentPhase,
      });

      async function dismiss() {
        modalController.dismiss();
      }

      return {
        ...toRefs(data),
        dismiss,
        isPlatform,
      };
    },
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
