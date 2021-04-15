<template>
<div class="text-center m-3">  
  <h3 class="display-4" v-show="questionIndex != items.length & !showAnswers">Quiz</h3>
  <h3 class="display-4" v-show="showAnswers">Quiz Answers</h3>
  <div id="quizQuestions" class="container bg bg-light my-3 p-3 mx-auto text-center">
    <div v-if="questionIndex == items.length & !showAnswers">
      <div class="card text-center w-75 mx-auto">        
          <h3 class="display-4 mb-3">End of quiz</h3>
          <h3>Total score:</h3> 
          <h3 class="display-4 mb-3">{{ score }} / 8</h3>
          <div class="container rounded border border-secondary w-75 mx-auto">            
            <h3>You have earned {{ score * 10 }} points</h3>
          </div>             
          <button @click="submit" type="button" class="btn btn-success w-50 mx-auto my-3">See Answers!</button>                  
      </div>
    </div>

    <div v-for="item in items" :key="item.index">
      <div v-if="item.index == questionIndex">
        <h3>Question {{ parseInt(item.index) + 1 }} of 8</h3>
        <div class="row">
          <div class="col"></div>
          <div class="card text-center mx-auto mt-3 col-10 col-md-6">            
            <img :src="item.imageUrl" class="card-img mt-3 border border-light" style="max-height: 50%; max-width: 50%; margin-left: auto; margin-right: auto;"/>
            <div class="card-body">
                <h5 class="card-title">{{item.name}}</h5>     
                <p class="card-subtitle text-muted">{{item.category}}</p> 
                <div class="form-group mt-3">
                  <div class="form-check form-check-inline radio-true mt-1">
                    <input class="form-check-input" type="radio" value="true" v-model="userResponses[item.index]">
                    <label class="form-check-label">Recyclable</label>                    
                  </div>              
                  <div class="form-check form-check-inline radio-false mt-1">                    
                      <input class="form-check-input" type="radio" value="false" v-model="userResponses[item.index]">
                      <label class="form-check-label">Not Recyclable</label>                
                  </div>              
                </div>                
            </div>
          </div>
          <div class="col"></div>
        </div>        
                
        <div v-if="(item.index == 7)">
        <div class="row align-items-center justify-content-center text-center mt-3">
          <div class="col-4 text-left">
            <button v-on:click="previous" type="button" class="btn btn-warning btn-lg">Previous</button>
          </div>
          <div class="col-4 text-right">
            <button v-on:click="next(); computeScore();" type="button" class="btn btn-success btn-lg">Submit</button>
          </div>
        </div>
        </div>
        <div v-else-if="(item.index == 0)">
        <div class="row align-items-center justify-content-center text-center mt-3">
          <div class="col-8 text-right">
            <button v-on:click="next" type="button" class="btn btn-warning btn-lg">Next</button>
          </div>
        </div>
        </div>
        <div v-else>
        <div class="row align-items-center justify-content-center text-center mt-3">
          <div class="col-4 text-left">
            <button v-on:click="previous" type="button" class="btn btn-warning btn-lg">Previous</button>
          </div>
          <div class="col-4 text-right">
            <button v-on:click="next" type="button" class="btn btn-warning btn-lg">Next</button>
          </div>
        </div>
        </div>     
      </div> 
    </div>    

    <div v-if="showAnswers">
      <div v-for="item in items" :key="item.index">
         <div class="card text-center w-80 mx-auto mt-3">   
           <div class="row">             
             <div class="col-5 col-md-3">
               <img :src="item.imageUrl" class="card-img mt-3 mx-3 border border-light" style="max-height: 100%; max-width: 100%;"/>
             </div>
             <div class="col-6 col-md-8 my-5 text-center" style="align-content: center;">
                <h5>{{item.name}}</h5>     
                <p>{{item.category}}</p>                
                <p>{{item.disposal}}</p>                 
                <div class="alert alert-success" role="alert" v-if="item.recyclable">
                    This item is recyclable
                </div>
                <div class="alert alert-danger" role="alert" v-else>
                    This item is not recyclable
                </div>
                <div class="border border-success w-40 mx-auto" v-if="(Boolean(userResponses[item.index]) == Boolean(item.recyclable))">
                    <p class="text-success">You are correct!</p>
                </div>              
                <div class="border border-danger w-40 mx-auto" v-else>
                    <p class="text-danger">You are wrong!</p>
                </div>                
            </div>
          </div>                                 
        </div>
      </div>
    </div>
  </div>
</div>  
</template>

<script>
import database from '../../firebase.js'

export default {
  data() {
    return {
      //quiz: quiz,
      userResponses: Array(8).fill(false),
      questionIndex: 0,
      score: 0,
      items: [], 
      showAnswers: false     
    }
  },
  methods: {
    fetchItems: function() {                      
        let rand = Math.floor(Math.random() * 50);        
        let rand2 = Math.floor(Math.random() * 2) + 1;
        let randNumbers = [];
        for (let i = 0; i < 8; i++) {
          randNumbers.push(rand);
          rand = rand + rand2;
        }

        for (let i in randNumbers) {            
            database.collection('items').where('index', '==', randNumbers[i]).get().then((querySnapShot)=>{
                let item={}
                querySnapShot.forEach(doc=>{
                item=doc.data()
                item.show=false
                item.id=doc.id                           
                this.items.push(
                  {
                      'name': item.name,
                      'imageUrl': item.imageUrl,
                      'category': item.category,
                      'recyclable': item.recyclable,
                      'disposal': item.disposal,
                      'index': i
                  }
                )
              })});
        }
                
    },
    
    computeScore: function() {             
        for (let i = 0; i < this.items.length; i++) {                    
          if (Boolean(this.userResponses[i]) == Boolean(this.items[i].recyclable)) {
            this.score = this.score + 1;
          }
        }        
    },

    next: function() {
        this.questionIndex++;
    },
    previous: function() {
      this.questionIndex--;
    },
    submit: function() {
      this.showAnswers = true;
    }
  },

  created() {
    this.fetchItems();
  }
}
</script>

<style scoped>

label {
    display: block;
    background-color: #ddd;
    padding: 10px 20px;
    font-family: sans-serif, Arial;
    font-size: 16px;
    border: 2px solid #444;
    border-radius: 4px;
}

.radio-true > label:hover {
  background-color: #dfd;
}

.radio-true > input[type="radio"]:focus + label {
    border: 2px solid #444;
}

.radio-true > input[type="radio"]:checked + label {
    background-color: #bfb;
    border-color: #4c4;
}

.radio-false > label:hover {
  background-color: lightpink;
}

.radio-false > input[type="radio"]:focus + label {
    border: 2px solid red;
}

.radio-false > input[type="radio"]:checked + label {
    background-color: lightpink;
    border-color: red;
}

</style>