<template>
  <!-- <div class="doughnut-inner">
        <h5>3</h5>
        <span>dager</span>
    </div> -->

  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>
        {{ triggerType === 'helpful' ? 'Ting som hjelper mot suget' : 'Triggere som fører til bruk' }}
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <Doughnut :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey" v-show="items.length > 0" />
      <p v-show="items.length === 0">Trykk på <ion-icon :icon="pencilOutline" color="primary"></ion-icon> for å legge til data</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive, computed, watch } from 'vue';
  import { Doughnut } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
  import { useStore } from 'vuex';
  import { IonCard, IonCardContent, IonCardHeader, IonIcon, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
  import { pencilOutline } from 'ionicons/icons';

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

  export default defineComponent({
    props: {
      triggerType: {
        type: String,
        default: 'helpful',
        validator: (value: string) => {
          return ['helpful', 'unhelpful'].includes(value);
        },
      },
    },
    setup(props) {
      const store = useStore();
      const data = reactive({
        chartData: {
          labels: [],
          datasets: [
            {
              data: [35, 25],
              backgroundColor: ['green', 'red', 'purple', 'black', 'orange', 'yellow', 'brown', 'crimson'],
              borderColor: ['green', '#E7CED9'],
              // borderRadius: 0,
              borderWidth: 1,
              // offset: 0,
              // spacing: 1,
              cutout: 100,
            },
          ],
        },
        chartOptions: {
          responsive: true,
          plugins: {
            tooltip: {
              enabled: false,
            },
            legend: {
              display: true,
              position: 'bottom',
              fullSize: false,
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
          },
        },
        chartId: 'chart-' + props.triggerType,
        datasetIdKey: 'label',
        chartValue: 0,
        chartUnit: '',
        items: computed(() => store.getters['triggerDiary/entries'](props.triggerType)),
      });

      calculate();

      watch(store.getters['triggerDiary/entries'](props.triggerType), () => {
        calculate();
      });

      function calculate() {
        const items = data.items; // TODO: Reversere array så man får "nyeste" tittel hvis bruker har endret tittel på en custom trigger?

        // Må gruppere per id, og så telle
        const calculated: any = [];

        items.forEach((item: any) => {
          const existing = calculated.find((el: any) => el.id === item.id);

          if (!existing) {
            calculated.push({
              ...item,
              count: 1,
            });
          } else {
            existing.count++;
          }
        });

        const labels: any = [];
        const values: any = [];

        const totalCount = items.length;

        calculated.forEach((item: any) => {
          labels.push(item.title);
          values.push(((item.count / totalCount) * 100).toFixed(0));
        });

        data.chartData.datasets[0].data = values;
        data.chartData.labels = labels;
      }

      return {
        ...toRefs(data),
        pencilOutline,
      };
    },
    name: 'TriggerDiaryPieChart',
    components: { Doughnut, IonCard, IonCardContent, IonCardHeader, IonIcon, IonCardTitle, IonCardSubtitle },
  });
</script>

<style scoped>
  h3 {
    font-weight: 600;
    font-size: 1.5em;
    margin: 0px;
  }

  p {
    margin: 0px;
  }
</style>
