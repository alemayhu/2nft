FROM node

ENV PKG_CONFIG_PATH "/usr/local/lib/pkgconfig"
ENV NFT_DEV "/tmp/Scripts/nft-dev"
ENV APP_DIR "/srv/2nft"
ENV WEB_USER "tester"
ENV WEB_USER_HOME "/home/$WEB_USER"

RUN apt-get update
RUN apt-get install -y pkg-config git sudo

# Get helper script which helps pull in iptables
RUN git clone https://github.com/scanf/Scripts /tmp/Scripts

# First install all the dependencies for nftables and friends. Second run clone
# all the code Third run compile and install all
RUN $NFT_DEV prepare && $NFT_DEV && $NFT_DEV

# Create the application directory
RUN mkdir $APP_DIR
WORKDIR $APP_DIR

# Copy required source
COPY package.json $APP_DIR/package.json
COPY index.js $APP_DIR/index.js
COPY public $APP_DIR/public

# Install the application dependencies
RUN npm install

# Create user to run application
RUN mkdir $WEB_USER_HOME
RUN useradd -M $WEB_USER
RUN usermod -L $WEB_USER

# Fix the permissions
RUN mv ~/src/netfilter.org $APP_DIR/netfilter.org
RUN chown -R $WEB_USER:$WEB_USER $WEB_USER_HOME
RUN chown -R $WEB_USER:$WEB_USER $APP_DIR

EXPOSE 3000

USER $WEB_USER
CMD ["npm", "start"]
