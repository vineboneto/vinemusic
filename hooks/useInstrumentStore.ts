import { capitalize } from "@/utils";
import { useSupabaseClient } from "@/utils/superbase";

type Instrument = {
	id: number;
	name: string;
	user_id: string;
	created_at: Date;
	updated_at: Date;
};

const tableName = "instrument";

export function useInstrumentStore() {
	const createSupabaseClient = useSupabaseClient();

	const client = createSupabaseClient();

	async function create({ name }: { name: string }) {
		const { data } = await client
			.from(tableName)
			.insert({ name })
			.select<"*", Instrument>();

		if (!data) return null;
		return data[0].id;
	}

	async function fetch() {
		const { data, error } = await client
			.from(tableName)
			.select<"*", Instrument>();

		if (error) return [];

		return data;
	}

	async function options() {
		const data = await fetch();

		return data.map((v) => ({ value: v.id.toString(), label: v.name }));
	}

	return {
		create,
		fetch,
		options,
	};
}
