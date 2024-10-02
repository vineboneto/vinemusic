import { isNotNull, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const music = sqliteTable("music", {
	id: integer("id").primaryKey(),
	instrument: text("instrument").notNull(),
	observation: text("observation"),
	status: text("status").notNull(),
	startDate: integer("start_date", { mode: "timestamp_ms" }).notNull(),
	endDate: integer("end_date", { mode: "timestamp" }),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" })
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
});

type Music = Omit<typeof music.$inferSelect, "status" | "instrument">;

export type MusicSchema = Music & {
	status: "pendent" | "finish";
	instrument: string;
	startDate: Date;
};
