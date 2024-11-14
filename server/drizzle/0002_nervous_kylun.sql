CREATE TABLE IF NOT EXISTS "watch_list_new" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"time_added" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "watch_list_new" ADD CONSTRAINT "watch_list_new_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."items_new"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "watch_list_new" ADD CONSTRAINT "watch_list_new_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users_new"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
