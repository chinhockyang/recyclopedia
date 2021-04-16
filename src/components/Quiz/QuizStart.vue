<template>
<div>
<header class="masthead">
  <div class="container h-100">
    <div class="row h-100 align-items-center">
      <div class="col-12 text-center">
        <h1 style="font-size: 80px; color: #0A4C0A;">Can it be recycled?</h1>
        <p class="lead" style="font-size: 30px;"><strong>Recyclopedia's Weekly Challenge</strong></p>
      </div>
    </div>
  </div>
</header>


<div class="row align-items-center justify-content-center text-center" style="border-color: #E3E9BB; padding: 40px 0px 0px 20px">
    <div class="col-lg-10" style="color: #0A4C0A;">
    <h3>In this week’s challenge, we put your recycling knowledge to the test!</h3>
    <template v-if="user.loggedIn">   
    <h3>Test yourself and earn 10 points for every correct answer!</h3>
    <p style="font-size: 18px">Points will only be awarded for the first attempt.</p>
    </template>
    <br><h5><img src="https://swmnelca.org/wp-content/uploads/2017/02/psst.png" style="width: 7%">  All information for the right answers can be found in Encyclopedia.</h5>
    </div>
</div>

<div id="quizSection">
  <div class='row align-items-center justify-content-center' style="height: 250px;">
  <div class="col-4 text-center" style="background-color: #E3E9BB; padding: 50px 0px 50px 0px">
  <p>Multiple reattempts are allowed! Are you ready?</p>
  <button @click="$router.push('/quiz/questions')" type="button" class="btn btn-secondary btn-lg">I'm Ready. Let's Go!</button>
  </div>
  </div> 
</div>

</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
}

</script>

<style scoped>
.masthead {
  height: 30vh;
  min-height: 300px;
  background-image: url("https://image.freepik.com/free-photo/empty-wooden-table-with-natural-background-free-space-product-editing_7182-860.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

div {
    overflow: hidden;
}


</style>