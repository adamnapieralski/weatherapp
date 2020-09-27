FROM node:12.18.4-alpine

# Create app directory
WORKDIR /usr/src/weatherapp/backend

# Install app dependencies
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 9000
CMD [ "npm", "start" ]