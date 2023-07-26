#!/usr/bin/bash

sudo service mysql start

sudo mysql -e "DROP DATABASE IF EXISTS database_migration;"
sudo mysql -e "CREATE DATABASE database_migration DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'service'@localhost IDENTIFIED BY 'service';"
sudo mysql -e "GRANT ALL PRIVILEGES ON database_migration.* to 'service'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

npx env-cmd -e database_migration npx typeorm-ts-node-commonjs migration:run -d ./src/database/dataSource.ts
npx env-cmd -e database_migration npx typeorm-ts-node-commonjs migration:generate ./src/database/migrations/$1 -d ./src/database/dataSource.ts

sudo mysql -e "DROP DATABASE database_migration"