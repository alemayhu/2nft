FROM node

ENV APP_DIR "/srv/2nft"

RUN mkdir $APP_DIR
WORKDIR $APP_DIR

COPY package.json $APP_DIR
COPY index.js $APP_DIR
COPY public $APP_DIR

RUN npm install

EXPOSE 8080
CMD ["npm", "start"]
