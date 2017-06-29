FROM ubuntu

ENV IPTABLES_INSTALLER /tmp/Scripts/nft-dev
ENV APP_DIR $HOME/opt/og/src/github.com/alemayhu/2nft/cli-server
ENV GOPATH "$HOME"/opt/og
ADD . $APP_DIR

RUN apt-get update && \
apt-get install -y golang git sudo && \
git clone https://github.com/scanf/Scripts /tmp/Scripts && \
$IPTABLES_INSTALLER prepare && \
$IPTABLES_INSTALLER  && \
$IPTABLES_INSTALLER  && \
make -C $HOME/src/netfilter.org/*/ clean && \
make -C $APP_DIR && \
mv $APP_DIR/cli-server /srv/server && \
rm -rvf $HOME/opt && \
apt-get clean && \
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

EXPOSE 8089
CMD ["/srv/server"]
