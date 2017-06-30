FROM alemayhu/iptables-docker

ENV APP_DIR $HOME/opt/og/src/github.com/alemayhu/2nft/cli-server
ENV GOPATH "$HOME"/opt/og
ADD . $APP_DIR

RUN apt-get update && \
apt-get install -y golang git sudo && \
make -C $APP_DIR && \
mv $APP_DIR/cli-server /srv/server && \
rm -rvf $HOME/opt && \
apt-get clean && \
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

EXPOSE 8089
CMD ["/srv/server"]
