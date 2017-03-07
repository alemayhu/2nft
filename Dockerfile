FROM node

ENV PKG_CONFIG_PATH "/usr/local/lib/pkgconfig"
ENV NFT_DEV "/tmp/Scripts/nft-dev"
ENV APP_DIR "/srv/2nft"

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

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
