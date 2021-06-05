<template>
  <section>
    <div class="chart">
      <bar-chart
        :data="barChartData"
        :options="barChartOptions"
        :height="300"
      />
    </div>
  </section>
</template>

<script>
import BarChart from './BarChart.vue'
export default {
  components: { BarChart },
  data() {
    return {
      barChartData: {
        labels: [
          '2019-06',
          '2019-07',
          '2019-08',
          '2019-09',
          '2019-10',
          '2019-11',
          '2019-12',
          '2020-01',
          '2020-02',
          '2020-03',
        ],
        datasets: [
          {
            label: 'ETH',
            data: [2, 1, 16, 3, 4, 5, 0, 0, 4, 12, 2],
            backgroundColor: '#A6917D',
            borderColor: '#A6917D',
            borderWidth: 2,
          },

          {
            label: 'BTC',
            data: [2, 4, 22, 3, 4, 6, 0, 0, 4, 12, 2],
            backgroundColor: '#FAAC94',
            borderColor: '#FAAC94',
            borderWidth: 2,
          },

          {
            label: 'SOL',
            data: [3, 6, 22, 3, 4, 6, 5, 7, 4, 1, 2],
            backgroundColor: '#CDB6F0',
            borderColor: '#CDB6F0',
            borderWidth: 2,
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: 'btc vs bob Price ',
          fontSize: 24,
          fontColor: '#726F76',
        },
        tooltips: {
          backgroundColor: '#f7931b',
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                // max: 18,
                min: 0,
                stepSize: 1,
              },
              gridLines: {
                display: true,
              },
            },
          ],
        },
      },
    }
  },
}
</script>

<style scoped>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 100px;
  color: #2e495e;
  letter-spacing: 1px;
  font-size: 6em;
}
.green {
  color: #f8fcfb;
}

.subtitle {
  font-weight: 300;
  font-size: 1em;
  color: #2e495e;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
