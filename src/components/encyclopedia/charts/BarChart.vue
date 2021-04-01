<template>
<div>
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