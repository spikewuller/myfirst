var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var pg = require('pg');

var app = express();
var db;
app.use(bodyParser.json());

pg.defaults.ssl = true;
pg.connect("postgres://waqhgtugfchdlz:c9d5e8253f1538c02ace6eb09f81630e7265b6d4cccdd6fde63591e20fec0cf2@ec2-23-23-244-83.compute-1.amazonaws.com:5432/d7bbbr40atd4eg", function(err, client) {
  if (err) {
    console.log(err);
    return;
  }
  db=client;
  console.log('Connected to postgres! Getting schemas...');

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
  db
    .query("CREATE TABLE info(id serial PRIMARY KEY,name VARCHAR (50) UNIQUE NOT NULL);")
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

app.post("/insert", function(req, res) {
  db.query("INSERT INTO info (id, name) VALUES ("+req.body.id+",'"+req.body.name+"');", function(err, results) {
          if (err) {
            console.log(err);
            return;
          }
          res.status(200).send("success");
        });
});


app.get("/info", function(req, res) {
  db.query("SELECT * FROM info;", function(err, results) {
          if (err) {
            console.log(err);
            return;
          }
          res.status(200).send(results);
        });
});