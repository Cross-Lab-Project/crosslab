#!/usr/bin/bash

sudo service mysql start

sudo mysql -e "CREATE DATABASE IF NOT EXISTS $1 DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER IF NOT EXISTS '$2'@localhost IDENTIFIED BY '$3';"
sudo mysql -e "GRANT ALL PRIVILEGES ON $1.* to '$2'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"