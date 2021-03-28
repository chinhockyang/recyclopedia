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
      <div class="row text-center">
        <div class="col-md-4">
          <h1 class="num">70%</h1>
          <p>of respondents do not fully know what plastics are recyclable</p>
        </div>
        <div class="col-md-4" style="background-color:#C1D4B2">
          <h1 class="num">40%</h1>
          <p>of items placed in recycling bins are unrecyclable or contaminated</p>
        </div>
        <div class="col-md-4">
          <h1 class="num">41%</h1>
          <p>of respondents do not fully know what plastics are recyclable</p>
        </div>
        <recycling-rates></recycling-rates>
        
        <div id="percentages">
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
    </div><br><br>
    <div id="urgentneed">
      <br>
      <h2 style="color: #0A4C0A;" class="text-center">There is an urgent need for Singaporeans<br>to be more Recycle Conscious.</h2>
      <div class="row align-items-center">
        <div class="col text-right">
          <img id="landfill" src="https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2020/04/Webp.net-resizeimage-75.jpg">
        </div>
        <div class="col text-left">
          <h5 id="landfillText">Singapore's only landfill, Semakau landfill is projected to be fully filled by 2035% at the current rates of wastes disposal.<br><br>
          Recycling is the best way for us to reduce our wastes disposal, to ensure a more sustainable living for the future generations.</h5>
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

.col-md-4 {
  background-color: #E3E9BB;
}

.num {
  font-size: 80px;
  color: #5C7F42;
}

.num1 {

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