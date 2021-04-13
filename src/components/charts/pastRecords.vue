<template>
  <div class="chart">
    <h5 id="center">Total Recycled for Each Category</h5>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./pastRecords.js";
export default {
  components: {
    Chart
  }
};
</script>

<style>
#center { 
    display: flex;
    justify-content: center;
    align-items:center
}
</style>

