FROM node:14
# node:alpine-14

# Create dir for app and node_modules and give perm to user node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

# Switch to user node
USER node
RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node --es-module-specifier-resolution=node", "server.js" ]
