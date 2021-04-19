<template>
  <div> 
    <nav class="nav nav-light justify-content-center">
           <ul class="nav nav-tabs mt-4 mb-3 mx-auto" id="pills-tab" role="tablist">
               <li>
                    <router-link to="/addNewRecord" 
                    class="nav-link"
                    id="quick-search-tab" 
                    data-toggle="pill"                     
                    role="tab" 
                    >Add New Record</router-link>
               </li>

                <li>
                    <router-link to="/points" 
                    class="nav-link"
                    id="quick-search-tab" 
                    data-toggle="pill"                     
                    role="tab" 
                    >My Rewards</router-link>
               </li>

               <li>
                    <router-link to="/past" 
                    class="nav-link"
                    id="quick-search-tab" 
                    data-toggle="pill"                     
                    role="tab" 
                    >View Past Records</router-link>
               </li>
               <li>
                    <router-link to="/dashboard" 
                    class="nav-link"
                    id="quick-search-tab" 
                    data-toggle="pill"                     
                    role="tab" 
                    >Profile Information</router-link>
               </li>
           </ul>                        
       </nav> 
    <div class="containter px-3"> 
      <br>
      <div class="row">        
          <div class="col"></div>
          <div class="col-10 col-md-8">
            <h4>Instructions</h4> 
            <ol> 
              <li>Identify the "AXXXXXX" Bin Serial Number which is located on the front face of the bin.</li> 
              <img src="https://i.ibb.co/h9qB015/photo-2021-04-05-00-14-20.jpg" style="height: 200px">
              <li>Choose the item category from the dropdown list provided.</li>
              <li>Count the number of distinct items recycled for the specific item category.</li> 
              </ol>
              <h6>Recycling is a contribution to the environment.  We greatly appreciate if you can input your record honestly!</h6>
          </div>
          <div class="col"></div>
      </div>      
    <br>
    <div>
      <h2 id="center">Add New Record</h2>
      <div class="row p-3 mb-5">
        <div class="col-1 col-md-2 col-l-3"></div>
          <div class="col-10 col-md-8 col-l-6 bg-light rounded p-3">
            <div id="center">
              <form class="containter px-3"> 
                <div class="form-group">
                  <label>Bin Serial Number:<span style="color:red;" title="required"> *</span></label>
                  <br>
                  <div class="input-box">
                    <input type="number" class="form-control" id="serial" placeholder="XXXXXX" 
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      name="serialNo" pattern="\d*" maxlength="6" v-model="form.serialNo" required>
                    <span class="unit"><strong>A</strong></span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="itemCat">Item Category<span style="color:red;" title="required"> *</span></label>
                    <br><select id="itemCat" name="itemCat" v-model="form.itemCat" class="form-control" required>
                        <option value="Plastic">Plastic</option>
                        <option value="Paper">Paper</option>
                        <option value="Metal">Metal</option>
                        <option value="Glass">Glass</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                
                <div class="form-group">
                  <label>Item Name <small><em>(if applicable, press "Pick Item" to select an item)</em></small></label><br>                  
                  <p v-show="item">Selected: <badge class="badge badge-info p-1"> {{item}}</badge></p>
                  <search-tool 
                    :itemsList="itemsList"
                    :buttonName="'Pick Item'"                    
                    @searched="addItem"                 
                    >
                  </search-tool>                  
                </div>

                <div class="form-group">
                  <label for="quantity">Quantity<span style="color:red;" title="required"> *</span></label>
                    <br><input type="number" class="form-control" placeholder="0" id="quantity" name="quantity" min="0" v-model="form.quantity" required>
                    <div>
                      <p>5 points will be rewarded for every quantity recycled.</p>
                    </div>
                </div>
                <br>
                <div id="center">
                  <button @click.prevent="submitRecord" class="btn btn-success w-100" >Submit</button>
                </div>
                <div>
                  <div id="center">
                    <p id="error" v-if="error">{{error}}</p>
                  </div>
                  <div id="center">
                    <p style="font-size: 15px">Thank you for recycling today!</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import database from '../../firebase.js'
import SearchTool from '../encyclopedia/SearchTool.vue'

export default {
  computed: {
    ...mapGetters({
      user: "user"
    })
  },

  data() {
    return {
      itemsList: [], 
      item: "",

      form: {
        date: "",
        day: 0,
        username: "",
        serialNo: "",
        itemCat: "",
        quantity:"", 
        points: 0
      },
      pointsRecord: {
        username: "", 
        pts: 0, 
        action: "",
        date: "", 
        day: 0
      },
      count: {
        category: {}
      },
      error: null
    };
  },

  methods: {
    fetchItems:function(val){      
        database.collection('items').where('category', '==', val).get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            if (item.approved & item.recyclable) {                            
              this.itemsList.push(item.name) 
            }            
        })});
      },

      addItem: function(value) {        
        this.item = value;
      },

      addItemCount: function(val) {          
        database.collection('items')
            .where('name', '==', val)
            .get()
            .then((querySnapShot) => {   
                let item={}                
                querySnapShot.forEach(doc=>{
                    item=doc.data()
                    item.show=false
                    item.id=doc.id
                    database.collection('items').doc(item.id).update({'amountRecycled' : parseInt(item.amountRecycled) + parseInt(this.form.quantity)});              
            })});
      },

      submitRecord() {
          this.error=null          
          this.addItemCount(this.item);          
          if (this.form.serialNo == "" || this.form.itemCat == "" || this.form.quantity=="") {
              this.error = "Please fill in all fields"
          } else if (this.form.serialNo.length != 6) {
              this.error = "Invalid Bin Serial Number!"
          } else if (this.form.quantity == 0) {
              this.error = "Invalid quantity!"
          } else {
              this.form.date = new Date()
              var options = {month: 'long'}
              var d = new Intl.DateTimeFormat('en-US', options)
              var month = d.format(this.form.date)
              this.form.day = parseInt(this.form.date.getDate())
              this.pointsRecord.day = this.form.day
              this.form.date= this.form.date.getDate() + ' ' + month + ' ' + this.form.date.getFullYear()
              this.pointsRecord.date = this.form.date
              this.form.username = this.user.data.displayName
              this.pointsRecord.username = this.user.data.displayName
              this.pointsRecord.action = "Recycled " + this.form.quantity + " " + this.form.itemCat
              this.form.points = this.form.quantity*5
              this.pointsRecord.pts = this.form.quantity*5
              this.count.category[this.form.itemCat] 
              database.collection('users').add(this.pointsRecord);
              database.collection('records').add(this.form).then(() => {
                  if (this.error==null) {
                     this.$router.push({path: './past'})
                    alert("New record added successfully!")
                  }
             
            })

          }

      }
  },

  watch: {
    'form.itemCat': function(val) {  
      this.itemsList = [];    
      this.item = '';
      this.fetchItems(val);
    }
  },

  components: {
    'search-tool': SearchTool
  }
}

</script>

<style scoped>
#error {
    color: red
}

.unit { 
  position: absolute; 
  display: block; 
  left: 5px; 
  top: 7px; 
  z-index: 9;
  color: darkgreen
}

.input-box { 
  position: relative; 
  width: 100%;
}

#serial { 
  display: block; 
  padding: 7px 0px 7px 20px; 
}

.right {
  float: right;
}

#center { 
    display: flex;
    justify-content: center;
    align-items:center
}

.nav-tabs > li > a {
    color: black;
}
.nav-tabs > li > a:hover {
    background-color: lightgray;
}
.nav-tabs > li > a.active {
    color: white;
    background-color: olivedrab;
}

</style>

