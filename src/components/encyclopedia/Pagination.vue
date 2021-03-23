<template>
    <div>
        <span 
        v-if="showPreviousLink()"
        class="pagination-btn"
        v-on:click="updatePage(currentPage - 1)"> prev </span>

        <span 
        v-if="totalPages() !=0">
        {{ currentPage + 1 }}</span>
        <span v-else>{{ currentPage }}</span> of {{ totalPages() }}    

        <span 
        v-if="showNextLink()"
        class="pagination-btn"
        v-on:click="updatePage(currentPage + 1)"> next </span>  
    </div>        
</template>

<script>

export default {
    props: ['items', 'currentPage', 'pageSize'],
    methods: {
        updatePage(pageNumber) {
            this.$emit('page:update', pageNumber);
        },
        totalPages() {                                
            return (this.items.length >= 0) ? Math.ceil(this.items.length / this.pageSize) : 0;
        },
        showPreviousLink() {
            return this.currentPage == 0 ? false : true;
        },
        showNextLink() {
            return this.currentPage == (this.totalPages() - 1) ? false : true;
        }
    }    
}
</script>

<style scoped>
.pagination-btn {
  cursor: pointer;
}
</style>