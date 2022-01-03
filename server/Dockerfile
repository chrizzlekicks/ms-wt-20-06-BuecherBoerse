FROM node:16.13-alpine3.14 as Dev

# Create dir for app and node_modules and give perm to user node
RUN mkdir -p /backend/node_modules && chown -R node:node /backend
WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]
