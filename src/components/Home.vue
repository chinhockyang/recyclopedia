<template>
  <div>
    <div id="intro">
      <img id="bin" src="https://cna-sg-res.cloudinary.com/image/upload/q_auto,f_auto/image/11788916/16x9/991/557/ffa8cd77c4937126f0956fb24cbcc7bc/nL/waste-singapore---2195670--1-.png">
      <div id="para1">
        <h1 style="color: #0A4C0A;">Are we truly Recycling Conscious?</h1><br>
        <p>Does this clutter look familiar to you?</p>
        <p>Despite campaigns and efforts made in raising the awareness of Singaporeans towards recycling, most people will likely find the recycling bin here to be a common sight.</p>
        <p>Furthermore, even with falling waste generation, Singapore's domestic recycling rates fell from 22% in 2018 to 17% in 2019.</p>
        <p>This reflects a severe lack of recycling knowledge and efforts among Singaporeans and Recyclopedia is here to help.</p> 
      </div>
    </div>
    <h3 class="text-center" style="color: #0A4C0A; padding: 50px 0px 50px 0px;">According to a study conducted by SEC in 2018,</h3>
    <div class="container">
      <div class="row text-center align-items-center">
        <div class="col-md-4"><br>
          <h1 class="num">70%</h1>
          <p>of respondents do not fully know what plastics are recyclable</p>
        <br></div>
        <div class="col-md-4" style="background-color:#C1D4B2"><br>
          <h1 class="num">40%</h1>
          <p>of items placed in recycling bins are unrecyclable or contaminated</p>
        <br></div>
        <div class="col-md-4"><br>
          <h1 class="num">41%</h1>
          <p>of respondents do not fully know what plastics are recyclable</p>
        <br></div>
        <div class="row" style="position:relative; left:130px;">
          <div class="col">
            <recycling-rates></recycling-rates>
          </div>
          <div class="col">
            <h1 style="padding: 70px">Domestic<br> Recycling Rates</h1>
            <div class="row" style="position:relative; bottom:70px;">
              <div class="col text-right">
                <h1 class="num">22%</h1>
                <h3>In 2018</h3>
              </div>
              <div class="col text-left">
                <h1 class="num">17%</h1>
                <h3>In 2019</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div><br><br>
    <div id="urgentneed"><br>
      <h2 style="color: #0A4C0A;" class="text-center"><br>There is an urgent need for Singaporeans<br>to be more Recycle Conscious.</h2>
      <div class="row align-items-center">
        <div class="col text-right">
          <img id="landfill" src="https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2020/04/Webp.net-resizeimage-75.jpg">
        </div>
        <div class="col text-left">
          <p id="landfillText">Singapore's only landfill, Semakau landfill is projected to be fully filled by 2035% at the current rates of wastes disposal.<br><br>
          Recycling is the best way for us to reduce our wastes disposal, to ensure a more sustainable living for the future generations.</p>
        </div>
      </div>
        <div id="startRecycling">
          <h2 style="color: #0A4C0A;" class="text-center"><br><br>Start Recycling Today!</h2>
          <div class="row align-items-center justify-content-center text-center" style="padding:50px 150px 150px">
            <div class="col-3">
              <br><br><br>
              <img class="img-thumbnail" src="https://www.nea.gov.sg/images/default-source/our-serivces/img-recycle.jpg">
              <a id="bottomRoutes" class="nav-link" href="/map">Find my Bin</a>
              <p style="padding-bottom: 50px">Find the nearest recycling bin in your community, never let inconvenience be an excuse for not recycling!</p>            
            </div>
              
            <div class="col-1"></div>
            <div class="col-3">
              <br><br><br>
              <img class="img-thumbnail" src="https://scontent.fsin5-1.fna.fbcdn.net/v/t1.0-9/83927469_846205332489252_458927919981395968_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=730e14&_nc_ohc=-Hl2LlboIswAX8d6-2C&_nc_ht=scontent.fsin5-1.fna&oh=4f7a79b649d4ed58be2d98063b1b352d&oe=608447B4">
              <a id="bottomRoutes" class="nav-link" href="/encyclopedia/quick-search">How to Recycle</a>
              <p style="padding-bottom: 50px">Find out what items can or cannot be recycled, and learn the proper steps to take when recycling.</p>
            </div>
            <div class="col-1"></div>
            <div class="col-3">
              <br><br><br>
              <img class="img-thumbnail" src="https://cdn.dribbble.com/users/623808/screenshots/11362467/media/081cf4d465baa0bb905494a20b853f28.png"> 
              <a id="bottomRoutes" class="nav-link" href="/register">Create an Account</a>
              <p style="padding-bottom: 50px">Join the Recyclopedia Community, make positive impacts on the environment as you recycle with us!</p>
            </div>
          </div>
        </div>
    </div>
  </div>

</template>

<script>
import RecyclingRates from './charts/RecyclingRates.vue'
export default {
  components: {
    RecyclingRates
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#intro {
  background-color: #DBCFB4;
  height: 550px;
  overflow: hidden;
}

#para1 {
  padding-left: 200px;
  padding-top: 60px;
  width: 800px;
}

#urgentneed {
  background-color: #DBCFB4;
  overflow: hidden;
}

#landfill {
  width: 60%;
  padding: 50px 0px 50px 50px;
}

#landfillText {
  padding-right: 400px;
}
#percentages {
  width: 740px;
}

#startRecycling {
  background-color: white;
  height: 800px;
}

#bottomRoutes {
  font-size: 30px;
  padding-top: 40px;
  padding-bottom: 20px;
}

.img-thumbnail {
  width: 80%;
  aspect-ratio: 4/3;
}

.col-md-4 {
  background-color: #E3E9BB;
}

.col-3 {
  background-color: #EAEAEA;
}

.num {
  font-size: 80px;
  color: #5C7F42;
}

p {
  font-size: 20px;
}

#bin {
  width: 950px;
  height: 500px;
  float: right;
  padding: 50px 200px 0px 0px;

}


</style>