sudo service mysql start

sudo mysql -e "DROP USER IF EXISTS 'service'@localhost;"
sudo mysql -e "DROP DATABASE IF EXISTS auth_service;"
sudo mysql -e "DROP DATABASE IF EXISTS device_service;"
sudo mysql -e "DROP DATABASE IF EXISTS experiment_service;"
sudo mysql -e "DROP DATABASE IF EXISTS federation_service;"

sudo mysql -e "CREATE DATABASE IF NOT EXISTS auth_service DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE DATABASE IF NOT EXISTS device_service DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE DATABASE IF NOT EXISTS experiment_service DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE DATABASE IF NOT EXISTS federation_service DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;"

sudo mysql -e "CREATE USER IF NOT EXISTS 'service'@localhost IDENTIFIED BY 'service';"

sudo mysql -e "GRANT ALL PRIVILEGES ON auth_service.* to 'service'@'localhost';"
sudo mysql -e "GRANT ALL PRIVILEGES ON device_service.* to 'service'@'localhost';"
sudo mysql -e "GRANT ALL PRIVILEGES ON experiment_service.* to 'service'@'localhost';"
sudo mysql -e "GRANT ALL PRIVILEGES ON federation_service.* to 'service'@'localhost';"

sudo mysql -e "FLUSH PRIVILEGES;"