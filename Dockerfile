# escape=`
FROM node:8

WORKDIR /app

COPY package.json /app

RUN npm install

# Bundle app source
COPY . /app

EXPOSE 8080

CMD ["npm","start"]
