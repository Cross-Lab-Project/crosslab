# Build Image
FROM node:latest AS build
WORKDIR /app
COPY . /app/
RUN npm ci
RUN npm run build

# Production image
FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf.template /etc/nginx/templates/