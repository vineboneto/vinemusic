CREATE TABLE `music` (
	`id` integer PRIMARY KEY NOT NULL,
	`instrument` text,
	`observation` text,
	`start_date` integer,
	`end_date` integer,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
