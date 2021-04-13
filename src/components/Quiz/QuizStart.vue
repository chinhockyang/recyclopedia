<template>
<div>
<header class="masthead">
  <div class="container h-100">
    <div class="row h-100 align-items-center">
      <div class="col-12 text-center">
        <h1 style="font-size: 80px; color: #0A4C0A;">Can it be recycled?</h1>
        <p class="lead" style="font-size: 30px;">Recyclopedia's Weekly challenge</p>
      </div>
    </div>
  </div>
</header>


<div class="row align-items-center justify-content-center text-center" style="border-color: #E3E9BB; padding: 40px 0px 0px 20px">
    <div class="col-lg-10" style="color: #0A4C0A;">
    <h2>Action requires education. For this week’s challenge, we put your recycling knowledge to the test.<br>Test yourself and earn 10 points for every correct answer!</h2>
    <br><p>Psst...... All information for the right answers can be found on Encyclopedia.<br>Psst psst…… Just because an item is recyclable doesn’t always mean it can be placed in the blue commingled recycling bins. For this quiz, choose the first option as long as the item is recyclable, whether or not it can be placed in the blue commingled recycling bins.</p>
    </div>
</div>

<div id="quizSection">
  <div class='row align-items-center justify-content-center' style="height: 250px;">
  <div class="col-4 text-center" style="background-color: #E3E9BB; padding: 50px 0px 50px 0px">
  <p>You may only attempt this quiz once. Are you ready?</p>
  <button @click="$router.push('/quiz/questions')" type="button" class="btn btn-primary btn-lg" style="background-color: #0A4C0A">I'm Ready. Let's Go!</button>
  </div>
  </div> 
</div>

</div>
</template>

<script>

</script>

<style scoped>
.masthead {
  height: 30vh;
  min-height: 300px;
  background-image: url('https://source.unsplash.com/BtbjCFUvBXs/1920x1080');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

div {
    overflow: hidden;
}
</style>