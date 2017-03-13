# 2nft

web application to let you translate your legacy rules to [nftables][0] via
iptables-translate. If you are interested in how the application is structured
there is more information in [Design](./DESIGN.md).

## Install

You have two options using Docker or npm.

### [npm](https://www.npmjs.com/)

    make iptables
    make setup
    make serve

### [Docker](https://www.docker.com/)

    docker run -dit -p 3000:3000 alemayhu/2nft

Application should be running on `http://localhost:3000`.

## Bugs
    
The install instructions should work on a Debian Jessie or Fedora 25 install.
If that's not the case please create a
[issue](https://github.com/alemayhu/2nft/issues). If you have found a critical
issue (security), please send me a private [email](mailto:a@alemayhu.com) so it
can be addressed.

Thanks.

[0]: https://netfilter.org/projects/nftables/
