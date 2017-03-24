# 2nft

web application to let you translate your legacy rules to [nftables][0] via
iptables-translate. If you are interested in how the application is structured
there is more information in [Design](./DESIGN.md).

## Demo

The latest version should be running on
[2nft.alemayhu.com](https://2nft.alemayhu.com/), but if you are stuck with a
redirect try [dokku.alemayhu.com](http://dokku.alemayhu.com/).

## Install

You have two options using Docker or npm.

### [npm](https://www.npmjs.com/)

    make iptables
    make setup
    make serve

### [Docker](https://www.docker.com/)

    port=3000 make_docker_run

Application should be running on `http://localhost:3000`.

## Bugs
    
The install instructions should work on a Debian Jessie or Fedora 25 install.
If that's not the case please create a
[issue](https://github.com/alemayhu/2nft/issues). If you have found a critical
issue (security), please send me a private [email](mailto:a@alemayhu.com) so it
can be addressed.

Thanks.

[0]: https://netfilter.org/projects/nftables/
