<template>

    <!-- <div class="doughnut-inner">
        <h5>3</h5>
        <span>dager</span>
    </div> -->

    <div style="width: 100%; height: 100%; float: left; position: relative;">
        <div
            style="width: 100%; height: 40px; position: absolute; top: 50%; left: 0; margin-top: -20px; line-height:19px; text-align: center; z-index: 1">
            <h3>{{ chartValue }}</h3>
            <p>{{ chartUnit }}</p>
        </div>
        <Doughnut :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
            :dataset-id-key="datasetIdKey" />
    </div>

</template>
  
<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue';
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
import { useStore } from 'vuex';

import dayjs from 'dayjs';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)


export default defineComponent({
    props: {
        countFromDate: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'days',
            validator: (value: string) => {
                return ['days', 'hours', 'minutes'].includes(value);
            }
        }
    },
    setup(props) {
        const store = useStore();
        const data = reactive({
            chartData: {
                // labels: ['January', 'February', 'March'],
                datasets: [{
                    data: [35, 25],
                    backgroundColor: [
                        'green',
                        '#E7CED9'
                    ],
                    borderColor: ['green', '#E7CED9'],
                    // borderRadius: 0,
                    borderWidth: 1,
                    // offset: 0,
                    // spacing: 1,
                    cutout: 100
                }]
            },
            chartOptions: {
                responsive: true,
            },
            chartId: 'chart-' + props.type,
            datasetIdKey: 'label',
            chartValue: 0,
            chartUnit: ''
        });

        calculate();
        setInterval(() => {
            calculate();
        }, 1000);

        function calculate() {
            const programStartedAt = dayjs(store.getters['programStartedAt']);

            // Regn ut verdiene
            let daysAgo = dayjs().diff(programStartedAt, 'day');
            let hoursAgo = dayjs().diff(programStartedAt.add(daysAgo, 'days'), 'hour');
            let minutesAgo = dayjs().diff(programStartedAt.add(daysAgo, 'days').add(hoursAgo, 'hours'), 'minute');
            let secondsAgo = dayjs().diff(programStartedAt.add(daysAgo, 'days').add(hoursAgo, 'hours').add(minutesAgo, 'minutes'), 'second');

            // Hvis bruker har valgt en dato frem i tid, så ønsker vi å telle motsatt vei. Altså nedover. Men vi vil ikke si "-19 dager", bare "19 dager"
            if (daysAgo < 0) daysAgo = daysAgo * -1
            if (hoursAgo < 0) hoursAgo = hoursAgo * -1
            if (minutesAgo < 0) minutesAgo = minutesAgo * -1
            if (secondsAgo < 0) secondsAgo = secondsAgo * -1

            if (props.type === 'days') {
                data.chartUnit = 'dager';
                data.chartValue = daysAgo;
                if (daysAgo === 1) data.chartUnit = 'dag';

                const now = programStartedAt.add(daysAgo, 'days');
                const diff = now.add(1, 'day').diff(now.add(hoursAgo, 'hours').add(minutesAgo, 'minutes'), 'day', true);
                const percentageDone = (1 - diff) * 100;
                data.chartData.datasets[0].data[0] = percentageDone;
                data.chartData.datasets[0].data[1] = 100 - percentageDone;
            } else if (props.type === 'hours') {
                data.chartUnit = 'timer';
                data.chartValue = hoursAgo;
                if (hoursAgo === 1) data.chartUnit = 'time';

                const now = programStartedAt.add(daysAgo, 'days').add(hoursAgo, 'hours');
                const diff = now.add(1, 'hour').diff(now.add(minutesAgo, 'minutes'), 'hour', true);
                const percentageDone = (1 - diff) * 100;
                data.chartData.datasets[0].data[0] = percentageDone;
                data.chartData.datasets[0].data[1] = 100 - percentageDone;
            } else if (props.type === 'minutes') {
                data.chartUnit = 'minutter';
                data.chartValue = minutesAgo;
                if (minutesAgo === 1) data.chartUnit = 'minutt';

                const now = programStartedAt.add(daysAgo, 'days').add(hoursAgo, 'hours').add(minutesAgo, 'minutes');
                const diff = now.add(1, 'minutes').diff(now.add(secondsAgo, 'seconds'), 'minute', true);

                const percentageDone = (1 - diff) * 100;
                data.chartData.datasets[0].data[0] = percentageDone;
                data.chartData.datasets[0].data[1] = 100 - percentageDone;
            } else {
                console.error(`Invalid type "${props.type}" for component ChartDoughnutComponent`);
            }
        }

        return {
            ...toRefs(data)
        }
    },
    name: 'ChartDoughnutComponent',
    components: { Doughnut }
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
  