import { Pie } from 'vue-chartjs'
import database from '../../../firebase.js'

export default {
    extends: Pie,
    data: function() {
        return {
            title: '',      
            datapacket: {
                'Recyclable': 0,
                'Non-Recyclable': 0,
            },
            labels: [],
            datacollection: {
                labels: ['Recyclable', 'Non-Recyclable'],
                datasets: [{
                    label: "Number",
                    backgroundColor: ['Green', 'Grey'],
                    data: []
                  }]                
            },
            options: {
                legend: { 
                    display: false,                                        
                },
                title: {
                  display: false,                  
                },
                responsive: true,
                maintainAspectRatio: false                           
            }
        }
    },

    methods: {
        fetchItems: function() {            
            database.collection('items')                        
            .where('category', '==', this.category)            
            .get()                                                      
            .then((querySnapShot)=>{
                let item={}            
                querySnapShot.forEach(doc=>{
                item=doc.data()                
                item.show = false
                item.id=doc.id                
                if (item.approved) {
                    if (this.chartType == "searchCount") {
                        if (item.recyclable) {
                            this.datapacket['Recyclable'] = this.datapacket['Recyclable'] + item.amountSearched;
                        } else {
                            this.datapacket['Non-Recyclable'] = this.datapacket['Non-Recyclable'] + item.amountSearched;
                        }
                    } else if (this.chartType == "itemsCount") {
                        if (item.recyclable) {
                            this.datapacket['Recyclable']++;
                        } else {
                            this.datapacket['Non-Recyclable']++;
                        }
                    }
                }
            })
            this.datacollection.datasets[0].data.push(this.datapacket['Recyclable']);
            this.datacollection.datasets[0].data.push(this.datapacket['Non-Recyclable']);
            this.renderChart(this.datacollection, this.options);
            });                                                
        }
    },

    watch: {
        $route: function(val) {
            this.datapacket['Recyclable'] = 0
            this.datapacket['Non-Recyclable'] = 0
            this.datacollection.datasets[0].data = []            
            this.category = val.params.id.charAt(0).toUpperCase() + val.params.id.slice(1);                   
            this.fetchItems();
        }
    },
    props: {
        'category': {
            type: String
        }, 
        'chartType': {
            type: String
        }
    },

    created() {
        this.fetchItems();        
    }
};
