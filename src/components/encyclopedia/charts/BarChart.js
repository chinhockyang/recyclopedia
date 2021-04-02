import { HorizontalBar } from 'vue-chartjs'
import database from '../../../firebase.js'

export default {
    extends: HorizontalBar,
    data: function() {
        return {
            datapacket: [],
            labels: [],
            datacollection: {
                labels: [],
                datasets: [{
                    label: "Number",
                    backgroundColor: [],
                    data: [],
                    maxBarThickness: 30
                  }]                
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
                            beginAtZero: true
                        }
                    }]
                }                
            }
        }
    },

    methods: {
        fetchItems: function() {            
            database.collection('items')                        
            .orderBy('amountSearched', 'desc')                 
            .limit(10)
            .get()                                                      
            .then((querySnapShot)=>{
                let item={}            
                querySnapShot.forEach(doc=>{
                item=doc.data()                
                item.show = false
                item.id=doc.id                           
                if (item.category == this.category & item.recyclable == this.recyclable) {
                    this.datacollection.labels.push(item.name)
                    this.datacollection.datasets[0].data.push(item.amountSearched)
                    
                    if (this.recyclable) {
                        this.datacollection.datasets[0].backgroundColor.push("green")
                    } else {
                        this.datacollection.datasets[0].backgroundColor.push("grey")
                    }                 
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
    props: ['category', 'recyclable'],

    created() {
        this.fetchItems();        
    }
};
