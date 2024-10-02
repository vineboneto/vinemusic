import { db } from "@/db/client";
import { music, type MusicSchema } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export function useMusicStore() {
	async function create(
		values: Pick<
			MusicSchema,
			"observation" | "instrument" | "status" | "startDate"
		>,
	) {
		const data = await db.insert(music).values(values).returning();
		return data[0];
	}

	async function finish({
		endDate,
		id,
	}: Required<Pick<MusicSchema, "endDate" | "id">>) {
		await db
			.update(music)
			.set({
				endDate,
				status: "finish",
			})
			.where(eq(music.id, id));
	}

	async function update({
		endDate,
		id,
		instrument,
		observation,
		startDate,
	}: Required<
		Pick<
			MusicSchema,
			"endDate" | "id" | "startDate" | "observation" | "instrument"
		>
	>) {
		await db
			.update(music)
			.set({
				startDate,
				endDate,
				instrument,
				observation,
			})
			.where(eq(music.id, id));
	}

	async function fetchById(id: number): Promise<MusicSchema | undefined> {
		try {
			return db.select().from(music).where(eq(music.id, id)).get() as
				| MusicSchema
				| undefined;
		} catch (err) {
			return;
		}
	}

	async function fetch(): Promise<MusicSchema[]> {
		try {
			return db
				.select()
				.from(music)
				.orderBy(desc(music.createdAt))
				.limit(20)
				.all() as MusicSchema[];
		} catch (err) {
			return [];
		}
	}

	async function fetchDistinctInstruments() {
		const statment = db
			.selectDistinct({ instrument: music.instrument })
			.from(music)
			.orderBy(desc(music.createdAt));

		try {
			return statment.all();
		} catch (err) {
			return [];
		}
	}

	async function deleteById(id: number) {
		try {
			return db.delete(music).where(eq(music.id, id)).returning();
		} catch (err) {
			return null;
		}
	}

	async function deleteAll() {
		try {
			return db.delete(music).returning();
		} catch (err) {
			return [];
		}
	}

	return {
		create,
		fetch,
		fetchById,
		deleteAll,
		finish,
		deleteById,
		fetchDistinctInstruments,
		update,
	};
}
