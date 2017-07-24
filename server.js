var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

// index page 
app.get('/', function(req, res) {
  var result=[];
  for (i=0;i<5;i++) {
    result.push("Tab "+(i+1));
  }
    res.render('index', {
      menus:result
    });
});