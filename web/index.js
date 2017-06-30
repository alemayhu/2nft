var pjson = require('./package.json');
var express = require('express');
var app = express();

app.use(express.static('public'))

app.get('/version', function(req, res){
  res.send(pjson.version);
});

app.get('*', function(req, res) {
      res.redirect('/');
});

app.listen(3000);
