import { isNotNull, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const music = sqliteTable("music", {
	id: integer("id").primaryKey(),
	observation: text("observation"),
	status: text("status").notNull(),
	startDate: integer("start_date", { mode: "timestamp_ms" }).notNull(),
	endDate: integer("end_date", { mode: "timestamp" }),
	idInstrument: integer("id_instrument")
		.notNull()
		.references(() => instrument.id),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" })
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
});

export const instrument = sqliteTable("instrument", {
	id: integer("id").primaryKey(),
	name: text("instrument").notNull().unique(),
});

type Music = Omit<
	typeof music.$inferSelect,
	"status" | "idInstrument" | "createdAt" | "updatedAt"
>;

export type InstrumentSchema = typeof instrument.$inferSelect;
export type MusicSchema = Music & {
	status: "pendent" | "finish";
	instrument: InstrumentSchema;
};
