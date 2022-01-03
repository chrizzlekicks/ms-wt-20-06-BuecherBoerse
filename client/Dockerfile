# Create the Dev environment to work on the application
FROM node:16.13-alpine3.14 as Dev

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]