<template>
    <div class="container my-3">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-2 text-center">
                <button
                    v-if="showPreviousLink()"
                    class="btn btn-warning text-center"
                    v-on:click="updatePage(currentPage - 1)"> Prev </button>                        
                <button v-else class="btn btn-secondary" disabled> Prev </button>
            </div>            
            <div class="col-4 text-center">
                <span 
                    v-if="totalPages() !=0">
                    {{ currentPage + 1 }}</span>
                    <span v-else>{{ currentPage }}</span> of {{ totalPages() }}    
            </div>
            <div class="col-2 text-center">
                <button
                    v-if="showNextLink()"
                    class="btn btn-warning"
                    v-on:click="updatePage(currentPage + 1)"> Next </button>                
                <button v-else class="btn btn-secondary" disabled> Next </button>                        
            </div>
            <div class="col-2"></div>
        </div>                            
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