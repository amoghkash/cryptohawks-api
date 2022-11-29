FROM node:latest
WORKDIR /app
COPY package.json .
COPY .env .
RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --production; \
        fi

COPY . ./
EXPOSE $PORT
CMD ["npm", "start"]