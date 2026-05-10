<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="prev()" v-if="currentSlide > 0">Forrige</ion-button>
        </ion-buttons>
        <ion-title>Velkommen til HAP</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="next()" v-if="showNext">Neste</ion-button>
          <ion-button @click="start()" v-if="currentSlide === 4">Aksepter</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false">
      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Onboarding</ion-title>
        </ion-toolbar>
      </ion-header> -->

      <swiper :modules="modules" :pagination="false" :scrollbar="true" @swiper="setSwiper" @slideChange="slideChanged" data-test="swiper">
        <swiper-slide data-test="swiper-slide-1">
          <div class="swiperSlideContent">
            <div align="center">
              <h1>Velkommen til HAP</h1>
              <p>Du er helt anonym når du bruker denne appen.</p>
              <p>Dette er en app for deg som ønsker å slutte med, redusere eller ta en pause fra cannabis.</p>
              <br />
              <ion-button shape="round" @click="next()" data-test="startProgramKnapp">Start hasjavvenningsprogrammet </ion-button>
              <br />
              <br />
              <p>Dersom du bruker cannabis av og til, eller har spørsmål om cannabisbruk finner du nyttig informasjon her:</p>
              <ion-button shape="round" data-test="lesMerKnapp" @click="openCategoryModal()">Cannabis og rekreasjonsbruk </ion-button>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="justify-top" data-test="swiper-slide-2">
          <div class="swiperSlideContent">
            <h2>Litt info</h2>
            <p>Appen HAP passer for deg som ønsker å slutte med, trappe ned eller ha en pause i cannabisbruk. Appens program strekker seg over 12 uker og du kan bruke den som et supplement til hasjavvenningsprogram med terapeut/annen behandling, eller du kan bruke den på egenhånd.</p>
            <p>Appen er utviklet av studenter fra Westerdahls i samarbeid med Rusinfo og Uteseksjonen i Oslo. Innholdet i appen er basert på oppdatert forskning om cannabis / behandling og erfaringsbasert kunnskap fra brukere og fagpersoner.</p>

            <p>Vi ønsker å være nøytrale i vår formidling av informasjon om cannabis. Send oss gjerne en melding dersom du har tilbakemeldinger du tenker kan hjelpe oss med å forbedre innholdet i appen. Du kan gi oss tilbakemelding ved å trykke "Gi anonym tilbakemelding" under generelt – om appen – gi anonym tilbakemelding.</p>
            <p>RUSinfo sin nettside: <a @click.prevent="openUrl('https://www.rusinfo.no')">www.rusinfo.no</a></p>
            <p>Uteseksjonen i Oslo sin nettside: <a @click.prevent="openUrl('https://www.uteseksjonen.no')">www.uteseksjonen.no</a></p>
          </div>
        </swiper-slide>
        <swiper-slide data-test="swiper-slide-3" class="justify-top">
          <div class="swiperSlideContent">
            <h2>Velg sluttdato</h2>
            <p>Sluttdato er datoen du sluttet å bruke cannabis, eller datoen du planlegger å slutte.</p>
            <p>Datoen danner grunnlaget for å vise hvor lenge du har klart deg uten, hvor mye penger du har spart, og hvilke belønninger du har oppnådd i appen.</p>
            <br />
            <ion-datetime locale="nb-NO" v-model="programStartedAt" :first-day-of-week="1" presentation="date-time" cancel-text="Avbryt" clear-text="Nullstill" done-text="OK">
              <span slot="time-label">Klokkeslett</span>
            </ion-datetime>
          </div>
        </swiper-slide>
        <swiper-slide class="justify-top" data-test="swiper-slide-4">
          <div class="swiperSlideContent">
            <h2>Vil du bidra til å forbedre vårt hjelpetilbud?</h2>
            <p>Ved å gi noen enkle opplysninger om deg selv bidrar du til at vi kan forbedre vårt hjelpetilbud. Du vil fortsatt være anonym.</p>
            <p>Du velger selv hvilke spørsmål du ønsker å svare på.</p>
            <ion-item>
              <ion-label>Jeg ønsker å bidra</ion-label>
              <ion-toggle v-model="form.contribute" data-test="toggleBidrag"></ion-toggle>
            </ion-item>
            <ion-list v-if="form.contribute">
              <ion-item>
                <ion-label>Alder</ion-label>
                <ion-select :interface-options="{ backdropDismiss: false }" cancel-text="Avbryt" v-model="form.age" placeholder="Velg alder" data-test="selectAlder">
                  <ion-select-option v-for="option in formOptions.age" :key="option">{{ option }} </ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-label>Kjønn</ion-label>
                <ion-select :interface-options="{ backdropDismiss: false }" cancel-text="Avbryt" v-model="form.gender" placeholder="Velg kjønn" data-test="selectKjonn">
                  <ion-select-option v-for="option in formOptions.gender" :key="option">{{ option }}</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-label>Fylke</ion-label>
                <ion-select :interface-options="{ backdropDismiss: false }" cancel-text="Avbryt" v-model="form.county" placeholder="Velg fylke" data-test="selectFylke">
                  <ion-select-option v-for="option in formOptions.county" :key="option">{{ option }}</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-label>Brukertype</ion-label>
                <ion-select :interface-options="{ backdropDismiss: false }" cancel-text="Avbryt" v-model="form.usertype" placeholder="Velg brukertype" data-test="selectBrukertype">
                  <ion-select-option v-for="option in formOptions.usertype" :key="option">{{ option }} </ion-select-option>
                </ion-select>
              </ion-item>
            </ion-list>

            <div align="center">
              <br />
              <br />
              <!-- Knapp disablet hvis man ønsker å bidra, men ikke har besvart noen av spørsmålene -->
              <ion-button :disabled="!contributeFormValid" data-test="knappStartAppen" shape="round" size="large" @click="next()"> Start appen nå </ion-button>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="justify-top" data-test="swiper-slide-5">
          <div class="swiperSlideContent">
            <h2>Personvernerklæring</h2>
            <p>HAP-appen er levert av Velferdsetaten i Oslo kommune, organisasjonsnummer 997 506 413.</p>

            <p>Hovedregelen for HAP-appen er at dine opplysninger krypteres og kun oppbevares lokalt. Siden HAP-appen aldri sender dine personopplysninger ut fra din enhet får ingen, heller ikke Velferdsetaten/RUSInfo, tilgang til dine personopplysninger.</p>

            <p>Dersom du benytter funksjonen for nullstilling, eller velger å slette appen, er dine data slettet - og det vil ikke være mulig å gjenopprette dem.</p>

            <h3>Følgende unntak gjelder:</h3>

            <h4>Bidra til å forbedre vårt hjelpetilbud</h4>
            <p>Dersom du aktivt har sagt at du ønsker å bidra til å forbedre vårt hjelpetilbud, og du har oppgitt opplysninger om deg selv, så vil disse opplysningene lagres på vår server. Det er kun opplysninger du selv velger å oppgi som blir lagret.</p>

            <p>Disse opplysningene samles inn for å la oss se statistikk over hvem det er som bruker appen: Alder, kjønn, fylke og type bruker. Opplysningene blir lagret anonymt innenfor EØS-området, og vil oppbevares på ubestemt tid.</p>

            <p>Siden dataene oppbevares anonymt er det ikke mulig å be om sletting, innsyn, retting, begrensning eller å trekke tilbake samtykket (siden det ikke er mulig å knytte dataene til deg eller din enhet).</p>

            <h4>Benyttelse av chat og andre eksterne tjenester</h4>
            <p>Appen kan inneholde lenker til eksterne nettsider. Dette kan blant annet gjelde lenke til chat, til spørreskjema og til nyttig informasjon andre steder på internett.</p>

            <p>Disse eksterne tjenestene er ikke en del av HAP-appen, og vil ha sine egne retningslinjer for innsamling, oppbevaring og behandling av personopplysninger. Dersom du benytter lenker til slike eksterne tjenester bør du sette deg inn i personvernerklæringen til den enkelte tjeneste.</p>

            <p>HAP-appen har kun ordinære lenker til slike eksterne tjenester, og vil ikke dele dine personopplysninger med dem.</p>

            <h3>I tillegg gjør vi oppmerksom på følgende:</h3>

            <h4>Ditt operativsystem og dets leverandør</h4>
            <p>Du benytter appen på din smarttelefon, og den blir installert fra en butikk (for eksempel Apple App Store eller Google Play). Leverandøren av operativsystemet, og leverandøren av denne butikken, vil vite at du har installert appen, og kan føre statistikk på installasjon og hvor ofte du bruker appen.</p>

            <p>Dette er informasjon de har tilgang til i kraft av å være tilbyderen av operativsystemet / butikken du benytter. HAP-appen i seg selv deler ingen av dine opplysninger.</p>

            <p>HAP vil gjennom disse leverandørene kunne se statistikk over antall installasjoner, bruk og annen informasjon.</p>

            <h4>Sikkerhetskopier</h4>
            <p>Dersom du tar sikkerhetskopier av telefonen din og av appene du har installert, vil dine lokalt lagrede data kunne være en del av slik sikkerhetskopi.</p>

            <p>All data appen lagrer lokalt er kryptert, men ved en gjenopprettelse av sikkerhetskopien vil innholdet kunne leses ved å åpne HAP-appen.</p>
            <br />
            <br />
            <br />
            <div align="center">
              <ion-button data-test="knappAksepter" @click="start()" shape="round" size="large"> Aksepter </ion-button>
            </div>
            <br />
            <br />
          </div>
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, computed } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonDatetime, IonButtons, IonItem, IonToggle, IonLabel, IonList, IonSelect, IonSelectOption, useIonRouter, modalController } from '@ionic/vue';

  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Scrollbar } from 'swiper';
  import { useStore } from 'vuex';
  import dayjs from 'dayjs';

  import categoryModal from '@/views/Category.vue';

  import 'swiper/css';
  import 'swiper/css/autoplay';
  import 'swiper/css/keyboard';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';
  import 'swiper/css/zoom';
  import '@ionic/vue/css/ionic-swiper.css';

  import { useApiService } from '@/composables/apiService';

  import { Browser } from '@capacitor/browser';

  const api = useApiService();

  export default defineComponent({
    name: 'onboarding-onboarding',
    setup: () => {
      const store = useStore();
      const router = useIonRouter();
      const swiper: null | any = ref(null);

      const data = reactive({
        programStartedAt: dayjs().format(), // Default dagens dato
        form: {
          contribute: false,
          age: undefined,
          gender: undefined,
          county: undefined,
          usertype: undefined,
        },
        formOptions: {
          age: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
          gender: ['Mann', 'Kvinne', 'Annet'],
          county: computed(() => store.getters['content/counties']),
          usertype: ['Jeg bruker cannabis', 'Jeg er fagperson', 'Jeg er pårørende'],
        },
        currentSlide: 0,
        contributeFormValid: computed(() => {
          // Enten må man ha takket nei til å bidra, eller så må minst ett av feltene være utfylt
          const form: any = data.form;
          return !(form.contribute && !form.age && !form.gender && !form.county && !form.usertype);
        }),
        showNext: computed(() => {
          // Hvis man er på "Ønsker du å bidra"
          const currentSlide: any = data.currentSlide;
          const contributeFormValid: any = data.contributeFormValid;
          if (currentSlide === 3) {
            if (contributeFormValid) {
              return true;
            } else {
              return false;
            }
          }
          // Ellers vises Neste-knappen ikke på første eller siste side
          return currentSlide > 0 && currentSlide < 4;
        }),
      });

      async function next() {
        if (swiper.value) {
          swiper.value.slideNext();
        }
      }

      async function prev() {
        if (swiper.value) {
          swiper.value.slidePrev();
        }
      }

      async function setSwiper(swiperObject: any) {
        swiper.value = swiperObject;
        console.log(swiperObject);
      }

      async function slideChanged() {
        if (swiper.value) {
          data.currentSlide = swiper.value.activeIndex;
        }
      }

      async function start() {
        store.dispatch('setProgramStartedAt', {
          programStartedAt: dayjs(data.programStartedAt).toISOString(),
        });
        router.replace('/tabs');
        if (data.form.contribute === true) {
          await api.post('anonymous-userdatas', {
            data: {
              ...data.form,
              contribute: undefined, // Fjern contribute, siden det ikke skal lagres backend
            },
          });
        }
      }

      async function openCategoryModal() {
        const modal = await modalController.create({
          component: categoryModal,
          animated: true,
          // @ts-ignore
          presentingElement: document.getElementById('main'),
          canDismiss: true,
          props: true,
          componentProps: {
            mode: 'modal',
            categoryId: '12', // ID'en til "Cannabis og rekreasjonsbruk"-menyen
          },
        });
        await modal.present();
        await modal.onDidDismiss();
      }

      async function openUrl(url: string) {
        await Browser.open({ url: url, presentationStyle: 'popover' });
      }

      return {
        ...toRefs(data),
        setSwiper,
        start,
        prev,
        next,
        slideChanged,
        openCategoryModal,
        modules: [Pagination, Scrollbar],
        openUrl,
      };
    },
    components: {
      Swiper,
      SwiperSlide,
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonButton,
      IonDatetime,
      IonButtons,
      IonItem,
      IonToggle,
      IonLabel,
      IonList,
      IonSelect,
      IonSelectOption,
    },
  });
</script>

<style scoped>
  .swiper {
    height: 100%;
    width: 100%;
  }

  .swiper-slide {
    padding: 16px;
    display: flex;
    flex-direction: column;
    text-align: left;
    overflow: auto;
  }

  .swiperSlideContent {
    text-align: left;
    width: 100%;
  }

  .justify-top {
    justify-content: flex-start;
  }
</style>
