# Build Image
FROM node:lts-alpine
WORKDIR /tmp
COPY .packages /tmp/packages
RUN npm install --global /tmp/packages/*
RUN rm -rf /tmp/packages

COPY assets /app/assets
RUN apk add dumb-init curl
ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080/tcp
WORKDIR /app
RUN mkdir db
RUN chown node:node /app/*

# delete express cookie module, so it will use the one from lti (0.6.0)
RUN rm -rf /usr/local/lib/node_modules/@crosslab/lti/node_modules/express/node_modules/cookie

USER node

CMD ["dumb-init", "crosslab-lti-service"]