<template> 
<div> 
    <img id="tree" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL9bNIk4c3ib8JXCfzqcOzqYxnAFzZQIGmjOa-WCNWJpzNisCg4aUzVD5KYTRmL4AeveU&usqp=CAU">
    <h4 id="hd"><strong>Garden City Fund Donation</strong></h4>
    <p id="pd"><strong>Donate $2 for every 300 points</strong></p>
    <div id="center">
    <div> 
        <form class="containter px-3" id="form"> 
            <div class="form-group" >
                <label for="fname">First Name:<span style="color:red;" title="required"> *</span></label>
                <br><input type="text" placeholder="First Name" name="fname" v-model="form.fname" required>
            </div>
            <div class="form-group" style="margin-left: 100px">
                <label for="lname" id="label">Last Name:<span style="color:red;" title="required"> *</span></label>
                <br><input type="text" placeholder="Last Name" name="lname" v-model="form.lname" required>
            </div>
        </form>
        <form class="containter px-3" id="form">
            <div class="form-group" >
                <label for="email">Email Address:<span style="color:red;" title="required"> *</span></label>
                <br><input type="email" placeholder="Email" name="email" v-model="form.email" required>
            </div>
            <div class="form-group" style="margin-left: 100px">
                <label for="phone">Phone Number:<span style="color:red;" title="required"> *</span></label>
                <br><input type="number" placeholder="Phone" name="phone" v-model="form.phone" 
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
             pattern="\d*" maxlength="8" required>
            </div>
        </form>
        <form class ="containter px-3" id="form">
            <div class="form-group">
                <label for="don">I'm donating in the name of:<span style="color:red;" title="required"> *</span></label>
                <br>
                <select id="don" style="width: 98%" name="don" v-model="form.don" required>
                    <option value="Myself">Myself</option>
                    <option value="Organization">Organization</option>
                </select>
            </div>
            <div class="form-group" style="margin-left: 75px">
                <label for="who">Organization/Honoree Name:<span style="color:red;" title="required"> *</span></label>
                <br><input type="text" placeholder="Organization/Honoree" name="who" v-model="form.who" required>
            </div>
        </form>
        <form class ="containter px-3" id="form">
            <div class="form-group">
                <label for="comment">Leave us a comment:</label>
                <br><textarea rows=2 cols=63 placeholder="We'd love to hear from you!" name="comment" v-model="form.comment"></textarea>
            </div>
        </form>
        <form class ="containter px-3" id="form">
            <div class="form-group">
                <input type="radio" id="check" value="yes" v-model="form.check">
                <label for="check" style="margin-left: 10px">I agree to the terms and conditions.</label>
            </div>
        </form>
        <form class="containter px-3"> 
         <div class="form-group" id="center">
          <button class="btn btn-success" @click.prevent="submitDonation">Donate</button>
        </div>
        <div id="center">
        <p id="error" v-if="error">{{error}}</p>
        </div>
        </form>
    </div>
    </div>
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
        fname: "",
        lname: "",
        email: "",
        phone: "",
        don: "",
        who: "",
        comment: "",
        check: "",
        points: 0
      },
      error: null
    };
  },

  methods: {
      submitDonation() {
          this.error=null
          if (this.form.fname == "" || this.form.lname == "" || this.form.email=="" || this.form.phone=="" || 
          this.form.don =="" || this.form.who =="" || this.form.check=="") {
              this.error = "Please check that inputs are valid!"
          } else {
              this.form.date = new Date()
              var options = {month: 'long'}
              var d = new Intl.DateTimeFormat('en-US', options)
              var month = d.format(this.form.date)
              this.form.date= this.form.date.getDate() + ' ' + month + ' ' + this.form.date.getFullYear()
              this.form.username = this.user.data.displayName
              this.form.points = -300
              database.collection('donation').add(this.form).then(() => {
                  if (this.error==null) {
                     this.$router.push({path: './dashboard'})
                    alert("Donation made successfully!")
                  }
             
            })

          }

      }

  }
  
}
</script>

<style scoped> 
#tree {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}

#hd {
    text-align: center;
    color: darkgreen
}

#pd {
    text-align: center;
    font-size: 17px;
}

#form {
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
}

#id {   
    display: inline-flex;
}

#error {
    font-size: 18px;
    color: red;
}

#center { 
    display: flex;
    justify-content: center;
    align-items:center
}

</style>