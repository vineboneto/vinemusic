import { db } from "@/db/client";
import { instrument } from "@/db/schema";
import { capitalize } from "@/utils";

export function useInstrumentStore() {
	async function create(values: Omit<typeof instrument.$inferInsert, "id">) {
		const data = await db
			.insert(instrument)
			.values({ ...values, name: values.name.trim().toLowerCase() })
			.onConflictDoUpdate({
				target: instrument.name,
				set: {
					name: values.name.trim().toLowerCase(),
				},
			})
			.returning();
		return data[0];
	}

	async function fetch() {
		try {
			const data = db.select().from(instrument).limit(20).all();
			return data.map((e) => ({ ...e, name: capitalize(e.name) }));
		} catch (err) {
			return [];
		}
	}

	async function options() {
		return (await fetch()).map((v) => ({
			value: v.id.toString(),
			label: v.name,
		}));
	}

	return {
		create,
		fetch,
		options,
	};
}
