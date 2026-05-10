<template>
  <ion-avatar :slot="slot" @click="selectAvatar()" :class="{ avatar: true, androidAvatar: isAndroid }">
    <img :src="avatar" />
  </ion-avatar>
</template>

<script lang="ts">
  import { defineComponent, computed, reactive, toRefs } from 'vue';
  import { IonAvatar, modalController } from '@ionic/vue';
  import { useStore } from 'vuex';
  import SelectIcon from '@/modals/selectIcon.vue';

  export default defineComponent({
    name: 'AvatarOnlyComponent',
    props: {
      slot: {
        type: String,
        default: 'end',
      },
    },
    setup(props) {
      const store = useStore();
      const data = reactive({
        slot: props.slot,
        avatar: computed(() => store.getters['avatar']),
        isAndroid: store.getters['isAndroid'],
      });

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
        selectAvatar,
        ...toRefs(data),
      };
    },

    components: { IonAvatar },
  });
</script>

<style scoped>
  .avatar {
    margin-right: 16px !important;
    z-index: 0;
  }

  .androidAvatar {
    width: 35px;
    height: 35px;
    margin-right: 0px !important;
    margin-left: 16px !important;
  }
</style>
