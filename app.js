
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:false}))







app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html"); 
});


app.post("/",function(req,res){
    const query = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=809442a3a46ad6756b6dce0d8ecca697&units=metric";

    https.get(url,function(response){
        console.log(response.statusCode);
    
        response.on("data",function(data){
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const desc = weather.weather[0].description;
            
            const icon = weather.weather[0].icon;
            const iconUrl = " http://openweathermap.org/img/wn/"+icon+"@2x.png";
            
           
            res.write("<h1>The temperature in " +query+ " is " +temp+ " degree Celsius</h1>");
            res.write("<p>The weather is currently " +desc+ "</p>");
            res.write("<img src="+iconUrl+">");
            res.send()
        })
    })
})






app.listen(3000,function(){
    console.log("Server started at port 3000");
})