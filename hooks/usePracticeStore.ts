import { date } from "@/utils/date";
import { useSupabaseClient } from "@/utils/superbase";

type PracticeRecordRow = {
	id: number;
	instrument_id: number;
	observation: string | null;
	status: "pendent";
	start_date: Date;
	end_date: Date | null;
	created_at: Date;
	updated_at: Date | null;
	user_id: string;
};

export type PracticeRecordData = {
	id: number;
	observation: string | null;
	status: "pendent" | "finish";
	start_date: Date;
	end_date: Date | null;
	created_at: Date;
	updated_at: Date | null;
	instrument: {
		id: number;
		name: string;
	};
};

const tableName = "practice_records";

// TODO: Tipar isso
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function parse(data: any): PracticeRecordData {
	return {
		...data,
		start_date: new Date(data.start_date),
		end_date: data.end_date ? new Date(data.end_date) : null,
		created_at: new Date(data.created_at),
		updated_at: data.updated_at ? new Date(data.updated_at) : null,
	};
}

export function usePracticeStore() {
	const createSupabaseClient = useSupabaseClient();

	const client = createSupabaseClient();

	async function create(
		input: Pick<
			PracticeRecordRow,
			"instrument_id" | "observation" | "start_date" | "status"
		>,
	) {
		const { data, error } = await client
			.from(tableName)
			.insert(input)
			.select<"*", PracticeRecordRow>();

		if (error) return null;
		return data[0].id;
	}

	async function finish(input: {
		totalInMinutes: number;
		endDate: Date;
		id: number;
	}) {
		const { error, data } = await client
			.from(tableName)
			.update({
				end_date: input.endDate,
				minutes: input.totalInMinutes,
				status: "finish",
			})
			.eq("id", Number(input.id))
			.select<"*", PracticeRecordRow>();

		if (error) return null;

		return data;
	}

	async function update(input: unknown) {
		return null;
	}

	async function fetchById(
		id: number,
	): Promise<PracticeRecordData | undefined> {
		const { data, error } = await client
			.from(tableName)
			.select(`
				id,
				observation,
				status,
				minutes,
				start_date,
				end_date,
				created_at,
				updated_at,
				instrument ( id, name )
			`)
			.eq("id", Number(id));
		if (error) return;
		return parse(data[0]) as unknown as PracticeRecordData;
	}

	async function report({
		endDate,
		startDate,
	}: { startDate: Date; endDate: Date }) {
		// const data = db
		// 	.select({
		// 		date: practiceRecords.startDate,
		// 		totalMinutes: sum(Practice.totalInMinutes),
		// 	})
		// 	.from(Practice)
		// 	.groupBy(
		// 		sql`strftime('%Y-%m', DATETIME(${Practice.startDate} / 1000, 'unixepoch'))`,
		// 	)
		// 	.orderBy(
		// 		sql`strftime('%Y-%m', DATETIME(${Practice.startDate} / 1000, 'unixepoch'))`,
		// 	)
		// 	.where(
		// 		and(
		// 			gte(
		// 				Practice.startDate,
		// 				date.start(startDate, { firstDayMonth: true }),
		// 			),
		// 			lte(Practice.startDate, date.end(endDate, { lastDayMonth: true })),
		// 			eq(Practice.idUser, user?.id || "offline"),
		// 		),
		// 	)
		// 	.all()
		// 	.map(({ date: d, totalMinutes }) => ({
		// 		totalMinutes: Number(totalMinutes) || 0,
		// 		date: date.start(d, { firstDayMonth: true }),
		// 	}));

		return { totalMinutes: 0, date: new Date() };
	}

	async function fetch({
		endDate,
		startDate,
	}: { startDate?: Date; endDate?: Date } = {}) {
		const { data, error } = await client
			.from(tableName)
			.select(`
				id,
				observation,
				status,
				minutes,
				start_date,
				end_date,
				created_at,
				updated_at,
				instrument ( id, name )
			`)
			.limit(20);

		if (error) return [];
		return data.map(parse);
	}

	async function deleteById(id: number) {
		const { data, error } = await client
			.from(tableName)
			.delete()
			.eq("id", Number(id));

		if (error) return null;
		return data;
	}

	return {
		create,
		fetch,
		fetchById,
		finish,
		deleteById,
		report,
		update,
	};
}
