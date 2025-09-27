FROM node:lts-alpine

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache openssl

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "start"]