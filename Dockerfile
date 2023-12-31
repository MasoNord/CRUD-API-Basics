FROM node:18.16.0-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
