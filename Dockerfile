FROM node:alpine
MAINTAINER daniel@lightfeather.io
EXPOSE 8080
WORKDIR /home/node
COPY package.json .
RUN npm install
RUN npm install -g @angular/cli
COPY *.js .
ENTRYPOINT ["node", "index.js"]
