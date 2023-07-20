const express = require('express')
const https = require('https');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (request, response) => {
  response.sendFile(__dirname+ "/index.html")
})


app.post('/', (request, response) => {
  var cityName = request.body.cityname;
  const apiKey = "875ac4897288ca4ea20aed5db3c6f970";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=" +apiKey +"&units=metric"; 
  https.get(url, function(res){
    res.on("data",function(data){
      console.log(data)
       var weatherinfo  = JSON.parse(data);
       console.log(weatherinfo);
       var weather = weatherinfo.weather[0].main;
       var temp = weatherinfo.main.temp;
       var place = weatherinfo.name;
       var icon = weatherinfo.weather[0].icon;
       var imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
       response.write("<h1> The weather in "+place+ " is " + weather);
       response.write(" and the temperature is "+ temp + " degree Celsius <br>");
       response.write("<img src = " + imageURL+">");
       response.send();
    })
})
})
app.listen(3000)