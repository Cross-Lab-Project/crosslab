#!/bin/bash
sudo service rabbitmq-server start
sudo service mariadb start
sudo mysql -e "DROP DATABASE IF EXISTS unittest;"
sudo mysql -e "CREATE DATABASE unittest DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "DROP USER IF EXISTS 'test'@localhost;"
sudo mysql -e "CREATE USER 'test'@localhost IDENTIFIED BY 'test';"
sudo mysql -e "GRANT ALL PRIVILEGES ON unittest.* to 'test'@localhost;"
sudo mysql -e "FLUSH PRIVILEGES;"