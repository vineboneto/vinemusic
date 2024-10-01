import { db } from "@/db/client";
import { music, type MusicSchema } from "@/db/schema";
import { desc } from "drizzle-orm";

export function useMusicStore() {
	async function create(
		values: Pick<MusicSchema, "observation" | "instrument" | "status">,
	) {
		const id = await db.insert(music).values(values).returning({
			id: music.id,
		});
		return id;
	}

	async function fetch() {
		const statment = db
			.select()
			.from(music)
			.orderBy(desc(music.createdAt))
			.limit(20);

		try {
			return statment.all();
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

	return {
		create,
		fetch,
		fetchDistinctInstruments,
	};
}
