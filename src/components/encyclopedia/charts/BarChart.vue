<template>
<div>
    <h3>Commonly searched 
        <span v-if="recyclable">Recyclable</span>
        <span v-else>Non-Recyclable</span> {{category}}</h3>

    <chart 
    :category="category" 
    :recyclable="recyclable" 
    :height="300" 
    :width="500"></chart>
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