CREATE DATABASE IF NOT EXISTS authentication DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS authorization DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS device DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS experiment DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS federation DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS lti DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS booking DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS authentication@'%';
CREATE USER IF NOT EXISTS authorization@'%';
CREATE USER IF NOT EXISTS device@'%';
CREATE USER IF NOT EXISTS experiment@'%';
CREATE USER IF NOT EXISTS federation@'%';
CREATE USER IF NOT EXISTS lti@'%';
CREATE USER IF NOT EXISTS booking@'%';

GRANT ALL PRIVILEGES ON authentication.* to authentication@'%';
GRANT ALL PRIVILEGES ON authorization.* to authorization@'%';
GRANT ALL PRIVILEGES ON device.* to device@'%';
GRANT ALL PRIVILEGES ON experiment.* to experiment@'%';
GRANT ALL PRIVILEGES ON federation.* to federation@'%';
GRANT ALL PRIVILEGES ON lti.* to lti@'%';
GRANT ALL PRIVILEGES ON booking.* to booking@'%';

FLUSH PRIVILEGES;

USE booking;
CREATE TABLE booking (`id` BIGINT UNSIGNED AUTO_INCREMENT, `start` DATETIME(3) NOT NULL, `end` DATETIME(3) NOT NULL, `type` ENUM('normal'), `status` ENUM('pending', 'booked', 'rejected', 'cancelled', 'active', 'active-pending', 'active-rejected') NOT NULL, `user` TEXT NOT NULL, `message` LONGTEXT, PRIMARY KEY (`id`));
CREATE TABLE bookeddevices (`id` BIGINT UNSIGNED AUTO_INCREMENT, `booking` BIGINT UNSIGNED NOT NULL, `originaldevice` TEXT NOT NULL, `originalposition` INT NOT NULL, `bookeddevice` TEXT, `remotereference` TEXT, `local` BOOLEAN, PRIMARY KEY (`id`), `reservation` BIGINT UNSIGNED, FOREIGN KEY(`booking`) REFERENCES booking (`id`) ON DELETE CASCADE ON UPDATE RESTRICT);
CREATE TABLE bookingcallbacks (`id` BIGINT UNSIGNED AUTO_INCREMENT, `booking` BIGINT UNSIGNED NOT NULL, `url` TEXT NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY(`booking`) REFERENCES booking (`id`) ON DELETE CASCADE ON UPDATE RESTRICT);
CREATE TABLE callback (`id` VARCHAR(600), `type` INTEGER, `targetbooking` BIGINT UNSIGNED NOT NULL, `parameters` JSON NOT NULL DEFAULT "{}", PRIMARY KEY(`id`));
CREATE TABLE reservation (`id` BIGINT UNSIGNED AUTO_INCREMENT, `device` TEXT NOT NULL, `start` DATETIME(3) NOT NULL, `end` DATETIME(3) NOT NULL, `bookingreference` TEXT NOT NULL, PRIMARY KEY (`id`));