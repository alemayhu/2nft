var bodyParser = require('body-parser');
var express = require('express');
var cmd = require('node-cmd');

var app = express();

app.use(express.static('public'))
app.use(bodyParser.json());

app.post('/translate', function (req, res) {
  var rule = req.body.old_rules.replace("iptables ", "");
  var translate_cmd = "iptables-translate "+rule;

  console.log(translate_cmd);
  cmd.get(translate_cmd, function(data) {
    console.log(data);
    res.send(data);
  });
});

app.get('/version', function(req, res){
  cmd.get('iptables-translate --version', function(data) {
    res.send(data);
  });
});

app.get('/help', function(req, res){
  cmd.get('iptables-translate --help', function(data) {
    res.send("<pre>"+data+"</pre>");
  });
});

app.listen(3000);
