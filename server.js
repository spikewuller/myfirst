var express = require("express");
var algoliasearch = require('algoliasearch');
var path = require("path");
var bodyParser = require("body-parser");
var client = algoliasearch("KAGOUUA6K6", "976c775b30466d62136f2c8942416e8e");

var app = express();
app.use(bodyParser.json());

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

app.get("/test", function(req, res) {
  const index = client.initIndex("test1");
  index.search("", {
 "hitsPerPage": "10",
 "page": "0",
 "attributesToRetrieve": "*",
 "facets": "[]",
 "filters":"id:10 OR id:35"
}).then(responses => {
    // Response from Algolia:
    // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
    res.status(200).send(responses);
  });
});