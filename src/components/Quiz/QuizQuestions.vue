<template>
  <div>

  <div id="quizQuestions">
    <div v-for="(question, index) in quiz.questions" :key="index">
      <div v-if="index == questionIndex">
      <div class="row align-items-center justify-content-center text-center mt-3">
        <div id = "questionContainer" class="col-4" style="background-color: #E3E9BB">
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
      <div class="row align-items-center justify-content-center text-center mt-3">
          <div class="col-4 text-right">
        <button v-on:click="next" type="button" class="btn btn-primary btn-lg" style="background-color: #0A4C0A">Next</button>
        </div>
      </div>
    </div>
      
    </div>
    <div v-show="questionIndex == quiz.questions.length">
    <h2>End of quiz</h2>
    <h2>Total score: {{ score() }} / 8</h2>
    <h2>You have earned {{ score()*10 }} points</h2>
    </div>
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
      userResponses: Array(8).fill(false),
      questionIndex: 0,
    }
  },
  methods: {
    score: function() {
      return this.userResponses.filter(function(val) {return val}).length;
    },
    next: function() {
        this.questionIndex++;
    },
    submit: function() {
        
    }
  }
}
</script>

<style scoped>
ul {
    list-style-type: none;
}
</style>