<template> 
<div> 
    <img id="tree" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL9bNIk4c3ib8JXCfzqcOzqYxnAFzZQIGmjOa-WCNWJpzNisCg4aUzVD5KYTRmL4AeveU&usqp=CAU">
    <h4 id="hd"><strong>Garden City Fund Donation</strong></h4>
    <br>
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
                <label for="amount">Donation Amount: (Minimum $5)<span style="color:red;" title="required"> *</span></label>
                <br>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="text" style="width: 400px" class="form-control" aria-label="Amount (to the nearest dollar)" v-model="form.amount" required>
                        <div class="input-group-append">
                        <span class="input-group-text">.00</span>
                        </div>
                </div>
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
        <div id="center">
        <p id="error" v-if="error">{{error}}</p>
        </div>
         <div class="form-group" id="center">
          <button class="btn btn-success" @click.prevent="submitDonation">Donate</button>
        </div>
        </form>
    </div>
    </div>
</div>
</template>

<script>
export default {


  data() {
    return {
      form: {
        date: "",
        day: 0,
        username: "",
        fname: "",
        lname: "",
        email: "",
        phone: "",
        don: "",
        who: "",
        amount: "",
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
          this.form.don =="" || this.form.who =="" || this.form.amount =="" || this.form.check=="") {
              this.error = "Please check that inputs are valid!"
          } else if (parseInt(this.form.amount) < 5) {
              this.error = "Invalid donation amount"
          } else {
              alert("Donation made successfully!  You will receive a confirmation letter by Garden City Fund in a few days.")
              this.$router.push({path: './donation'})
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