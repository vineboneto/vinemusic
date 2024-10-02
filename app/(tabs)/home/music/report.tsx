import { Loading } from "@/components/loading";
import { Font } from "@/constants/Font";
import { useQuery } from "@/hooks/query";
import { useMusicStore } from "@/hooks/useMusicStore";
import { formatTime } from "@/utils";
import { date } from "@/utils/date";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

function format(d: Date) {
	return d.toLocaleString("pt-BR", {
		dateStyle: "medium",
	});
}

export default function Index() {
	const params = useLocalSearchParams<{
		startDate: string;
		endDate: string;
	}>();

	const startDate = new Date(params.startDate);
	const endDate = new Date(params.endDate);

	const { report } = useMusicStore();

	const { data, isLoading, isUndefined, isError, error } = useQuery({
		fn: () => report({ startDate, endDate }),
	});

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		return <Text>{error.message}</Text>;
	}

	if (isUndefined) {
		return <Text>Data não encontrado</Text>;
	}

	const totalMinutes = data.reduce((acc, item) => acc + item.totalMinutes, 0);

	return (
		<View
			style={{
				flex: 1,
				marginHorizontal: 20,
				marginTop: 20,
				rowGap: 20,
			}}
		>
			<Text style={{ fontFamily: Font.InterSemiBold, fontSize: 40 }}>
				Relatório de Práticas
			</Text>

			<Text style={{ fontFamily: Font.InterRegular, fontSize: 18 }}>
				{format(date.start(startDate, { firstDayMonth: true }))} até{" "}
				{format(date.end(endDate, { lastDayMonth: true }))}
			</Text>
			<BarChart
				height={250}
				data={data.map((v) => ({
					value: v.totalMinutes,
					label: v.date.toLocaleString("pt-BR", {
						month: "2-digit",
						year: "2-digit",
					}),
				}))}
				spacing={35}
				autoShiftLabels={false}
				showLine={false}
				rulesType="dashed"
				rulesThickness={0}
			/>

			<View
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View style={{ maxWidth: 250 }}>
					<Text
						style={{
							fontSize: 24,
							fontFamily: Font.InterRegular,
							textAlign: "center",
						}}
					>
						Total praticado:
					</Text>
					<Text
						style={{
							fontSize: 64,
							fontFamily: Font.InterRegular,
							textAlign: "center",
						}}
					>
						{formatTime(totalMinutes)}
					</Text>
				</View>
			</View>
		</View>
	);
}
