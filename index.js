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

var local_filename = function(hash) {
  return "/tmp/"+hash+".txt";
}

var convert = function(data, debug) {
  var rules = data.replace("\\\n", " ").split("\n");
  var new_rules = '';
  var ignore_prefixes = [
    "# iptables ",
    "ip6tables-translate",
    "iptables"
  ];
  var allow_error = [
    "Translation not implemented",
  ];

  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];

    for (var j in ignore_prefixes) {
      var prefix = ignore_prefixes[j];
      if (rule.startsWith(prefix)) {
        rule = rule.replace(prefix, "");
      }
    }

    /* Keep comments
     */
    if (rule.startsWith("#")) {
      new_rules += rule+"\n";
      continue;
    }

    /* Not translating empty lines, but preserve them in case user wants to do
     * some kind of grouping.
     */
    if (!rule || rule.trim().length == 0) {
      new_rules += "\n";
      continue;
    }

    rule = rule.match(/[A-Za-z-_0-9\:\,\.\!\S+\s+/]/g).join("");

    var translate_cmd = "exec iptables-translate "+rule;
    a_log(translate_cmd);
    try {
      new_rules += execSync(translate_cmd);
    } catch (e) {
      var err_msg = e.message;
      if (debug || err_msg.indexOf(allow_error[0]) != -1) {
        new_rules += "# "+err_msg.split('\n').join(" ")+"\n";
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
  var path = local_filename(hash);

  if (fs.existsSync(path)) {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) { // Fall back to no cache
	a_log(err);
	res.send(
	    {id: hash,
	      rules: convert(data, req.body.is_debug)});
	return ;
      }
      res.send({id: hash, rules: data});
      return ;
    });
  } else {
    var new_rules = convert(data, req.body.is_debug)
      fs.writeFile(path, new_rules, function(err) {
	if (err) {
	  a_log(err);
	}
      });
    res.send({id: hash, rules: new_rules});
  }
});

app.get('/download/:hash', function (req, res) {
  var hash = req.params.hash;
  var path = local_filename(hash);

  if (!hash.match("[a-fA-F0-9]{32}") || !fs.existsSync(path)) {
      a_log("invalid  download  request, redirect to  help for "+hash);
      res.redirect('/help');
      return ;
  }
  a_log("download request for "+path);
  res.download(path);
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
