if [ "$ENV" == "DEV" ]; then 
    npm ci
    npm run build
else
    npm ci
    npm run build
    npm ci --omit=dev
fi