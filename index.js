var express = require('express');
var cmd = require('node-cmd');

var app = express();

app.use(express.static('public'))

app.post('/translate', function (req, res) {
  console.log(res);
  res.send(req);
});

app.get('/*', function(req, res){
  // FIXME: figure out how to run without root privileges
  cmd.get('x', function(data) {
    res.json(JSON.parse(data));
  });
});

app.listen(3000);
