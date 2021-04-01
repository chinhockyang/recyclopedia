<template>
<div class="containter">    
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