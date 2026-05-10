<template>
  <ion-page>
    <ion-header collapse="fade">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :text="backButtonText" v-if="mode === 'default'"></ion-back-button>
          <ion-back-button :text="backButtonText" v-else default-href="/" @click="dismiss()"> </ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <!-- <ion-title size="large">{{title}}</ion-title> -->
          <h1 class="condenseTitle" v-if="title.length > 19">{{ title }}</h1>
          <ion-title size="large" v-else>{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Infotekst som kun skal vises over kategorien for rekreasjonsbruk -->
      <ion-card v-if="categoryId === '12' && infoTextOverRecreationalCategory.attributes.active" color="calm3">
        <ion-card-header v-if="infoTextOverRecreationalCategory.attributes.title !== ''">
          <ion-card-subtitle>
            {{ infoTextOverRecreationalCategory.attributes.title }}
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <RenderedHTMLComponent :html="infoTextOverRecreationalCategory.attributes.body" :padding="false"> </RenderedHTMLComponent>
        </ion-card-content>
      </ion-card>

      <ion-list data-test="infoList">
        <ion-item v-for="item in items" :key="item.id" button @click="open(item)" :detail="item.type === 'category'">
          <ion-icon slot="start" :src="item.attributes.icon" v-if="item.attributes.icon"> </ion-icon>
          <ion-label>{{ item.attributes.title }}</ion-label>
          <!-- <pre>{{item}}</pre> -->
        </ion-item>
      </ion-list>

      <div align="center" v-if="items.length === 0">
        <br />
        <br />
        <br />
        <img src="assets/flaticon.com/animated/neutral.gif" style="width: 50%; max-width: 300px" />
        <br />
        Ops! Her var det tomt
      </div>
      <br /><br /><br /><br /><br />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, computed } from 'vue';
  import { IonPage, IonLabel, IonBackButton, IonItem, IonList, IonListHeader, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, modalController } from '@ionic/vue';

  import categoryModal from '@/views/Category.vue';
  import articleModal from '@/views/Article.vue';

  import { useStore } from 'vuex';
  import router from '@/router';

  import RenderedHTMLComponent from '@/components/RenderedHTML.vue';

  export default defineComponent({
    name: 'CategoryPage',
    props: {
      categoryId: {
        type: String,
      },
      backButtonText: {
        type: String,
        default: 'Tilbake',
      },
      mode: {
        type: String,
        default: 'default',
        validator: (value: any) => {
          return ['default', 'modal'].includes(value);
        },
      },
    },
    setup(props) {
      const store = useStore();

      const data = reactive({
        backButtonText: decodeURIComponent(props.backButtonText),
        // @ts-ignore
        title: computed(() => store.getters['content/categoryById'](parseInt(props.categoryId)).attributes.title),
        categoryId: computed(() => props.categoryId),
        // @ts-ignore
        items: computed(() => store.getters['content/contentByParentId'](parseInt(props.categoryId))), // Alle kategorier på toppnivå
        filteredItems: computed(() => {
          const me: any = data;
          return me.items;
        }),
        mode: props.mode,
        infoTextOverRecreationalCategory: computed(() => store.getters['content/infoTextOverRecreationalCategory']),
      });

      async function dismiss() {
        modalController.dismiss();
      }

      async function open(item: any) {
        if (data.mode === 'default') {
          const url = '/tabs/info/' + encodeURIComponent(data.title) + '/' + item.type + '/' + item.id;
          router.push(url);
        } else {
          const top = await modalController.getTop();
          const modal = await modalController.create({
            component: item.type === 'category' ? categoryModal : articleModal,
            animated: true,
            // @ts-ignore
            presentingElement: top,
            canDismiss: true,
            componentProps: {
              mode: 'modal',
              categoryId: item.id.toString(),
              articleId: item.id.toString(),
            },
          });
          await modal.present();
          await modal.onDidDismiss();
        }
        // :router-link=""
        //         router-direction="forward"
      }

      return {
        ...toRefs(data),
        dismiss,
        open,
      };
    },
    components: { RenderedHTMLComponent, IonLabel, IonBackButton, IonItem, IonList, IonListHeader, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonPage },
  });
</script>

<style scoped></style>
