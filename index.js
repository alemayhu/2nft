var express = require('express');
var cmd = require('node-cmd');

var app = express();

app.use(express.static('public'))

app.post('/translate', function (req, res) {
  console.log(res);
  res.send(req);
});

app.get('/version', function(req, res){
  cmd.get('iptables-translate --version', function(data) {
    res.send(data);
  });
});

app.listen(3000);
