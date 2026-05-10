<template>
  <ion-page>
    <ion-header collapse="fade">
      <ion-toolbar>
        <AvatarOnlyComponent slot="start" v-if="isAndroid" />
        <ion-title>Dagbok</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openEditModal('new')" data-test="dagbokKnappSkriv">
            <ion-icon :icon="addOutline" slot="start"></ion-icon>
            Skriv
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar v-show="search.enabled" data-test="dagbokSearchbar">
        <ion-searchbar animated :debounce="500" placeholder="Søk" enterkeyhint="search" v-model="search.query">
        </ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Dagbok</ion-title>
          <AvatarOnlyComponent />
        </ion-toolbar>
      </ion-header>

      <ion-card color="calm2" v-if="items.length === 0">
        <ion-card-content class="ion-text-center">
          <br />
          <p>
            Kom i gang med din egen dagbok 📔
          </p>
          <br />
          <ion-button shape="round" @click="openEditModal('new')" data-test="dagbokKnappSkrivDittForsteNotat">Skriv ditt
            første notat</ion-button>
        </ion-card-content>
      </ion-card>

      <ion-card color="calm2" v-if="items.length > 0 && filteredItems.length === 0"
        data-test="dagbokCardFinnerIngenTreff">
        <ion-card-content class="ion-text-center">
          <p>
            Finner ingen treff på søket "{{ search.query }}"
          </p>
          <br />
          <ion-button shape="round" @click="search.query = ''" data-test="dagbokKnappNullstillSok">Nullstill søk
          </ion-button>
        </ion-card-content>
      </ion-card>
      <!-- @ts-ignore -->
      <ion-card v-for="(item, index) in filteredItems" :key="item.date" color="calm1" @click="openEditModal(item.id)"
        :data-test="'dagbokCardNotat-' + index">
        <ion-card-header>
          <ion-card-subtitle>
            {{ dayjs(item.date).format('DD.MM.YYYY') }}
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p class="limitedText">{{ item.message }}</p>

          <ion-badge v-for="tag in item.tags" :key="tag" color="calm3">
            {{ tag }}
          </ion-badge>

        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, reactive } from 'vue';
import { modalController, IonSearchbar, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonBadge, IonButton, IonButtons, IonIcon } from '@ionic/vue';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import { addOutline, searchOutline } from 'ionicons/icons';
import DiaryEditModal from '../modals/diaryEdit.vue';
import _ from 'lodash';
import FABComponent from '@/components/FAB.vue';
import AvatarOnlyComponent from '@/components/avatarOnly.vue';

export default defineComponent({
  name: 'Tab2Page',
  components: { AvatarOnlyComponent, IonSearchbar, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonBadge, IonButton, IonButtons, IonIcon, FABComponent },
  setup: () => {
    const store = useStore();
    const data = reactive({
      isAndroid: store.getters['isAndroid'],
      filteredItems: computed(() => {
        const items: any = data.items;
        const search: any = data.search;
        if (search.query === '') {
          return items;
        } else {
          return items.filter((el: any) => JSON.stringify(el).toLowerCase().includes(search.query.toLowerCase()));
        }
      }),
      items: computed(() => _.orderBy(store.getters['diary/entries'], ['date'], ['desc'])),
      tags: computed(() => store.getters['diary/tags']),
      search: {
        enabled: true,
        query: ''
      }
    })

    async function openEditModal(id = 'new') {
      const modal = await modalController.create({
        component: DiaryEditModal,
        animated: true,
        // @ts-ignore
        presentingElement: document.getElementById('main'),
        canDismiss: true,
        componentProps: {
          id
        }
      });
      await modal.present();
    }

    return {
      ...toRefs(data),
      dayjs,
      addOutline,
      searchOutline,
      openEditModal
    }
  },
});
</script>

<style scoped>
.limitedText {
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical
}

ion-badge {
  margin-right: 5px;
  margin-top: 10px;
}
</style>