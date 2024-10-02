CREATE TABLE `instrument` (
	`id` integer PRIMARY KEY NOT NULL,
	`instrument` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `music` (
	`id` integer PRIMARY KEY NOT NULL,
	`observation` text,
	`status` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`id_instrument` integer NOT NULL,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`id_instrument`) REFERENCES `instrument`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `instrument_instrument_unique` ON `instrument` (`instrument`);