FROM node

ENV APP_DIR "/srv/2nft"

RUN mkdir $APP_DIR
WORKDIR $APP_DIR

COPY package.json $APP_DIR/package.json
COPY index.js $APP_DIR/index.js
COPY public $APP_DIR/public

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
