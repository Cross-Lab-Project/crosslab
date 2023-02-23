CREATE TABLE callback (`id` VARCHAR(600), `type` INTEGER, `targetbooking` BIGINT UNSIGNED NOT NULL, `parameters` JSON NOT NULL DEFAULT "{}", PRIMARY KEY(`id`));
