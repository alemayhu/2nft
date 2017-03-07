var bodyParser = require('body-parser');
var express = require('express');
var execSync = require('child_process').execSync;

var app = express();

app.use(express.static('public'))
app.use(bodyParser.json());

app.post('/translate', function (req, res) {
  var rules = req.body.old_rules.split("\n");
  var new_rules = '';
  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i].replace("iptables", "");
    var translate_cmd = "iptables-translate "+rule;
    console.log(translate_cmd);
    try {
      new_rules += execSync(translate_cmd);
    } catch (e) {
      new_rules += "# "+e.message.split('\n').join(" ");
    }
  }
  res.send(new_rules);
});

app.get('/version', function(req, res){
  var iptables_version = execSync('iptables-translate --version');
  res.send(iptables_version);
});

app.get('/help', function(req, res){
  var iptables_help = execSync('iptables-translate --help');
  res.send("<pre>"+iptables_help+"</pre>");
});

app.listen(3000);
