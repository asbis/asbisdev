<template>
    <ion-card v-if="infoText.attributes.active">
        <ion-card-header>
            <!-- <ion-card-title>
                Overskrift
            </ion-card-title> -->
            <ion-card-subtitle>
                {{ infoText.attributes.title }}
            </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <RenderedHTMLComponent :html="infoText.attributes.body" :padding="false"></RenderedHTMLComponent>
        </ion-card-content>
    </ion-card>
</template>
  
<script lang="ts">
import { defineComponent, toRefs, reactive, computed } from 'vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';

import { useStore } from 'vuex';
import RenderedHTMLComponent from '@/components/RenderedHTML.vue';

export default defineComponent({
    name: 'InfoComponent',
    setup: () => {
        const store = useStore();
        const data = reactive({
            infoText: computed(() => store.getters['content/infoText'])
        })
        return {
            ...toRefs(data),
        }
    },
    components: { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, RenderedHTMLComponent }
});
</script>
  
<style scoped>

</style>
  