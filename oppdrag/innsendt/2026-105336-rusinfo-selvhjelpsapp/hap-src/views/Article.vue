<template>
    <ion-page>
        <ion-header collapse="fade">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button :text="backButtonText" v-if="mode === 'default'"></ion-back-button>
                    <ion-back-button :text="backButtonText" v-else default-href="/" @click="dismiss()">
                    </ion-back-button>
                </ion-buttons>
                <ion-title>{{ item.attributes.title }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <!-- <ion-title size="large">{{item.attributes.title}}</ion-title> -->
                    <!-- <h1 class="condenseTitle">{{item.attributes.title}}</h1> -->
                    <h1 class="condenseTitle" v-if="item.attributes.title.length > 19">{{ item.attributes.title }}</h1>
                    <ion-title size="large" v-else>{{ item.attributes.title }}</ion-title>
                </ion-toolbar>
            </ion-header>

            <RenderedHTMLComponent :html="item.attributes.body" :padding="true"></RenderedHTMLComponent>
            <!-- <br />
            <hr />
            <br />
            <div v-html="item.attributes.body" class="ion-padding"></div> -->

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue';
import { IonPage, IonLabel, IonBackButton, IonItem, IonList, IonListHeader, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, modalController } from '@ionic/vue';
import RenderedHTMLComponent from '@/components/RenderedHTML.vue'
import { useStore } from 'vuex';

export default defineComponent({
    name: 'ArticlePage',
    props: {
        articleId: {
            type: String
        },
        backButtonText: {
            type: String,
            default: 'Tilbake'
        },
        mode: {
            type: String,
            default: 'default',
            validator: (value: any) => {
                return ['default', 'modal'].includes(value)
            }
        }
    },
    setup(props) {
        const store = useStore();

        const data = reactive({
            backButtonText: decodeURIComponent(props.backButtonText),
            // @ts-ignore
            item: computed(() => store.getters['content/articleById'](parseInt(props.articleId))),
            mode: props.mode
        });

        async function dismiss() {
            modalController.dismiss();
        }

        return {
            ...toRefs(data),
            dismiss
        }
    },
    components: { RenderedHTMLComponent, IonLabel, IonBackButton, IonItem, IonList, IonListHeader, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonPage, }
});
</script>
  
<style scoped>

</style>