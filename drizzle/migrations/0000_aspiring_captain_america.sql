CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`category_id` integer NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (cast (unixepoch () as int)),
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `id_idx` ON `products` (`id`);--> statement-breakpoint
CREATE INDEX `category_id_idx` ON `products` (`category_id`);
