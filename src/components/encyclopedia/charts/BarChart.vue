<template>
<div>
    <h5 class="lead">Commonly searched 
        <span v-if="recyclable">Recyclable</span>
        <span v-else>Non-Recyclable</span> {{category}}</h5>

    <chart 
    :category="category" 
    :recyclable="recyclable" 
    :height="150" 
    :width="150"></chart>
</div>
</template>


<script>
import Chart from "./BarChart.js"

export default {
    name: 'BarChart',    
    components: {
        Chart
    },
    props: ['category', 'recyclable']
};


</script>



<style>

</style>