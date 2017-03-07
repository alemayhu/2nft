var bodyParser = require('body-parser');
var express = require('express');
var execSync = require('child_process').execSync;

var app = express();

app.use(express.static('public'))
app.use(bodyParser.json());

app.post('/translate', function (req, res) {
  var rules = req.body.old_rules.replace("iptables", "").split("\n");
  var new_rules = '';
  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];
    var translate_cmd = "iptables-translate "+rule;
    console.log(translate_cmd);
    new_rules += execSync(translate_cmd);
  }
  res.send(new_rules);
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
