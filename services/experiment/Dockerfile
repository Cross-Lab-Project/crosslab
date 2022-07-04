# Build Image
FROM node:latest AS build
WORKDIR /app
COPY . /app/
RUN npm ci
RUN npm run build
RUN npm ci --only=production
 
# Production Image
FROM node:lts-alpine
RUN apk add dumb-init
ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080/tcp
USER node
WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build ./app/dist /app/dist
CMD ["dumb-init", "node", "dist/index.js"]