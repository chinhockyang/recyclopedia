<template>
<div class="container tab-pane fade show active" id="add" role="tabpanel" aria-labelledby="add-tab">
    <h1>Add Item to Recyclopedia!</h1>
    <div class="row p-3 mb-5">
        <div class="col-1 col-md-2 col-l-3"></div>
        <div class="col-10 col-md-8 col-l-6 bg-light rounded p-3">            
            <form class="containter px-3"> 
                <div class="form-group">
                    <label>Item Name:<span style="color:red;" title="required"> *</span></label>
                    <input type="text" class="form-control" v-model="item.name" required/>
                </div>

                <p class="lead mb-0"><small>Is the Item Recyclable?<span style="color:red;" title="required"> *</span></small></p>
                <div class="form-check form-check-inline">        
                    <input class="form-check-input" type="radio" id="recyclable" v-model="item.recyclable" :value=true>            
                    <label class="form-check-label" for="recyclable">Yes</label>            
                </div>      
                <div class="form-check form-check-inline">            
                    <input class="form-check-input" type="radio" id="non-recyclable" v-model="item.recyclable" :value=false>
                    <label class="form-check-label" for="non-recyclable">No</label>            
                </div><br><br>

                <div class="form-group">            
                    <label>Category:<span style="color:red;" title="required"> *</span></label>
                    <select class="form-control" v-model="item.category">          
                        <option  v-for="option in categoryOption" :key="option">
                            {{option}}
                        </option>
                    </select>            
                </div>
                
                <p class="lead mt-2 pb-0 mb-1" v-show="item.category"><small>Common Recycling Information:</small></p>
                <table class="table table-bordered table-hover bg-white mb-3" v-show="item.category">
                    <tbody>                        
                        <tr v-show="item.recyclable">
                            <td style="width: 30%" class="table-active border border-secondary">Instruction</td>
                            <td style="width: 70%" class="table-light border border-secondary"><strong>{{item.instruction}}</strong></td>
                        </tr>
                        <tr v-show="item.recyclable">
                            <td colspan="2" class="table-default border border-secondary">
                                <span>Pick a common Recycling instruction:</span><br>
                                <small>List shown is based on the Category and Recyclability of the item.</small><br>                
                                <search-tool 
                                    :itemsList="instructionsList"
                                    :buttonName="'Select'"
                                    @searched="addInstruction"
                                    style="margin-top: 5px;">
                                </search-tool>
                                <small>
                                    <em>Note: Press the Select button in order for the instruction picked to be selected</em><br>
                                    <em>The input will be cleared when the Item's Category or Recyclability is changed</em><br>
                                    <em>Press the ^ button to refresh the list of recommendations</em>
                                </small>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 30%" class="table-active border border-secondary">Method of Disposal</td>
                            <td style="width: 70%" class="table-light border-secondary"><strong>{{item.disposal}}</strong></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="table-default border border-secondary"> 
                                <span>Pick a common method of disposal:</span><br>
                                <small>List shown is based on the Category and Recyclability of the item.</small>
                                <search-tool 
                                    :itemsList="disposalList"
                                    :buttonName="'Select'"
                                    @searched="addDisposal"
                                    style="margin-top: 5px;">
                                </search-tool>   
                                <small>
                                    <em>Note: Press the Select button in order for the method picked to be selected</em><br>
                                    <em>The input will be cleared when the Item's Category or Recyclability is changed</em><br>
                                    <em>Press the ^ button to refresh the list of recommendations</em>
                                </small>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="form-group">
                    <label for="image-url">Image URL:</label>                        
                    <input type="url" class="form-control" id="image-url" v-model="item.imageUrl">
                    <small>You can see an image preview if the link provided is a working Image URL</small>
                    <p class="lead mb-0 mt-1" v-show="item.imageUrl"><small>Image Preview:</small></p>
                    <img :src="item.imageUrl" v-show="item.imageUrl" class="img-thumbnail w-25 mb-3" alt="Please fill in a valid Image URL">                    
                </div>

                <div class="form-group mt-4">
                    <label>Additional Item Descriptions:</label><br>      
                    <textarea class="form-control" v-model="item.addDescription" form="add-item-form">
                        Enter text here...
                    </textarea>
                </div>
                
                <div class="form-group mt-3">
                    <label class="mb-0">Similar Items:</label><br>                    
                    <small class="mt-0 pt-0"><em>Note: You can add up to 4 similar items.</em></small><br>
                    <div class="btn-group mx-1 my-1" role="group" v-for="i in item.similarItem" :key="i">
                        <h5><badge class="badge badge-success p-1">{{i}}</badge></h5>
                        <button type="button" class="close mb-2" aria-label="Close" @click.prevent="removeSimilarItem(i);">
                            <span aria-hidden="true">&times;</span>
                        </button>                        
                    </div>
                    <search-tool 
                    :itemsList="similarItemList"
                    :buttonName="'Add Item'"
                    @searched="addSimilarItem"
                    style="display: flex; flex-grow:2;">
                    </search-tool>                    
                </div>

                <button type="submit" class="btn btn-success w-50 mt-4" v-on:click.prevent="addItem" aria-label="Close">Add Item</button>
            </form>

        </div>
        <div class="col-1 col-md-2 col-l-3"></div>
    </div>
</div>
</template>

<script>
import database from '../../firebase.js'
import SearchTool from './SearchTool.vue'

export default {
    data(){
        return{           
            itemsList: [],
            similarItemList: [],
            
            instructionsList: [],
            disposalList: [],

            categoryOption: [
                   "Plastic",
                   "Paper",
                   "Glass",
                   "Metal",
                   "Electronics",
                   "Others"
               ],

           item:{
               name:"",
               category: "",               
               recyclable: false,
               amountRecycled: 0,
               amountSearched: 0,
               imageUrl: "",
               instruction: "",
               disposal: "",
               addDescription: "",               
               approved: false,
               similarItem: []
           },                      
        }
    },
    
    methods:{
      addItem:function(){
          if (this.item.name.length == 0) {
              alert("Please fill in a name for your item!");
              return;
          } else if (this.item.category.length == 0) {
              alert("Please give your item a category!");
              return;
          }

          var lowerCaseItemsList = [];
          for (let i in this.itemsList) {                            
              lowerCaseItemsList.push(this.itemsList[i].toLowerCase());
          }          
          if (lowerCaseItemsList.includes(this.item.name.toLowerCase())) {              
              alert("You cannot add an existing item");              
          } else {
              database.collection('items').add(this.item);
              alert(this.item.name + " is being submitted!");
              this.item.name="";
              this.item.category="";
              this.similarItemList= [];
              this.item.similarItem= [];
          }          
      },

      fetchItems:function(){
        database.collection('items').get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            if (item.approved) {
                this.itemsList.push(item.name)            
                this.similarItemList.push(item.name)
            }            
            })});  
      },

      addSimilarItem: function(val) {          
          if (!this.similarItemList.includes(val) | this.item.similarItem.length > 3) {
              return;
          }          
          var index = this.similarItemList.indexOf(val);
          if (index > -1) {
              this.similarItemList.splice(index, 1);
          }
          this.item.similarItem.push(val);          
      },

      removeSimilarItem: function(val) {
          var index = this.item.similarItem.indexOf(val);
          if (index > -1) {
              this.item.similarItem.splice(index, 1);
          }
          this.similarItemList.push(val);
      },

      addInstruction: function(val) {
          if (!this.instructionsList.includes(val)) {
              return;
          }   
          this.item.instruction = val;       
      },

      clearInstructionList: function() {              
          this.instructionsList = [];
          this.item.instruction = '';
      },

      addDisposal: function(val) {
          if (this.disposalList.includes(val)) {
              this.item.disposal = val;
          }          
      },

      clearDisposalList: function() {                                   
          this.disposalList = [];
          this.item.disposal = '';
      },
  },

  watch: {
      'item.category': function(val) {
        this.clearInstructionList();
        this.clearDisposalList();
        database.collection('instructions').where('category', '==', val).get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id     
            this.instructionsList.push(item.detail)
            })});

        database.collection('disposal').where('category', '==', val).get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            if (item.recyclable == this.item.recyclable) {
                this.disposalList.push(item.detail)
            }            
            })});
      },

      'item.recyclable': function(val) {                
        this.clearDisposalList();
        database.collection('disposal').where('recyclable', '==', val).get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            if (item.category == this.item.category) {
                this.disposalList.push(item.detail);
            }            
            })});
      }
  },

  components: {
    'search-tool': SearchTool
  },
  
  created() {
    this.fetchItems();
  }
}
</script>

<style scoped>

</style>
