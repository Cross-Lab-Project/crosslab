# Build Image
FROM node:lts-alpine
WORKDIR /tmp
COPY .packages /tmp/packages
RUN npm install --global /tmp/packages/*
RUN rm -rf /tmp/packages
 
RUN apk add dumb-init openldap-clients
ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080/tcp
WORKDIR /app
RUN mkdir db
RUN chown node:node /app/*
USER node
CMD ["dumb-init", "crosslab-auth-service"]