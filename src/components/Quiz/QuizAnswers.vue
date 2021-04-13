<template>
  <div>
    <div v-for="(question, index) in quiz.questions" :key="index">
      <div class="row align-items-center justify-content-center text-center mt-3">
        <div id = "questionContainer" class="col-6" style="background-color: #E3E9BB; padding-top: 18px;">
          <h1>{{ question.text }}</h1>
          <img class="img-thumbnail" :src="question.img">
            <div v-for="response in question.responses" :key="response">
                <div v-if="response.correct">
                <h3 style="color: #B22222;">{{ response.text }}</h3>
                </div>
            </div>
            <p>{{ question.explanation }}</p>
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
      img: "https://b3h2.scene7.com/is/image/BedBathandBeyond/148463261864696p?$imagePLP$&wid=256&hei=256",
      explanation: "The type of glass used in mirrors makes them hard to recycle. Dispose your mirror as general waste or donate it if you think it can be reused!"
    }, {
      text: "Unused Tissue Paper",
      responses: [
        {text: 'Recycle it!'}, 
        {text: 'Dispose as general waste', correct: true}, 
      ],
      img: "https://5.imimg.com/data5/EE/AP/GC/SELLER-92910768/toilet-paper-roll-500x500.jpg",
      explanation: "You should not recycle tissue paper, even if it is unused. As a lot of tissue paper is made from already recycled paper, its fibres are too short to be effectively recycled."
    }, {
      text: "Milk Carton",
      responses: [
        {text: 'Recycle it!', correct: true}, 
        {text: 'Dispose as general waste'}, 
      ],
      img: "https://media.istockphoto.com/vectors/realistic-3d-milk-carton-packing-isolated-on-white-vector-id1028104580?k=6&m=1028104580&s=612x612&w=0&h=wLuTpnIefbO_pQIfPFcbyx4mKbRjnvQ_jMZ5FrCVLKY=",
      explanation: "Beverage cartons are recyclable. Remember to empty, rinse and flatten them before placing them into the recycling bins." 
    }, {
      text: "Mobile Phone",
      responses: [
        {text: 'Recycle it!', correct: true}, 
        {text: 'Dispose as general waste'}, 
      ],
      img: "https://assets.swappie.com/iPhone-11-Pro-midnight-green-back.png",
      explanation: "Electronic waste and IT accessories are recyclable at their specific collection points for E-waste recycling. Locate these E-waste bins with Recyclopedia’s Map feature!"
    }, {
      text: "Baby Crib",
      responses: [
        {text: 'Recycle it!'}, 
        {text: 'Dispose as general waste', correct: true}, 
      ],
      img: "https://i5.walmartimages.com/asr/3e5940e3-e444-4806-9ff1-46e40182b777_1.6fd989a4179b6c362d36a4a085f2c34c.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff",
      explanation: "Furniture should be disposed of as general waste, but do contact your Town council to remove them from your residential premises. Alternatively, consider donating them if they can be reused."
    }, {
      text: "Plastic Packaging for Sliced Bread",
      responses: [
        {text: 'Recycle it!', correct: true}, 
        {text: 'Dispose as general waste'}, 
      ],
      img: "https://cdn11.bigcommerce.com/s-knrdocushe/products/8684/images/15964/8888247118113_1__14846.1526292121.500.750.jpg?c=2",
      explanation: "Plastic packaging for food can be recycled as long as they are not contaminated with food waste. Remember to empty any contents before you recycle them."
    }, {
      text: "Plastic Drinking Straw",
      responses: [
        {text: 'Recycle it!'}, 
        {text: 'Dispose as general waste', correct: true}, 
      ],
      img: "https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbdjteam.2018.115/MediaObjects/41407_2018_Article_BFbdjteam2018115_Figa_HTML.jpg",
      explanation: "Plastic straws are already made of a low-grade plastic that deteriorates quickly, making them extremely hard to recycle." 
    }, {
      text: "Aerosol Can",
      responses: [
        {text: 'Recycle it!', correct: true}, 
        {text: 'Dispose as general waste'}, 
      ],
      img: "https://www.pennwaste.com/wp-content/uploads/aerosol.jpg",
      explanation: "Ensure the cans are empty before recycling, but never attempt to pierce, crush or flatten them! Recycle loose or easily removable parts, like plastic caps, separately."
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

p {
    font-size: 20px;
}

.img-thumbnail {
  height: 200px;
  width: 200px;
}

</style>