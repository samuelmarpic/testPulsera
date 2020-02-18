const express = require('express');
const app = express();
const blinkstick = require('blinkstick');
var modelo=require("./modelo.js");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

var sistema=new modelo.Sistema();


var led = blinkstick.findFirst();

led.setColor('red', function() {
  led.pulse('blue');
});

app.post("/anotarPulsacion", function(request,response){
    console.log(request.body);
    sistema.anotarPulsacion(request.body, function(res){
		response.send(res);
	});
});
// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});