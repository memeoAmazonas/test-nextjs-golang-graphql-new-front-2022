FROM node:14-alpine

WORKDIR /usr/frontend

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production

RUN npm run build

CMD [ "npm", "start" ]
