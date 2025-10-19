# Dockerfile.dev
FROM node:22 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update

RUN apt-get install -y git

RUN  apt-get install -y zsh


RUN npm install -g @angular/cli

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start:dev"]