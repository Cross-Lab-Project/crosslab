scp $(dirname "$0")/docker-compose.yml $DEPLOY_SERVER:$DEPLOY_DIR/docker-compose.yml
ssh $DEPLOY_SERVER "cd $DEPLOY_DIR && docker-compose pull && docker-compose up -d"