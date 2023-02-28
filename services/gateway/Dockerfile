FROM nginx
COPY conf/ /etc/nginx/templates
RUN rm /docker-entrypoint.d/20-envsubst-on-templates.sh
COPY create_config.sh /docker-entrypoint.d/20-create_config.sh