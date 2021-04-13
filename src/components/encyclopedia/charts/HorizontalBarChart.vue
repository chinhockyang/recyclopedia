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
import Chart from "./HorizotalBarChart.js"

export default {
    name: 'HorizontalBarChart',    
    components: {
        Chart
    },
    props: ['category', 'recyclable']
};


</script>



<style>

</style>