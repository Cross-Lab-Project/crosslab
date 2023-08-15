# Build Image
FROM node:lts-alpine
WORKDIR /tmp
COPY .packages /tmp/packages
RUN npm install --global /tmp/packages/*
RUN rm -rf /tmp/packages
 
RUN apk add dumb-init curl
WORKDIR /app
RUN mkdir db
RUN chown node:node /app/*

RUN curl -L -o /usr/bin/opa https://openpolicyagent.org/downloads/v0.54.0/opa_linux_amd64_static && chmod 755 /usr/bin/opa
RUN curl -L https://github.com/openfga/openfga/releases/download/v1.2.0/openfga_1.2.0_linux_amd64.tar.gz | tar -xz -C /opt/ && chmod 755 /opt/openfga && ln -s /opt/openfga /usr/bin/openfga
USER node

COPY policy /app/policy
COPY relation_model.fga /app/relation_model.fga

ENV NODE_ENV production
ENV PORT 3010
ENV DB_TYPE sqlite
ENV DB_DATABASE db/auth.db
EXPOSE 3010/tcp
CMD ["dumb-init", "crosslab-authorization-service"]