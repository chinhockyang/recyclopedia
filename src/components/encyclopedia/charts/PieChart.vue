<template>
<div class="containter">
    <h5 class="lead"><span v-if="chartType=='searchCount'">Searches</span><span v-else>{{category}}</span> in Recyclopedia</h5>    
    <chart :category="category" :chartType="chartType" :height="150" :width="150"></chart>
</div>
</template>


<script>
import Chart from "./PieChart.js"

export default {
    name: 'PieChart',    
    components: {
        Chart
    },
    props: {
        'category': {
            type: String
        }, 
        'chartType': {
            type: String
        }
    }
};


</script>



<style>

</style>