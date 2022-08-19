
envsubst < $(dirname "$0")/docker-compose_goldi.yml > $(dirname "$0")/tmp.yml
scp $(dirname "$0")/tmp.yml $DEPLOY_SERVER:$DEPLOY_DIR/docker-compose.yml
ssh $DEPLOY_SERVER "cd $DEPLOY_DIR && docker-compose down && docker-compose pull && docker-compose up -d"
