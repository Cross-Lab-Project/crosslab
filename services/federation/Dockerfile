# Build Image
FROM node:lts-alpine AS build
WORKDIR /tmp
COPY .packages /tmp/packages
RUN npm install --global /tmp/packages/*
RUN rm -rf /tmp/packages

RUN apk add dumb-init
WORKDIR /app
RUN mkdir db
RUN chown node:node /app/*
USER node

ENV NODE_ENV production
ENV PORT 3003
ENV DB_TYPE sqlite
ENV DB_DATABASE db/federation.db
EXPOSE 3003/tcp
CMD ["dumb-init", "crosslab-federation-service"]