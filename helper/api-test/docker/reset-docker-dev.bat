npm run stop-docker &&^
for /f "delims=" %%i in ('docker volume ls -f "name=crosslab_" --format "{{.Name}}"') do docker volume rm %%i