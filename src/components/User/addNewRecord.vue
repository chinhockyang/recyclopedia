<template>
  <div> 
    <h2>Add New Record</h2>
    <form> 
        <div>
          <label for="serialNo">Bin Serial Number</label>
            <br>A<input type="number" placeholder="XXXXXX"
             oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            id="serialNo" name="serialNo" pattern="\d*" maxlength="6" v-model="form.serialNo" required>
        </div>
        <br>
        <div>
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
        <div>
          <label for="quantity">Quantity</label>
            <br><input type="number" placeholder="0" id="quantity" name="quantity" v-model="form.quantity" required>
            <p>5 points will be rewarded for every quantity recycled.</p>
        </div>
    </form>
    <button @click.prevent="submitRecord">Submit</button>
    <p>Thank you for recycling today!</p>
    <p id="error" v-if="error">{{error}}</p>
    
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
        serialNo: "",
        itemCat: "",
        quantity:""
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
              database.collection('records').doc(this.user.data.displayName).set(this.form).then(() => {
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

<style>
#error {
    color: red
}
</style>