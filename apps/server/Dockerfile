FROM node:16-slim as BUILDER 

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN yarn install --ignore-platform

COPY . .

FROM node:16-alpine

ARG NODE_ENV

WORKDIR /usr/src/app

COPY --from=BUILDER /usr/src/app/ ./

EXPOSE 5001

CMD [ "yarn", "dev" ]