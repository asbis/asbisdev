<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Kommende prestasjoner</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" data-test="prestasjonerContent">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <h1 class="condenseTitle">Kommende prestasjoner</h1>
                </ion-toolbar>
            </ion-header>

            <ion-card v-for="item in upcomingAwards" :key="item.id">
                <ion-grid>
                    <ion-row class="ion-align-items-center">
                        <ion-col size="3" class="ion-padding">
                            <img :src="getIconSrc(item.type)">
                        </ion-col>
                        <ion-col size="9" class="ion-padding-bottom">
                            <ion-badge class="timeLeftBadge" color="calm2">{{
                                    dayjs(item.estimatedCompletedAt).fromNow()
                            }}</ion-badge>
                            <h2 style="margin-top: 5px">{{ item.title }}</h2>
                            <p>
                                {{ item.body }}
                            </p>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-card>

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue';
import { IonPage, IonCard, IonGrid, IonRow, IonCol, IonCardHeader, IonBackButton, IonBadge, IonCardTitle, IonCardContent, IonLabel, IonIcon, IonList, IonItem, IonListHeader, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton } from '@ionic/vue';
import { useStore } from 'vuex';
import dayjs from 'dayjs';

export default defineComponent({
    name: 'UpcomingAwards',
    setup() {
        const store = useStore();
        const data = reactive({
            upcomingAwards: computed(() => store.getters['awards/upcomingAwards']),
        });

        function getIconSrc(type: string) {
            if (type === 'small')
                return 'assets/flaticon.com/collection-3/svg/067-medal.svg';
            if (type === 'large')
                return 'assets/flaticon.com/collection-3/svg/069-trophy-3.svg';
            if (type === 'economic')
                return 'assets/flaticon.com/collection-3/svg/076-banknote.svg';
            if (type === 'health')
                return 'assets/flaticon.com/collection-3/svg/085-hospital.svg';
        }
        return {
            ...toRefs(data),
            getIconSrc,
            dayjs
        }
    },
    components: { IonCard, IonGrid, IonRow, IonCol, IonCardHeader, IonBackButton, IonBadge, IonCardTitle, IonCardContent, IonLabel, IonIcon, IonList, IonItem, IonListHeader, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonPage, }
});
</script>
  
<style scoped>
.timeLeftBadge::first-letter {
    text-transform: capitalize;
}

.timeLeftBadge {
    font-weight: normal;
    margin-top: 10px;
}
</style>