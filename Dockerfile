FROM node:14-alpine

WORKDIR /usr/frontend

COPY package.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production

RUN npm run build

CMD [ "npm", "start" ]
