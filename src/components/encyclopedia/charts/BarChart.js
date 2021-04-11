import { Bar } from 'vue-chartjs'
import database from '../../../firebase.js'

export default {
    extends: Bar,
    data: function() {
        return {
            datapacket: [],
            labels: [],
            datacollection: {
                labels: [],
                datasets: [
                    {
                        label: "Number",
                        backgroundColor: [],
                        data: [],
                        maxBarThickness: 30
                    }
                ]                
            },
            options: {
                legend: { display: false },
                title: {
                  display: false                  
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxRotation: 90,
                            minRotation: 90
                        }
                    }]
                },
                tooltips: {
                    mode: 'x'
                }                
            }
        }
    },

    methods: {
        fetchItems: function() {            
            database.collection('items')                        
            .orderBy('amountRecycled', 'desc')                             
            .get()                                                      
            .then((querySnapShot)=>{
                let item={}            
                querySnapShot.forEach(doc=>{
                item=doc.data()                
                item.show = false
                item.id=doc.id                           
                if (item.category == this.category & this.datacollection.datasets[0].data.length <= 10) {
                    if (item.name.length > 20) {                        
                        this.datacollection.labels.push(item.name.substring(0,20) + '...')
                    } else {
                        this.datacollection.labels.push(item.name)
                    }
                    this.datacollection.datasets[0].data.push(item.amountRecycled)                    
                    this.datacollection.datasets[0].backgroundColor.push("green")
                }                
            })
            this.renderChart(this.datacollection, this.options);
            });                                                
        }
    },

    watch: {
        $route: function(val) {
            this.datacollection.labels = []
            this.datacollection.datasets[0].data = []
            this.datacollection.datasets[0].backgroundColor = []
            this.category = val.params.id.charAt(0).toUpperCase() + val.params.id.slice(1);            
            this.fetchItems();
        }
    },
    props: ['category'],

    created() {
        this.fetchItems();        
    }
};
