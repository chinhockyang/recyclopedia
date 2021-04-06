var axios = require('axios');
var data = JSON.stringify({
  "email": "darrell.lai@gmail.com",
  "password": "3cyclopeDia"
});

var config = {
  method: 'post',
  url: 'https://developers.onemap.sg/privateapi/auth/post/getToken',
  headers: { 
    'Content-Type': 'application/json', 
    'Cookie': 'Domain=developers.onemap.sg; _toffuid=rB8E8GBTGToUh2HSFM2LAg==; onemap2=CgAACmBTGTqAQwWvCK6rAg=='
  },
  data : data
};

var token;
axios(config)
  .then(function (response) {
    const response_json = JSON.stringify(response.data);
    console.log('response_json: ' + response_json);
    token = response_json.access_token;
    console.log('access_token: ' + token)
  })
  .catch(function (error) {
    console.log(error);
  });

export default token;