#!/bin/sh

sudo service rabbitmq-server start
sudo service mariadb start
sudo mysql -e "DROP DATABASE IF EXISTS unittest;"
sudo mysql -e "CREATE DATABASE unittest DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "DROP USER IF EXISTS 'test'@localhost;"
sudo mysql -e "CREATE USER 'test'@localhost IDENTIFIED BY 'test';"
sudo mysql -e "GRANT ALL PRIVILEGES ON unittest.* to 'test'@localhost;"
sudo mysql -e "FLUSH PRIVILEGES;"

npm ci

current=$(pwd)
result=0

cd "$current/src/schedule-service"
bash ./scripts/test.sh
result=$(( $result == 0 ? ( $? == 0 ? 0 : 1 ) : 1 ))
cd "$current/src/booking-backend"
bash ./scripts/test.sh
result=$(( $result == 0 ? ( $? == 0 ? 0 : 1 ) : 1 ))
cd "$current/src/booking-frontend"
bash ./scripts/test.sh
result=$(( $result == 0 ? ( $? == 0 ? 0 : 1 ) : 1 ))
cd "$current/src/device-reservation"
bash ./scripts/test.sh
result=$(( $result == 0 ? ( $? == 0 ? 0 : 1 ) : 1 ))

cd $current
exit $result

sudo mysql -e "DROP USER 'test'@localhost;"
sudo mysql -e "DROP DATABASE unittest;"
sudo service mysql stop
sudo service rabbitmq-server stop