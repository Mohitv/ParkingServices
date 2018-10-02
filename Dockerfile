# escape=`
FROM microsoft/nanoserver

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 8080

CMD ["npm","start"]