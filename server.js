var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mysql = require('mysql');

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;


var con = mysql.createConnection({
  host: "databases.000webhost.com",
  user: "id2091182_test2",
  password: "123456",
  database: "id2091182_test1"
});

con.connect(function(err) {
  if (err) {
    console.log("ERROR: " + err);
  }
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/test", function(req, res) {
  con.query("SELECT * FROM main", function (err, result, fields) {
    if (err) throw err;
    res.status(200).json(result);
  });
});