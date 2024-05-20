FROM node:20.10.0

COPY ../ /wetherService/

WORKDIR /wetherService

RUN npm i
RUN npm run build_swagger
RUN npm run build_client

ENTRYPOINT ["node", "./src/frameworks/index.js"]

EXPOSE 8080