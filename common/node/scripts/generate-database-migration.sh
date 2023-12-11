#!/usr/bin/bash

sudo service mariadb start

sudo mysql -e "DROP DATABASE IF EXISTS database_migration;"
sudo mysql -e "CREATE DATABASE database_migration DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'service'@localhost IDENTIFIED BY 'service';"
sudo mysql -e "GRANT ALL PRIVILEGES ON database_migration.* to 'service'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

DB_USERNAME=service DB_PASSWORD=service DB_DATABASE=database_migration DB_TYPE=$1 npx typeorm-ts-node-esm migration:run -d ./src/database/dataSource.ts
DB_USERNAME=service DB_PASSWORD=service DB_DATABASE=database_migration DB_TYPE=$1 npx typeorm-ts-node-esm migration:generate ./src/database/migrations/$1/$2 -d ./src/database/dataSource.ts

rm -f database_migration

sudo mysql -e "DROP DATABASE database_migration"