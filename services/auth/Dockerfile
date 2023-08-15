# Build Image
FROM node:lts-alpine
WORKDIR /tmp
COPY .packages /tmp/packages
RUN npm install --global /tmp/packages/*
RUN rm -rf /tmp/packages
 
RUN apk add dumb-init openldap-clients
WORKDIR /app
RUN mkdir db
RUN chown node:node /app/*
USER node

ENV NODE_ENV production
ENV PORT 3000
ENV DB_TYPE sqlite
ENV DB_DATABASE db/auth.db
EXPOSE 3000/tcp
CMD ["dumb-init", "crosslab-auth-service"]