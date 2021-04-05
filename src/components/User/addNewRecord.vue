<template>
  <div> 
    <div class="containter px-3"> 
      <h4>Instructions</h4> 
      <ol> 
        <li>Identify the "AXXXXXX" Bin Serial Number which is located on the front face of the bin.</li> 
        <li>Choose the item category from the dropdown list provided.</li>
        <li>Count the number of distinct items recycled for the specific item category.</li> 
      </ol>
      <h6>Recycling is a contribution to the environment.  We greatly appreciate if you can input your record honestly!</h6>

    </div>
    <br>
    <form class="containter px-3"> 
        <h2>Add New Record</h2>
        <div class="form-group">
          <label for="serialNo">Bin Serial Number</label>
            <br>A<input type="number" placeholder="XXXXXX" 
             oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            id="serialNo" name="serialNo" pattern="\d*" maxlength="6" v-model="form.serialNo" required>
        </div>
        <br>
        <div class="form-group">
          <label for="itemCat">Item Category</label>
            <br><select id="itemCat" name="itemCat" v-model="form.itemCat" required>
                <option value="Plastic">Plastic</option>
                <option value="Paper">Paper</option>
                <option value="Metal">Metal</option>
                <option value="Glass">Glass</option>
                <option value="E-waste">E-waste</option>
                <option value="Electrical">Electrical</option>
            </select>
        </div>
        <br>
        <div class="form-group">
          <label for="quantity">Quantity</label>
            <br><input type="number" placeholder="0" id="quantity" name="quantity" v-model="form.quantity" required>
            <p>5 points will be rewarded for every quantity recycled.</p>
        </div>
        <div class="form-group">
          <button @click.prevent="submitRecord" class="btn btn-success" >Submit</button>
          <p>Thank you for recycling today!</p>
          <p id="error" v-if="error">{{error}}</p>
        </div>
    </form>
    
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import database from '../../firebase.js'


export default {
  computed: {
    ...mapGetters({
      user: "user"
    })
  },

  data() {
    return {
      form: {
        date: "",
        username: "",
        serialNo: "",
        itemCat: "",
        quantity:"", 
        points: 0
      },
      error: null
    };
  },

  methods: {
      submitRecord() {
          this.error=null
          if (this.form.serialNo == "" || this.form.itemCat == "" || this.form.quantity=="") {
              this.error = "Please fill in all fields"
          } else {
            this.form.date = new Date()
            var options = {month: 'long'}
            var d = new Intl.DateTimeFormat('en-US', options)
            var month = d.format(this.form.date)
            this.form.date= this.form.date.getDate() + ' ' + month + ' ' + this.form.date.getFullYear()
            this.form.username = this.user.data.displayName
            this.form.points = this.form.quantity*5
              database.collection('records').add(this.form).then(() => {
                  if (this.error==null) {
                     this.$router.push({path: './dashboard'})
                    alert("New record added successfully!")
                  }
             
            })
          }

      }

  }
}

</script>

<style scoped>
#error {
    color: red
}
</style>

