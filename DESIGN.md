# Design

2nft consists of three parts. The user facing part is a [Angular][a]
application. The Angular app communicates with a server running a small HTTP
API. The couple of HTTP methods implemented are described below.  If you are
not familiar with JavaScript, the server component here is a [Node.js][n]
application. The server has three dependencies express, body-parser and
nodeman. The two former ones are when running the server but the last one is
only meant for local development. The versions are available in the
[package.json][./package.json].



## API

The server consists of three GET and one POST methods.

- GET  `/version` - uses git to find iptables revision.
- GET  `/help` - runs `iptables-translate --help`
- GET  `/werbinich` runs `whoami`
- POST `/translate` - runs `iptables-translate <input>`

As you might have guessed, the third part is forwarding all the rules to
[iptables-translate][i].  The server uses a child process to execute to
`iptables-translate` with the POSTed values. Some input sanitizing is applied
to prevent the user from abusing the system.

[a]: https://angularjs.org/
[e]: https://expressjs.com/ 
[i]: http://git.netfilter.org/iptables/tree/ 
[n]: https://nodejs.org/en/
