<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <AvatarOnlyComponent slot="start" v-if="isAndroid" />
                <ion-title>Prestasjoner</ion-title>
                <!-- <ion-buttons slot="end">
            <ion-button @click="registerTrigger()" data-click="registerTriggerKnapp">
              <ion-icon slot="start" :icon="addOutline"></ion-icon>
              Registrer
            </ion-button>
          </ion-buttons> -->
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" data-test="prestasjonerContent">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Prestasjoner</ion-title>
                    <AvatarOnlyComponent />
                </ion-toolbar>
            </ion-header>
            <ion-list data-test="nestePrestasjonTitle">
                <ion-list-header>
                    <ion-label>Neste prestasjon</ion-label>
                </ion-list-header>
            </ion-list>
            <ion-card v-for="item in upcomingAwards.slice(0, 1)" :key="item.id" router-link="awards/upcoming"
                router-direction="forward">
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
            <br />
            <ion-list data-test="fullfortePrestasjonerTitle">
                <ion-list-header>
                    <ion-label v-if="programHasStarted">Fullførte prestasjoner</ion-label>
                    <ion-label v-else>Tidligere fullførte prestasjoner</ion-label>
                </ion-list-header>
            </ion-list>

            <ion-card v-for="item in achievedAwards" :key="item.id">
                <ion-grid>
                    <ion-row class="ion-align-items-center">
                        <ion-col size="3" class="ion-padding">
                            <img :src="getIconSrc(item.type)">
                        </ion-col>
                        <ion-col size="9" class="ion-padding-bottom">
                            <h2>{{ item.title }}</h2>
                            <p>
                                {{ item.body }}
                            </p>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-card>

            <ion-card v-if="achievedAwards.length < 1">
                <ion-grid>
                    <ion-row class="ion-align-items-center">
                        <ion-col size="12" class="ion-padding-bottom">
                            <p>
                                Så snart du starter på hasjavvenningsprogrammet vil dine oppnådde prestasjoner vises
                                her.
                            </p>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-card>

            <br />
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue';
import { IonPage, IonCard, IonGrid, IonRow, IonCol, IonCardHeader, IonBadge, IonCardTitle, IonCardContent, IonLabel, IonIcon, IonList, IonItem, IonListHeader, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton } from '@ionic/vue';
import { useStore } from 'vuex';
import _ from 'lodash';
import dayjs from 'dayjs';
import AvatarOnlyComponent from '@/components/avatarOnly.vue';

export default defineComponent({
    name: 'Tab4Page',
    setup() {
        const store = useStore();
        const data = reactive({
            isAndroid: store.getters['isAndroid'],
            awards: computed(() => store.getters['awards/availableAwards']),
            upcomingAwards: computed(() => store.getters['awards/upcomingAwards']),
            achievedAwards: computed(() => _.cloneDeep(store.getters['awards/achievedAwards']).reverse()),
            programStartedAt: computed(() => store.getters['programStartedAt']),
            programHasStarted: computed(() => store.getters['programHasStarted'])
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
    components: { AvatarOnlyComponent, IonCard, IonGrid, IonRow, IonCol, IonCardHeader, IonBadge, IonCardTitle, IonCardContent, IonLabel, IonIcon, IonList, IonItem, IonListHeader, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonPage, }
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