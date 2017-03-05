var express = require('express');
var cmd = require('node-cmd');

var app = express();

app.get('/*', function(req, res){
  // FIXME: figure out how to run without root privileges
  cmd.get('sudo nft export json', function(data) {
    res.json(JSON.parse(data));
  });
});

app.listen(3000);
