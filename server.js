var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/webhook", function(req, res) {
	console.log(req.query["hub.verify_token"]+" "+ req.query["hub.mode"]+" "+req.query["hub.challenge"]);
  if (req.query["hub.verify_token"]=="321321321" && req.query["hub.mode"]=="subscribe") {
  	res.send(req.query["hub.challenge"]);
  }
  else {
  	res.send("fail");
  }
});

app.post("/webhook", function(req, res) {
	// console.log(""+JSON.stringify(req.body));
	console.log("webhook here");
	res.status(200).send("success");
});