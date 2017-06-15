# Builds a Docker to deliver dist/
FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build:prod

EXPOSE 8080

CMD ["npm", "start"]
CMD ["npm", "run", "server:prod"]
