var bodyParser = require('body-parser');
var express = require('express');
var execSync = require('child_process').execSync;
var crypto = require('crypto');
var fs = require('fs');

var app = express();

app.use(express.static('public'))
app.use(bodyParser.json());

var a_log = function(output) {
  console.log(new Date()+" "+output);
}

var convert = function(rules, debug) {
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
    rule = rule.match(/[A-Za-z-_0-9\:\,\.\!\S+\s+/]/g).join("");

    var translate_cmd = "exec iptables-translate "+rule;
    if (debug) {
      new_rules += "$ "+translate_cmd+"\n";
    }
    a_log(translate_cmd);
    try {
      new_rules += execSync(translate_cmd);
    } catch (e) {
      if (debug) {
        new_rules += "# "+e.message.split('\n').join(" ")+"\n";
        continue;
      }
      new_rules += "# 🚧 "+rule+"\n";
    }
  }
  return new_rules;
};

app.post('/translate', function (req, res) {
  var data = req.body.old_rules;
  var hash = crypto.createHash('md5').update(data).digest("hex");
  var old_rules = data.split("\n");
  var path = "/tmp/"+hash+".txt";

  if (fs.existsSync(path)) {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) { // Fall back to no cache
	a_log(err);
	res.send(convert(old_rules, req.body.is_debug));
	return ;
      }
      res.send(data);
      return ;
    });
  } else {
    var new_rules = convert(old_rules, req.body.is_debug)
      fs.writeFile(path, new_rules, function(err) {
	if (err) {
	  a_log(err);
	}
      });
    res.send(new_rules);
  }
});

app.get('/version', function(req, res){
  var iptables_version = execSync('git -C ~/src/netfilter.org/iptables describe');
  res.send(iptables_version);
});

app.get('/help', function(req, res){
  var iptables_help = execSync('iptables-translate --help');
  res.send("<pre>"+iptables_help+"</pre>");
});

app.get('/werbinich', function(req, res){
  var whoami = execSync('whoami');
  res.send("<pre>"+whoami+"</pre>");
});

app.get('*', function(req, res) {
      res.redirect('/');
});

app.listen(3000);
