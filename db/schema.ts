import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const music = sqliteTable("music", {
	id: integer("id").primaryKey(),
	instrument: text("instrument").notNull(),
	observation: text("observation"),
	status: text("status"),
	startDate: integer("start_date", { mode: "timestamp_ms" }),
	endDate: integer("end_date", { mode: "timestamp" }),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" })
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
});

export type MusicSchema = Omit<
	typeof music.$inferSelect,
	"status" | "instrument"
> & {
	status: "pendent" | "finish";
	instrument: string;
};
