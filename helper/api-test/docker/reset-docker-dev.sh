npm run stop-docker
docker volume rm $(docker volume ls -f 'name=crosslab_' --format '{{.Name}}')