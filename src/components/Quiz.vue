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


<div class="row align-items-center justify-content-center text-center" style="border-color: #E3E9BB; padding: 20px 0px 0px 20px">
    <div class="col-lg-9" style="color: #0A4C0A;">
    <h3>Action requires education. For this week’s challenge, we put your recycling knowledge to the test!<br>Test yourself and earn 10 points for every correct answer!</h3>
    <br><p>Psst...... All information for the right answers can be found on Encyclopedia.<br>Psst psst…… Just because an item is recyclable doesn’t always mean it can be placed in the blue commingled recycling bins. For this quiz, choose the first option as long as the item is recyclable, whether or not it can be placed in the blue commingled recycling bins.</p>
    </div>
</div>

<div id="quizSection">
    <div v-for="(question, index) in quiz.questions" :key="index">
        <div class="row align-items-center justify-content-center text-center mt-3">
            <div class="col-4" style="background-color: #E3E9BB">
                {{ index + 1 }}. {{ question.text }}
                <ul>
                    <li v-for="response in question.responses" :key="response">
                        <label>
                            <input type="radio" :value="response.correct" :name="index" v-model="userResponses[index]"> {{ response.text }}
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <p>Total score: {{ score() }} / 8</p>
</div>




</div>
</template>

<script>

var quiz = {
  questions: [
    {
      text: "Mirror",
      responses: [
        {text: 'Recycle it!'}, 
        {text: 'Dispose as general waste', correct: true}, 
      ]
    }, {
      text: "Unused Tissue Paper",
      responses: [
        {text: 'Recycle it!'}, 
        {text: 'Dispose as general waste', correct: true}, 
      ]
    }, {
      text: "Milk Carton",
      responses: [
        {text: 'Recycle it!', correct: true}, 
        {text: 'Dispose as general waste'}, 
      ]  
    }, {
      text: "Mobile Phone",
      responses: [
        {text: 'Recycle it!', correct: true}, 
        {text: 'Dispose as general waste'}, 
      ]
    }, {
      text: "Baby Crib",
      responses: [
        {text: 'Recycle it!'}, 
        {text: 'Dispose as general waste', correct: true}, 
      ]
    }, {
      text: "Plastic Packaging for Sliced Bread",
      responses: [
        {text: 'Recycle it!', correct: true}, 
        {text: 'Dispose as general waste'}, 
      ]
    }, {
      text: "Plastic Drinking Straw",
      responses: [
        {text: 'Recycle it!'}, 
        {text: 'Dispose as general waste', correct: true}, 
      ]
    }, {
      text: "Aerosol Can",
      responses: [
        {text: 'Recycle it!', correct: true}, 
        {text: 'Dispose as general waste'}, 
      ]
    }
  ]
};

export default {
  data() {
    return {
      quiz: quiz,
      userResponses: Array(8).fill(false)
    };
  },
  methods: {
      score: function() {
          return this.userResponses.filter(function(val) {return val}).length;
      }
  }
}

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

ul {
    list-style-type: none;
}

div {
    overflow: hidden;
}
</style>