var express = require("express");
var algoliasearch = require('algoliasearch');
var path = require("path");
var bodyParser = require("body-parser");
var client = algoliasearch("KAGOUUA6K6", "976c775b30466d62136f2c8942416e8e");
var http = require("https");

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

app.get("/test", function(req, mainres) {

var options = {
  "method": "GET",
  "hostname": "slippore-staging.firebaseapp.com",
  "port": null,
  "path": "/api/v1/test",
  "headers": {
    
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
    mainres.status(200).send(JSON.parse(body.toString()));
  });
});

req.end();
});

// app.get("/test", function(req, res) {
//   const index = client.initIndex("test1");
//   index.search("", {
//  "hitsPerPage": "10",
//  "page": "0",
//  "attributesToRetrieve": "*",
//  "facets": "[]",
//  "filters":""
// }).then(responses => {
//     var hits=responses.hits;
//     var result=[];
//     for (var x in hits) {
//       var item=hits[x];
//       result.push({
//         "id":item.id,
//         "name":item.name,
//         "follow":item.follow
//       });
//     }
//     res.status(200).send(result);
//   });
// });