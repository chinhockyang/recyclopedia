import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    data: function () {
      return {
          datacollection: {
              labels: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
              datasets: [{
                  label: "Recycling Rates in Singapore (%)",
                  backgroundColor: "#95BF7B",
                  data: [60, 61, 60, 61, 61, 61, 61, 59]
                }]
          },
          options: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Recycling Rates in Singapore (%)'
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                  yAxes: [{
                      ticks: {
                          min: 58,
                          max: 62,
                          stepSize: 1,
                      }
                  }]
              }
          }
      }
    },
    mounted () {
      this.renderChart(this.datacollection, this.options)
    }
  }