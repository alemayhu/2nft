FROM node

ENV START_SCRIPT "/srv/start.bash"
ENV PKG_CONFIG_PATH "/usr/local/lib/pkgconfig"
ENV NFT_DEV "/tmp/Scripts/nft-dev"
ENV APP_DIR "/srv/2nft"
ENV WEB_USER "tester"

RUN apt-get update
RUN apt-get install -y pkg-config git sudo

RUN git clone https://github.com/scanf/Scripts /tmp/Scripts

# First install all the dependencies for nftables and friends.
# Second run clone all the code
# Third run compile and install all
RUN $NFT_DEV prepare && $NFT_DEV && $NFT_DEV

RUN mkdir $APP_DIR
WORKDIR $APP_DIR

COPY package.json $APP_DIR/package.json
COPY index.js $APP_DIR/index.js
COPY public $APP_DIR/public
COPY scripts/unprivileged.bash $START_SCRIPT

RUN npm install

RUN mkdir /home/$WEB_USER

RUN useradd -M $WEB_USER
RUN usermod -L $WEB_USER

RUN chown -R $WEB_USER:$WEB_USER /home/$WEB_USER
RUN chown -R $WEB_USER:$WEB_USER $APP_DIR

EXPOSE 3000
CMD ["/bin/bash", $START_SCRIPT]
