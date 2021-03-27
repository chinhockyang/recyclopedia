<template>
  <div>
    <div id="intro">
    <img id="bin" src="https://cna-sg-res.cloudinary.com/image/upload/q_auto,f_auto/image/11788916/16x9/991/557/ffa8cd77c4937126f0956fb24cbcc7bc/nL/waste-singapore---2195670--1-.png">
    <div id="para1">
    <h1 style="color: #0A4C0A;">Are we truly Recycling Conscious?</h1>
    <p>Does this clutter look familiar to you?</p>
    <p>Despite campaigns and efforts made in raising the awareness of Singaporeans towards recycling, most people will likely find the recycling bin here to be a common sight.</p>
    <p>Furthermore, even with falling waste generation, Singapore's domestic recycling rates fell from 22% in 2018 to 17% in 2019.</p>
    <p>This reflects a severe lack of recycling knowledge and efforts among Singaporeans and Recyclopedia is here to help.</p> 
    </div>
    </div>
    <h3 class="text-center" style="color: #0A4C0A">According to a study conducted by SEC in 2018,</h3>
    <div class="container h-1000">
    <div class="row justify-content-center text-center h-100">
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
    </div>
    </div>
  </div>

</template>

<script>

export default {
  components: {
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
  padding-top: 75px;
  width: 800px;
}

.col-md-4 {
  background-color: #E3E9BB;
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