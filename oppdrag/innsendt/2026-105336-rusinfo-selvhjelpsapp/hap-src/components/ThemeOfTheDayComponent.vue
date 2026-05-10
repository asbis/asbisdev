<template>
    <ion-card :color="color">
        <ion-card-header>
            <ion-card-subtitle>
                {{ item.title }}
            </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <RenderedHTMLComponent :html="item.content" :padding="false" />
        </ion-card-content>
    </ion-card>

    <!-- Denne er kun for debug, for å kunne bla gjennom det ser ut for alle dagene. Enable themes[] i data for å vise. -->
    <!-- <div align="center">
        <ion-button size="small" fill="clear" color="warning" @click="previewAll = !previewAll">Prøvevis alle
            dagens/ukens/månedens
            tema</ion-button>
    </div>
    <template v-if="previewAll">
        <ion-card v-for="theme in themes" :key="theme.from + '-' + theme.to" :color="color">
            <ion-card-header>
                <ion-card-subtitle>
                    {{ theme.title }} <span v-if="theme.from">(Prøvevisning for dag {{ theme.day }})</span>
                </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
                <RenderedHTMLComponent :html="theme.content" :padding="false" />
            </ion-card-content>
        </ion-card>
    </template> -->
</template>
  
<script lang="ts">
import { defineComponent, toRefs, reactive, computed } from 'vue';
import { IonCard, IonButton, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/vue';
import { useStore } from 'vuex';
import RenderedHTMLComponent from '@/components/RenderedHTML.vue';

export default defineComponent({
    name: 'ThemeOfTheDayComponent',
    props: {
        color: {
            type: String,
            default: 'calm4'
        }
    },
    setup(props) {
        const store = useStore();

        const data = reactive({
            // themes: [],
            themes: store.getters['themes/generatedThemes'],
            item: computed(() => store.getters['themes/currentTheme']),
            color: props.color,
            previewAll: false
        });

        return {
            ...toRefs(data)
        }
    },
    components: { IonCard, IonButton, IonCardContent, IonCardHeader, IonCardSubtitle, RenderedHTMLComponent }
});
</script>
  
<style scoped>

</style>
  