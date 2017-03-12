## Design

2nft consists of three parts. The user facing part is a [Angular][a]
application. The Angular app communicates with a server running a small HTTP
API. The couple of methods implemented are described in the API section.

If you are not familiar with JavaScript, the server component here is a
[Node.js][n] application. The server has three dependencies [Express][e],
[body-parser][b] and [nodeman][no]. Express is the main framework used to
develop the server and body-parser basically extends it so that we can handle
incoming requests by parsing the `.body`. nodemon is just a local dependency
meant for local development.  The exact versions are available in the
[package.json](./package.json).

### API

The server consists of four GET and one POST methods.

- POST `/translate` - runs `iptables-translate <input>` returns new rules and
  hash which can be used for downloading the file.
- GET  `/download/:hash` - sends the file if it exists or redirects to `/help`.
- GET  `/version` - returns iptables revision from git output.
- GET  `/help` - returns `iptables-translate --help` output.
- GET  `/werbinich` - returns `whoami` output.

As you might have guessed, the third part is forwarding all the rules to
[iptables-translate][i].  The server uses a child process to execute to
`iptables-translate` with the POSTed values. Some input sanitizing is applied to
prevent the user from abusing the system.

[a]: https://angularjs.org/
[e]: https://expressjs.com/ 
[i]: http://git.netfilter.org/iptables/tree/ 
[n]: https://nodejs.org/en/
[b]: https://github.com/expressjs/body-parser
[no]: https://github.com/remy/nodemon
