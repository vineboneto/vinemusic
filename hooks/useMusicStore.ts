import { db } from "@/db/client";
import { instrument, music, type MusicSchema } from "@/db/schema";
import { date } from "@/utils/date";
import { useUser } from "@clerk/clerk-expo";
import { and, between, desc, eq, gte, lte, sql, sum } from "drizzle-orm";

export function useMusicStore() {
	const { user } = useUser();

	async function create(
		values: Pick<
			typeof music.$inferInsert,
			"observation" | "idInstrument" | "status" | "startDate"
		>,
	) {
		const data = await db
			.insert(music)
			.values({ ...values, idUser: user?.id || "offline" })
			.returning();
		return data[0];
	}

	async function finish({
		totalInMinutes,
		endDate,
		id,
	}: Required<Pick<MusicSchema, "endDate" | "id" | "totalInMinutes">>) {
		await db
			.update(music)
			.set({
				endDate,
				totalInMinutes,
				status: "finish",
			})
			.where(and(eq(music.id, id), eq(music.idUser, user?.id || "offline")));
	}

	async function update({
		endDate,
		id,
		idInstrument,
		observation,
		startDate,
		totalInMinutes,
	}: Required<
		Pick<
			typeof music.$inferInsert,
			| "endDate"
			| "id"
			| "startDate"
			| "observation"
			| "idInstrument"
			| "totalInMinutes"
		>
	>) {
		await db
			.update(music)
			.set({
				startDate,
				totalInMinutes,
				endDate,
				idInstrument,
				observation,
			})
			.where(and(eq(music.id, id), eq(music.idUser, user?.id || "offline")));
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
				.where(and(eq(music.id, id), eq(music.idUser, user?.id || "offline")))
				.get() as MusicSchema;
		} catch (err) {
			return;
		}
	}

	async function report({
		endDate,
		startDate,
	}: { startDate: Date; endDate: Date }) {
		const data = db
			.select({
				date: music.startDate,
				totalMinutes: sum(music.totalInMinutes),
			})
			.from(music)
			.groupBy(
				sql`strftime('%Y-%m', DATETIME(${music.startDate} / 1000, 'unixepoch'))`,
			)
			.orderBy(
				sql`strftime('%Y-%m', DATETIME(${music.startDate} / 1000, 'unixepoch'))`,
			)
			.where(
				and(
					gte(music.startDate, date.start(startDate, { firstDayMonth: true })),
					lte(music.startDate, date.end(endDate, { lastDayMonth: true })),
					eq(music.idUser, user?.id || "offline"),
				),
			)
			.all()
			.map(({ date: d, totalMinutes }) => ({
				totalMinutes: Number(totalMinutes) || 0,
				date: date.start(d, { firstDayMonth: true }),
			}));

		return data;
	}

	async function fetch({
		endDate,
		startDate,
	}: { startDate?: Date; endDate?: Date } = {}) {
		const statement = db
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
			.where(
				and(
					eq(music.idUser, user?.id || "offline"),
					startDate &&
						endDate &&
						between(music.startDate, date.start(startDate), date.end(endDate)),
				),
			)
			.orderBy(desc(music.createdAt))
			.limit(20);

		try {
			return statement.all() as MusicSchema[];
		} catch (err) {
			return [];
		}
	}

	async function deleteById(id: number) {
		try {
			return db
				.delete(music)
				.where(and(eq(music.id, id), eq(music.idUser, user?.id || "offline")))
				.returning();
		} catch (err) {
			return null;
		}
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
