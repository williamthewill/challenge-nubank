FROM node:11.14.0

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm test
CMD node src/index.js