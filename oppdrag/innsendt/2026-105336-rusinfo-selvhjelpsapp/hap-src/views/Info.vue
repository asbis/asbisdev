<template>
  <ion-page>
    <ion-header collapse="fade">
      <ion-toolbar>
        <AvatarOnlyComponent slot="start" v-if="isAndroid" />
        <ion-title>Informasjon</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar placeholder="Søk" v-model="filter"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Informasjon</ion-title>
          <AvatarOnlyComponent />
        </ion-toolbar>
      </ion-header>

      <!-- Visning ved søk-->
      <ion-list data-test="infoList" v-if="filter !== '' && filteredArticles.length > 0">
        <ion-list-header>
          <ion-label>Artikler</ion-label>
        </ion-list-header>
        <ion-item v-for="item in filteredArticles" :key="item.id" button :router-link="'/tabs/info/Informasjon/' + item.type + '/' + item.id" router-direction="forward" :detail="item.type === 'category'">
          <ion-icon slot="start" :src="item.attributes.icon" v-if="item.attributes.icon"> </ion-icon>
          <ion-label>{{ item.attributes.title }}</ion-label>
        </ion-item>
      </ion-list>
      <ion-card v-if="filter !== '' && filteredArticles.length === 0">
        <ion-card-content>
          <p>Ingen treff. Forsøk å søke etter noe annet, eller bla deg rundt på egenhånd.</p>
          <div align="center">
            <ion-button shape="round" color="primary" @click="filter = ''">Nullstill søk</ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Visning når brukeren ikke har søkt etter noe -->
      <ion-list data-test="infoList" v-if="filter === ''">
        <ion-list-header>
          <ion-label>Kategorier</ion-label>
        </ion-list-header>
        <ion-item v-for="item in items.filter((el) => el.id !== 12)" :key="item.id" button :router-link="'/tabs/info/Informasjon/' + item.type + '/' + item.id" router-direction="forward" :detail="item.type === 'category'">
          <ion-icon slot="start" :src="item.attributes.icon" v-if="item.attributes.icon"> </ion-icon>
          <ion-label>{{ item.attributes.title }}</ion-label>
        </ion-item>
      </ion-list>
      <br v-if="filter === ''" />
      <ion-list data-test="infoList3" v-if="filter === ''">
        <ion-list-header>
          <ion-label>Andre moduler</ion-label>
        </ion-list-header>
        <ion-item button @click="openCategoryModal()">
          <ion-icon slot="start" src="assets/flaticon.com/collection-4/svg/142-teenager.svg"> </ion-icon>
          <ion-label>Cannabis og rekreasjonsbruk</ion-label>
        </ion-item>
      </ion-list>
      <br v-if="filter === ''" />
      <ion-list data-test="infoList2" v-if="filter === ''">
        <ion-list-header>
          <ion-label>Spørsmål og svar</ion-label>
        </ion-list-header>
        <ion-item v-for="item in items2" :key="item.id" button @click="linkOpen(item)">
          <ion-icon slot="start" :src="item.icon" v-if="item.icon"> </ion-icon>
          <ion-label>{{ item.title }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, computed } from 'vue';
  import { IonPage, IonLabel, IonItem, IonSearchbar, IonCard, IonCardContent, IonList, IonListHeader, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, modalController } from '@ionic/vue';

  import { useStore } from 'vuex';
  import { Browser } from '@capacitor/browser';
  import AvatarOnlyComponent from '@/components/avatarOnly.vue';
  import categoryModal from '@/views/Category.vue';

  export default defineComponent({
    name: 'Tab5Page',
    setup() {
      const store = useStore();

      const data = reactive({
        isAndroid: store.getters['isAndroid'],
        items: computed(() => store.getters['content/categoriesByParentId'](null)), // Alle kategorier på toppnivå
        articles: computed(() => store.getters['content/articles']), // Alle kategorier på toppnivå
        filter: '',
        filteredArticles: computed(() => {
          const me: any = data;
          return me.articles.filter((el: any) => {
            if (el.attributes.title.toLowerCase().includes(me.filter.toLowerCase())) return true;
            // if (el.attributes.body !== null && el.attributes.body.toLowerCase().includes(me.filter.toLowerCase())) return true; // Skulle kun være søk på tittel
          });
        }),
        items2: [
          {
            id: 101,
            title: 'Ring RUSinfo',
            icon: 'assets/flaticon.com/collection-3/svg/003-phone.svg',
            body: ``,
            parent: null,
            url: '+4791508588',
            linkType: 'tel',
          },
          {
            id: 102,
            title: 'Send et spørsmål til RUSinfo',
            icon: 'assets/flaticon.com/collection-3/svg/010-send.svg',
            body: ``,
            parent: null,
            url: 'https://rusinfo.no/se-tidligere-stilte-sporsmal/',
            linkType: 'browser',
          },
        ],
      });

      async function linkOpen(item: any) {
        if (item.linkType === 'tel') {
          window.open(`tel:${item.url}`, '_system');
        }
        if (item.linkType === 'browser') {
          await Browser.open({
            url: item.url,
            presentationStyle: 'popover',
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

      return {
        ...toRefs(data),
        linkOpen,
        openCategoryModal,
      };
    },
    components: { AvatarOnlyComponent, IonLabel, IonItem, IonSearchbar, IonCard, IonCardContent, IonList, IonListHeader, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonPage },
  });
</script>

<style scoped></style>
