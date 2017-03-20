FROM node

ENV PKG_CONFIG_PATH "/usr/local/lib/pkgconfig"
ENV APP_DIR "/srv/2nft"
ENV NETFILTER_DIR "$APP_DIR/netfilter.org"
ENV GIT_BASE_URL "git://git.netfilter.org"

ENV WEB_USER "tester"
ENV WEB_USER_HOME "/home/$WEB_USER"

# Install all the dependencies for nftables and friends.
RUN apt-get update && apt-get install --no-install-recommends -y pkg-config \
docbook2x docbook-utils libgmp-dev libreadline-dev autoconf build-essential \
gcc make autoconf automake libjansson-dev pkg-config zlib1g-dev curl libtool \
docbook2x docbook-utils bison flex && apt-get clean &&\
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Create the application directory
RUN mkdir $APP_DIR
WORKDIR $APP_DIR

# Create user to run application and fix the permissions
RUN useradd -M $WEB_USER
RUN usermod -L $WEB_USER
RUN mkdir $WEB_USER_HOME
RUN chown -R $WEB_USER:$WEB_USER $APP_DIR
RUN chown -R $WEB_USER:$WEB_USER $WEB_USER_HOME

# Clone, compile and install all the projects.
USER $WEB_USER
RUN git clone $GIT_BASE_URL/libmnl $NETFILTER_DIR/libmnl &&\
      cd $NETFILTER_DIR/libmnl/ && sh autogen.sh  && ./configure &&\
      make
USER root
RUN make -C $NETFILTER_DIR/libmnl install

USER $WEB_USER
RUN git clone $GIT_BASE_URL/libnftnl $NETFILTER_DIR/libnftnl &&\
      cd $NETFILTER_DIR/libnftnl/ && sh autogen.sh &&\
      ./configure --with-json-parsing && make
USER root
RUN make -C $NETFILTER_DIR/libnftnl install

USER $WEB_USER
RUN git clone $GIT_BASE_URL/nftables $NETFILTER_DIR/nftables &&\
      cd $NETFILTER_DIR/nftables && sh autogen.sh && ./configure && make
USER root
RUN make -C $NETFILTER_DIR/nftables install

USER $WEB_USER
RUN git clone $GIT_BASE_URL/iptables $NETFILTER_DIR/iptables &&\
cd $NETFILTER_DIR/iptables && sh autogen.sh && ./configure && make
USER root
RUN make -C $NETFILTER_DIR/iptables install

USER $WEB_USER
# Copy required source
ADD CHECKS /app/CHECKS
COPY package.json $APP_DIR/package.json
COPY index.js $APP_DIR/index.js
COPY public $APP_DIR/public

# Install the application dependencies
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
