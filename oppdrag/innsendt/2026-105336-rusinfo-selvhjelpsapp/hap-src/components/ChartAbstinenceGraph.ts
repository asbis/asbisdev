// @ts-nocheck

import { defineComponent, h, PropType } from 'vue';

import { Scatter } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, Filler, Plugin, BarElement, LineController, BarController } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, BarElement, LineController, BarController);

export default defineComponent({
  name: 'ChartAbstinenceGraph',
  components: {
    Scatter,
  },
  props: {
    secondsPassed: {
      type: Number,
      default: 0,
    },
    chartId: {
      type: String,
      default: 'line-chart',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    // styles: {
    //   type: Object as PropType<Partial<CSSStyleDeclaration>>,
    //   default: () => {
    //   }
    // },
    plugins: {
      type: Array as PropType<Plugin<'line'>[]>,
      default: () => [Filler],
    },
  },
  setup(props) {
    const chartData = {
      labels: ['Uke 1', 'Uke 2', 'Uke 3', 'Uke 4', 'Uke 5', 'Uke 6', 'Uke 7', 'Uke 8'],
      datasets: [
        {
          /**
           * Det er to datapunkter for hver uke. Det betyr at X=12 er 6 uker (siden grafen går til seks uker).
           * Vi må derfor bare finne ut hvor mange prosent av seks uker brukeren er kommet i programmet, og sette verdien deretter.
           */
          label: 'Du er her',
          backgroundColor: 'black',
          borderColor: 'black',
          type: 'line',
          data: [
            {
              x: (props.secondsPassed / (3600 * 24 * 7 * 6)) * 12,
              y: 100,
            },
            {
              x: (props.secondsPassed / (3600 * 24 * 7 * 6)) * 12,
              y: 0,
            },
          ],
          fill: {
            target: 'origin',
            above: 'black',
            below: 'black',
          },
        },
        {
          label: 'Fase 1',
          backgroundColor: 'silver',
          borderColor: 'silver',
          type: 'line',
          pointStyle: 'line',
          data: [
            {
              x: (11 / 7) * 2,
              y: 100,
            },
            {
              x: (11 / 7) * 2,
              y: 0,
            },
          ],
        },
        {
          label: 'Fase 2',
          backgroundColor: 'silver',
          borderColor: 'silver',
          type: 'line',
          pointStyle: 'line',
          data: [
            {
              x: (21 / 7) * 2,
              y: 100,
            },
            {
              x: (21 / 7) * 2,
              y: 0,
            },
          ],
        },
        {
          label: 'THC-metabolitter',
          backgroundColor: '#A9D797',
          borderColor: '#A9D797',
          type: 'line',
          data: [
            {
              x: 0,
              y: 100,
            },
            {
              x: 1,
              y: 95,
            },
            {
              x: 2,
              y: 90,
            },
            {
              x: 3,
              y: 75,
            },
            {
              x: 4,
              y: 50,
            },
            {
              x: 5,
              y: 45,
            },
            {
              x: 6,
              y: 40,
            },
            {
              x: 7,
              y: 25,
            },
            {
              x: 8,
              y: 20,
            },
            {
              x: 9,
              y: 15,
            },
            {
              x: 10,
              y: 10,
            },
            {
              x: 11,
              y: 0,
            },
            {
              x: 12,
              y: 0,
            },
          ],
          fill: {
            target: '+1',
            above: '#A9D797',
            below: '#B2DAE8',
          },
        },
        {
          type: 'line',
          label: 'Humørsvingninger',
          backgroundColor: '#B2DAE8',
          borderColor: '#B2DAE8',
          data: [
            {
              x: 0,
              y: 15,
            },
            {
              x: 1,
              y: 25,
            },
            {
              x: 2,
              y: 30,
            },
            {
              x: 3,
              y: 50,
            },
            {
              x: 4,
              y: 80,
            },
            {
              x: 5,
              y: 75,
            },
            {
              x: 6,
              y: 72,
            },
            {
              x: 7,
              y: 50,
            },
            {
              x: 8,
              y: 25,
            },
            {
              x: 9,
              y: 15,
            },
            {
              x: 10,
              y: 13,
            },
            {
              x: 11,
              y: 6,
            },
            {
              x: 12,
              y: 0,
            },
          ],
          fill: {
            target: 'origin',
            above: '#B8DFCF',
            below: '#B8DFCF',
          },
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        onComplete: (context) => {
          context.delayed = true;
        },
        delay: (context) => {
          // "Du er her" kommer sist
          if (context.datasetIndex === 0) return 1000; // Du er her
          if (context.datasetIndex === 1) return 200; // Fase 1
          if (context.datasetIndex === 2) return 200; // Fase 2
          if (context.datasetIndex === 3) return 0; // THC
          if (context.datasetIndex === 4) return 200; // Humør
          return 0;
        },
      },
      plugins: {
        legend: {
          display: false,
          position: 'top',
          fullSize: false,
          reverse: true,
          labels: {
            // padding: 10, // Gjelder kun padding mellom legends
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        y: {
          display: true,
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value: any) {
              if (value === 100) {
                return 'Høy';
              } else if (value === 0) {
                return 'Lav';
              }
              return '';
            },
          },
        },
        x: {
          display: true,
          ticks: {
            callback: function (value: any) {
              // if (value === 8) {
              //   return 'Høy';
              // } else if (value === 1) {
              //   return 'Lav';
              // }
              if (value / 2 === 0) return 'Uke:';
              return `${value / 2}`; // Delt på to siden det er to datapunkter for hver uke
            },
          },
        },
      },
    };

    return () =>
      h(Scatter, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        // styles: props.styles,
        plugins: props.plugins,
      });
  },
});
