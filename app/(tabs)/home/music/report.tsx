import { Button } from "@/components/form/button";
import { Font } from "@/constants/Font";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

function format(d: Date) {
	return d.toLocaleString("pt-BR", {
		dateStyle: "medium",
	});
}

const data = [
	{ value: 50, label: "jan" },
	{ value: 80, label: "fev" },
	{ value: 90, label: "mar" },
	{ value: 70, label: "abr" },
];

export default function Index() {
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
				{format(new Date())} até {format(new Date())}
			</Text>
			<BarChart
				height={250}
				data={data}
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
						9h
					</Text>
				</View>
			</View>
		</View>
	);
}
