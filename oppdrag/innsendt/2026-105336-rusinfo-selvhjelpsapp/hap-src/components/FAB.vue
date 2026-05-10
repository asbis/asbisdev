<template>
  <!-- fab placed to the top and end and on the top edge of the content overlapping header -->
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button @click="selectAvatar()" data-test="FABRegistrerTrigger">
      <ion-avatar class="avatarIcon">
        <img :src="avatar" />
      </ion-avatar>
    </ion-fab-button>
    <ion-fab-button @click="startChat()" data-test="FABRegistrerTrigger" v-if="showChat">
      <ion-icon :icon="chatbubblesOutline"></ion-icon>
    </ion-fab-button>
    <ion-fab-button @click="showCard()" data-test="FABRegistrerTrigger">
      <ion-icon :icon="pencilOutline"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
  import { defineComponent, computed, reactive, toRefs } from 'vue';
  import { IonFab, IonFabButton, IonAvatar, IonIcon, modalController, alertController } from '@ionic/vue';
  import { pencilOutline, chatbubblesOutline } from 'ionicons/icons';
  import TriggerDiarySheet from '@/modals/triggerDiary-sheet.vue';
  import { Browser } from '@capacitor/browser';
  import { useStore } from 'vuex';
  import SelectIcon from '@/modals/selectIcon.vue';

  export default defineComponent({
    name: 'FABComponent',
    setup() {
      const store = useStore();
      const data = reactive({
        avatar: computed(() => store.getters['avatar']),
        showChat: computed(() => store.getters['content/chatActive']),
      });
      async function showCard() {
        const modal = await modalController.create({
          component: TriggerDiarySheet,
          animated: true,
          initialBreakpoint: 0.5,
          breakpoints: [0, 0.5, 0.9],
          canDismiss: true,
        });
        await modal.present();
      }

      async function startChat() {
        let alertResp = false;
        const alert = await alertController.create({
          header: 'Chat',
          backdropDismiss: false,
          message: `Du blir nå tatt videre til chatten "eDialog 24". Denne chatten drives av RUSinfo, og er ikke en del av HAP-appen. Vil du fortsette?`,
          buttons: [
            {
              text: 'Avbryt',
              role: 'cancel',
              handler: () => {
                alertResp = false;
              },
            },
            {
              text: 'Fortsett',
              role: 'confirm',
              handler: () => {
                alertResp = true;
              },
            },
          ],
        });

        await alert.present();
        await alert.onDidDismiss();

        if (alertResp) {
          const chat = store.getters['content/chat'];
          const url = chat.attributes.url;
          if (chat.attributes.target === 'System') {
            window.open(url, '_system');
          } else {
            await Browser.open({
              url,
              presentationStyle: 'popover',
            });
          }
        }
      }

      async function selectAvatar() {
        const modal = await modalController.create({
          component: SelectIcon,
          animated: true,
          // @ts-ignore
          presentingElement: document.getElementById('main'),
          canDismiss: true,
          componentProps: {
            iconSet: 'avatars',
            title: 'Velg din avatar',
            loadMoreText: 'Laster flere avatarer...',
            backgroundColor: 'var(--ion-color-calm2)',
            colSize: '4',
            iconFontSize: '60px',
          },
        });
        await modal.present();
        // Oppdater listen lokalt med eventuell ny trigger som brukeren har lagt til
        const modalData = await modal.onDidDismiss();
        if (modalData.data) {
          store.dispatch('setAvatar', modalData.data);
        }
      }

      return {
        pencilOutline,
        chatbubblesOutline,
        showCard,
        startChat,
        selectAvatar,
        ...toRefs(data),
      };
    },

    components: { IonFab, IonFabButton, IonAvatar, IonIcon },
  });
</script>

<style scoped>
  ion-fab-button {
    margin-bottom: 5px;
  }

  .avatarIcon {
    width: 100%;
    height: 100%;
  }
</style>
