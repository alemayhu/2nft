var bodyParser = require('body-parser');
var express = require('express');
var execSync = require('child_process').execSync;

var app = express();

app.use(express.static('public'))
app.use(bodyParser.json());

var convert = function(rules, debug = false) {
  var new_rules = '';
  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];
    if (rule.startsWith("##")) { continue;
      // assume this is comment.
      // TODO: also handle single comment
    }

    rule = rule.replace("# ", "").replace("iptables", "").replace("sudo", "");
    if (!rule || rule.trim().length == 0) { continue;
      // We are skipping emtpy lines
    }
    var translate_cmd = "iptables-translate "+rule;
    if (debug) {
      new_rules += "$ "+translate_cmd+"\n";
    }
    console.log(translate_cmd);
    try {
      new_rules += execSync(translate_cmd);
    } catch (e) {
      new_rules += "# "+e.message.split('\n').join(" ")+"\n";
    }
  }
  return new_rules;
};

app.post('/translate', function (req, res) {
  var rules = req.body.old_rules.split("\n");
  res.send(convert(rules, req.body.is_debug));
});

app.get('/version', function(req, res){
  var iptables_version = execSync('git -C ~/src/netfilter.org/iptables describe');
  res.send(iptables_version);
});

app.get('/help', function(req, res){
  var iptables_help = execSync('iptables-translate --help');
  res.send("<pre>"+iptables_help+"</pre>");
});

app.listen(3000);
