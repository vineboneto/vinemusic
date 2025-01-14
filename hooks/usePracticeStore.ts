import { date } from "@/utils/date";
import { useSupabaseClient } from "@/utils/superbase";

type PracticeRecord = {
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

export function usePracticeStore() {
	const createSupabaseClient = useSupabaseClient();

	const client = createSupabaseClient();

	async function create(
		input: Pick<
			PracticeRecord,
			"instrument_id" | "observation" | "start_date" | "status"
		>,
	) {
		const { data, error } = await client
			.from("practice_records")
			.insert(input)
			.select<"*", PracticeRecord>();

		if (error) return null;
		return data[0].id;
	}

	async function finish(input: unknown) {}

	async function update(input: unknown) {
		// await db
		// 	.update(practiceRecords)
		// 	.set({
		// 		startDate,
		// 		totalInMinutes,
		// 		endDate,
		// 		idInstrument,
		// 		observation,
		// 	})
		// 	.where(and(eq(practiceRecords.id, id)));
		return null;
	}

	async function fetchById(id: number) {
		// try {
		// 	return db
		// 		.select({
		// 			id: practiceRecords.id,
		// 			observation: practiceRecords.observation,
		// 			startDate: practiceRecords.startDate,
		// 			endDate: practiceRecords.endDate,
		// 			status: practiceRecords.status,
		// 			instrument: {
		// 				id: instrument.id,
		// 				name: instrument.name,
		// 			},
		// 		})
		// 		.from(practiceRecords)
		// 		.innerJoin(instrument, eq(practiceRecords.idInstrument, instrument.id))
		// 		.where(and(eq(practiceRecords.id, id)))
		// 		.get() as PracticeRecordsSchema;
		// } catch (err) {
		// 	return;
		// }
		return null;
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
		// const statement = db
		// 	.select({
		// 		id: practiceRecords.id,
		// 		observation: Practice.observation,
		// 		startDate: Practice.startDate,
		// 		endDate: Practice.endDate,
		// 		status: Practice.status,
		// 		instrument: {
		// 			id: instrument.id,
		// 			name: instrument.name,
		// 		},
		// 	})
		// 	.from(Practice)
		// 	.innerJoin(instrument, eq(Practice.idInstrument, instrument.id))
		// 	.where(
		// 		and(
		// 			eq(Practice.idUser, user?.id || "offline"),
		// 			startDate &&
		// 				endDate &&
		// 				between(
		// 					Practice.startDate,
		// 					date.start(startDate),
		// 					date.end(endDate),
		// 				),
		// 		),
		// 	)
		// 	.orderBy(desc(Practice.createdAt))
		// 	.limit(20);

		// try {
		// 	return statement.all() as PracticeRecordsSchema[];
		// } catch (err) {
		// 	return [];
		// }
		return [];
	}

	async function deleteById(id: number) {
		// try {
		// 	return db
		// 		.delete(Practice)
		// 		.where(
		// 			and(eq(Practice.id, id), eq(Practice.idUser, user?.id || "offline")),
		// 		)
		// 		.returning();
		// } catch (err) {
		// 	return null;
		// }
		return null;
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
