FROM node

ENV APP_DIR "/srv/2nft"
ENV WEB_USER "tester"
ENV WEB_USER_HOME "/home/$WEB_USER"

# Install all the dependencies for nftables and friends.
RUN apt-get update && apt-get install --no-install-recommends -y npm authbind && \
      touch /etc/authbind/byport/80  && chmod 777 /etc/authbind/byport/80 && \
      apt-get purge -y npm && apt-get clean && \
      rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Create the application directory
RUN mkdir $APP_DIR
WORKDIR $APP_DIR

# Create user to run application and fix the permissions
RUN useradd -M $WEB_USER && \
usermod -L $WEB_USER && \
mkdir $WEB_USER_HOME && \
chown -R $WEB_USER:$WEB_USER $APP_DIR && \
chown -R $WEB_USER:$WEB_USER $WEB_USER_HOME

USER $WEB_USER
# Copy required source
#ADD CHECKS /app/CHECKS
COPY package.json $APP_DIR/package.json
COPY index.js $APP_DIR/index.js
COPY public $APP_DIR/public

# Install the application dependencies
RUN npm install

EXPOSE 80
CMD ["authbind", "--deep", "npm", "start"]
