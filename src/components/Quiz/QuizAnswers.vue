<template>
  <div>

  <div id="quizQuestions">
    <div v-for="(question, index) in quiz.questions" :key="index">

      <div class="row align-items-center justify-content-center text-center mt-3">
        <div id = "questionContainer" class="col-4" style="background-color: #E3E9BB">
          <h1>{{ question.text }}</h1>

            <div v-for="response in question.responses" :key="response">
                <div v-if="response.correct">
                <h3>Correct answer: {{ response.text }}</h3>
                </div>
            </div>
            {{ question.explanation }}
        </div>
      
        </div>
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
      ],
      explanation: "The type of glass used in mirrors makes them hard to recycle. Dispose your mirror as general waste or donate it if you think it can be reused!"
    }, {
      text: "Unused Tissue Paper",
      responses: [
        {text: 'Recycle it!'}, 
        {text: 'Dispose as general waste', correct: true}, 
      ],
      explanation: "It's not often known, but you can't recycle tissue paper, even if it is unused. As a lot of tissue paper is made from already recycled paper, the fibres are too short and this will result in poor pulp in the recycling process."
    }, {
      text: "Milk Carton",
      responses: [
        {text: 'Recycle it!', correct: true}, 
        {text: 'Dispose as general waste'}, 
      ],
      explanation: "Beverage cartons are recyclable! Remember to empty, rinse and flatten them before placing them into the recycling bins." 
    }, {
      text: "Mobile Phone",
      responses: [
        {text: 'Recycle it!', correct: true}, 
        {text: 'Dispose as general waste'}, 
      ],
      explanation: "Mobile phones, along with other Electronic waste (eg. used laptops, tablets) and IT accessories (eg. mouse, keyboard, cable) are recyclable! You can drop them off at their specific collection points for E-waste recycling. Find these E-waste bins using Recyclopedia’s Map feature!"
    }, {
      text: "Baby Crib",
      responses: [
        {text: 'Recycle it!'}, 
        {text: 'Dispose as general waste', correct: true}, 
      ],
      explanation: "Furniture like baby cribs should be disposed of as general waste, but remember to contact your Town council to remove from your residential premises. Alternatively, consider donating them if you think they can be reused! "
    }, {
      text: "Plastic Packaging for Sliced Bread",
      responses: [
        {text: 'Recycle it!', correct: true}, 
        {text: 'Dispose as general waste'}, 
      ],
      explanation: "Plastic packaging for food (e.g. sliced bread bag and egg trays) can be recycled as long as they are not contaminated with food waste. Remember to empty any contents before you recycle them."
    }, {
      text: "Plastic Drinking Straw",
      responses: [
        {text: 'Recycle it!'}, 
        {text: 'Dispose as general waste', correct: true}, 
      ],
      explanation: "Plastic straws are already made of a low-grade plastic that deteriorates quickly, making them extremely hard to recycle as the new product will be of a value so inferior that it would just end up in the landfill." 
    }, {
      text: "Aerosol Can",
      responses: [
        {text: 'Recycle it!', correct: true}, 
        {text: 'Dispose as general waste'}, 
      ],
      explanation: "Ensure that aerosol cans are completely empty before recycling, but never attempt to pierce, crush or flatten them! Detach only loose or easily removable parts, such as the plastic cap, and recycle them separately. Make sure not to try removing the spray nozzle on top of the can as that can be dangerous."
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

div {
    overflow: hidden;
}

h2 {
    color: #0A4C0A;
}

</style>