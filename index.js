var execSync = require('child_process').execSync;
var bodyParser = require('body-parser');
var pjson = require('./package.json');
var express = require('express');
var crypto = require('crypto');
var fs = require('fs');
var app = express();

app.use(express.static('public'))
app.use(bodyParser.json());

var a_log = function(output) {
  console.log(new Date()+" "+output);
}

var local_filename = function(hash) {
  var dir = app.get('STORAGE_DIR') || "/tmp";
  return dir+"/"+hash+".txt";
}

var convert = function(data, debug) {
  var ignore_prefixes = [ "iptables", "ip6tables" ];
  var rules = data.replace(/\\\n/g, " ").split("\n");
  var new_rules = '';

  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];

    for (var j in ignore_prefixes) {
      var prefix = ignore_prefixes[j];

      rule = rule.replace(prefix+"-translate", "");
      rule = rule.replace("# "+prefix, "");
      rule = rule.replace(prefix, "");
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

    rule = rule.match(/[A-Za-z-_0-9:,."!\s+/]/g).join("");

    var translate_cmd = "exec iptables-translate "+rule;
    a_log(translate_cmd);
    try {
      new_rules += execSync(translate_cmd);
    } catch (e) {
      var err_msg = e.message.replace("Command failed: exec ", "");
      err_msg = err_msg.replace("Try `iptables-translate -h' or 'iptables-translate --help' for more information.", "");
      new_rules += "# "+err_msg.split('\n').join(" ")+"\n";
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

app.get('/app_version', function(req, res){
  res.send(pjson.version);
});

app.get('/version', function(req, res){
  var iptables_version = execSync('git -C netfilter.org/iptables describe');
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
