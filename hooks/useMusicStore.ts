import { db } from "@/db/client";
import { instrument, music, type MusicSchema } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export function useMusicStore() {
	async function create(
		values: Pick<
			typeof music.$inferInsert,
			"observation" | "idInstrument" | "status" | "startDate"
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
		idInstrument,
		observation,
		startDate,
	}: Required<
		Pick<
			typeof music.$inferInsert,
			"endDate" | "id" | "startDate" | "observation" | "idInstrument"
		>
	>) {
		await db
			.update(music)
			.set({
				startDate,
				endDate,
				idInstrument,
				observation,
			})
			.where(eq(music.id, id));
	}

	async function fetchById(id: number) {
		try {
			return db
				.select({
					id: music.id,
					observation: music.observation,
					startDate: music.startDate,
					endDate: music.endDate,
					status: music.status,
					instrument: {
						id: instrument.id,
						name: instrument.name,
					},
				})
				.from(music)
				.innerJoin(instrument, eq(music.idInstrument, instrument.id))
				.where(eq(music.id, id))
				.get() as MusicSchema;
		} catch (err) {
			return;
		}
	}

	async function fetch() {
		try {
			const data = db
				.select({
					id: music.id,
					observation: music.observation,
					startDate: music.startDate,
					endDate: music.endDate,
					status: music.status,
					instrument: {
						id: instrument.id,
						name: instrument.name,
					},
				})
				.from(music)
				.innerJoin(instrument, eq(music.idInstrument, instrument.id))
				.orderBy(desc(music.createdAt))
				.limit(20)
				.all() as MusicSchema[];
			return data;
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
		update,
	};
}
