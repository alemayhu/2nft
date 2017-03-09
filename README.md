# 2nft

web application to let you translate your legacy rules to [nftables][0] via
iptables-translate.

## Install

You have two options using Docker or npm.

### [npm](https://www.npmjs.com/)

    make iptables
    make setup
    make serve

### [Docker](https://www.docker.com/)

    docker run -dit -p 8080:3000 alemayhu/2nft

## Bugs
    
The install instructions should work on a Debian Jessie or Fedora 25 install.
If that's not the case please create a
[issue][https://github.com/alemayhu/2nft/issues]. If you have found a critical
issue (security), please send me a private [email][mailto:a@alemayhu.com] so it
can be addressed.

[0]: https://netfilter.org/projects/nftables/
