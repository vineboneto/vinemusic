import { Loading } from "@/components/loading";
import { Font } from "@/constants/Font";
import { useQuery } from "@/hooks/query";
import { useMusicStore } from "@/hooks/useMusicStore";
import { useTheme } from "@/hooks/useTheme";
import { formatTime } from "@/utils";
import { date } from "@/utils/date";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

function format(d: Date) {
	return d.toLocaleString("pt-BR", {
		dateStyle: "medium",
	});
}

export default function Index() {
	const { ColorTheme, theme } = useTheme();

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
		return <Text style={{ color: ColorTheme.text }}>{error.message}</Text>;
	}

	if (isUndefined) {
		return <Text style={{ color: ColorTheme.text }}>Data não encontrado</Text>;
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
			<StatusBar translucent style={theme === "dark" ? "light" : "dark"} />
			<Text
				style={{
					fontFamily: Font.InterSemiBold,
					fontSize: 40,
					color: ColorTheme.text,
				}}
			>
				Relatório de Práticas
			</Text>

			<Text
				style={{
					fontFamily: Font.InterRegular,
					fontSize: 18,
					color: ColorTheme.text,
				}}
			>
				{format(date.start(startDate, { firstDayMonth: true }))} até{" "}
				{format(date.end(endDate, { lastDayMonth: true }))}
			</Text>
			<BarChart
				height={250}
				color={ColorTheme.text}
				capColor={ColorTheme.text}
				topColor={ColorTheme.text}
				sideColor={ColorTheme.text}
				rulesColor={ColorTheme.text}
				frontColor={ColorTheme.text}
				xAxisColor={ColorTheme.text}
				yAxisColor={ColorTheme.text}
				barBorderColor={ColorTheme.text}
				xAxisIndicesColor={ColorTheme.text}
				yAxisIndicesColor={ColorTheme.text}
				gradientColor={ColorTheme.text}
				yAxisTextStyle={{ color: ColorTheme.text }}
				verticalLinesColor={ColorTheme.text}
				data={data.map((v) => ({
					value: v.totalMinutes,
					label: v.date.toLocaleString("pt-BR", {
						month: "2-digit",
						year: "2-digit",
					}),
					valurColor: ColorTheme.text,

					valueTextStyle: {
						color: ColorTheme.text,
					},
					labelTextStyle: {
						color: ColorTheme.text,
					},
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
							color: ColorTheme.text,
						}}
					>
						Total praticado:
					</Text>
					<Text
						style={{
							fontSize: 64,
							fontFamily: Font.InterRegular,
							textAlign: "center",
							color: ColorTheme.text,
						}}
					>
						{formatTime(totalMinutes)}
					</Text>
				</View>
			</View>
		</View>
	);
}
