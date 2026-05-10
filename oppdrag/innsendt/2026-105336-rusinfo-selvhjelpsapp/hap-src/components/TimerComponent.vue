<template>
    <ion-card>
        <ion-card-header>
            <!-- <ion-card-title>
                Tidtaker
            </ion-card-title> -->
            <ion-card-subtitle>
                {{ hasStarted ? 'Tid siden du startet på programmet' : 'Du har planlagt å slutte om' }}
            </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <chart-doughnut-component type="days"></chart-doughnut-component>
                    </ion-col>
                    <ion-col>
                        <chart-doughnut-component type="hours">
                        </chart-doughnut-component>
                    </ion-col>
                    <ion-col>
                        <chart-doughnut-component type="minutes">
                        </chart-doughnut-component>
                    </ion-col>
                </ion-row>
            </ion-grid>

        </ion-card-content>
    </ion-card>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonGrid, IonRow, IonCol } from '@ionic/vue';
import ChartDoughnutComponent from './ChartDoughnutComponent.vue';

export default defineComponent({
    props: {
        hasStarted: {
            default: true,
            type: Boolean
        }
    },
    setup() {
        return {
        }
    },
    name: 'TimerComponent',
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonGrid, IonRow, IonCol, ChartDoughnutComponent }
});
</script>
  
<style scoped>

</style>
  