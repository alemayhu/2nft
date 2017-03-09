# 2nft

web application to let you translate your legacy rules to [nftables][0] via
iptables-translate.

## Install

You have two options using Docker or npm.

### [npm](https://www.npmjs.com/)

    make setup
    make serve

### [Docker](https://www.docker.com/)

    docker run -dit -p 8080:3000 alemayhu/2nft

[0]: https://netfilter.org/projects/nftables/
