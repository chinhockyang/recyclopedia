import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'
import { mapGetters } from "vuex";

export default {
    extends: Bar,

    computed: {
        ...mapGetters({
          user: "user"
        })
    },

    data: function() {
        return {
            datacollection: {
                labels: ['Plastic', 'Paper', 'Metal', 'Glass', 'E-waste', 'Electrical'],
                datasets: [{
                    label: "Number", 
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#c0c0c0"], 
                    data: []
                }]
            }, 

            options: {
                legend: { display: false}, 
                title: {
                    display: true, 
                }, 
                responsive: true, 
                maintainAspectRatio: false, 
                scales: {
                    yAxes: [{
                        ticks: {
                          beginAtZero:true,
                          suggestedMin: 0,
                        },
                      }],
                }
            }
        }
    }, 
    methods: {
        fetchItems: function() {
            var count = {}
            database.collection('records').get().then((snapshot) => {
                snapshot.forEach(doc => {
                    if (this.user.data.displayName == doc.data().username) {
                        if (Object.keys(count).length == 0) {
                            count[doc.data().itemCat] = parseInt(doc.data().quantity)
                        } else if (doc.data().itemCat in count) {
                            count[doc.data().itemCat] += parseInt(doc.data().quantity)
                        } else {
                            count[doc.data().itemCat] = parseInt(doc.data().quantity)
                        }
                    }
                })
                for (let i = 0; i<this.datacollection.labels.length;i++) {
                    this.datacollection.datasets[0].data.push(count[this.datacollection.labels[i]])
                }
                this.renderChart(this.datacollection, this.options)
            })
        }
    }, 

    created() {
        this.fetchItems()
    }
}