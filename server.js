var express = require("express");
var algoliasearch = require('algoliasearch');
var path = require("path");
var bodyParser = require("body-parser");
var client = algoliasearch("KAGOUUA6K6", "976c775b30466d62136f2c8942416e8e");
var http = require("https");
var AWS = require("aws-sdk");

AWS.config.update({
	region: "us-west-1",
	endpoint: "https://dynamodb.us-west-1.amazonaws.com",
	accessKeyId: "AKIAIDJDG54MTQG6GIHQ",
	secretAccessKey: "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"
});

var docClient = new AWS.DynamoDB.DocumentClient();

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

app.get("/test", function(req, res) {
	var params = {
		TableName: "test",
		Key:{
			"id": parseInt(req.query.id)
		}
	};

	docClient.get(params, function(err, data) {
		if (err) {
			console.log("Unable to read item. Error JSON:"+ JSON.stringify(err));
			res.status(200).send({
				"error":true
			});
		} else {
			console.log("GetItem succeeded:"+ JSON.stringify(data));
			res.status(200).send(data);
		}
	});
});


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({"error": message});
}