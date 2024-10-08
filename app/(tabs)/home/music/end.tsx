import { Button } from "@/components/form/button";
import { Font } from "@/constants/Font";
import { useQuery } from "@/hooks/query";
import { useMusicStore } from "@/hooks/useMusicStore";
import { useTheme } from "@/hooks/useTheme";
import { formatDate, formatTime } from "@/utils";
import { date } from "@/utils/date";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	const { ColorTheme } = useTheme();
	const { id } = useLocalSearchParams<{ id: string }>();
	const { fetchById } = useMusicStore();
	const { data, isOk } = useQuery({
		fn: async () => {
			if (id) {
				return fetchById(Number(id));
			}
		},
	});

	const timeInMinutes =
		isOk && data.endDate ? date.diffInMinutes(data.startDate, data.endDate) : 0;

	return (
		<View
			style={{
				flex: 1,
				marginHorizontal: 20,
				rowGap: 20,
			}}
		>
			<View>
				<Text
					style={{
						fontFamily: Font.InterSemiBold,
						fontSize: 40,
						color: ColorTheme.text,
					}}
				>
					Atividade Concluída
				</Text>
			</View>

			<View style={{ rowGap: 10 }}>
				<Text
					style={{
						fontSize: 24,
						fontFamily: Font.InterRegular,
						color: ColorTheme.text,
					}}
				>
					Início: {data?.endDate ? formatDate(data.startDate) : "Carregando..."}
				</Text>
				<Text
					style={{
						fontSize: 24,
						fontFamily: Font.InterRegular,
						color: ColorTheme.text,
					}}
				>
					Fim: {data?.endDate ? formatDate(data.endDate) : "Carregando..."}
				</Text>
			</View>
			<View
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View
					style={{
						maxWidth: 250,
					}}
				>
					<Text
						style={{
							fontSize: 24,
							fontFamily: Font.InterRegular,
							textAlign: "center",
							color: ColorTheme.text,
						}}
					>
						Parabéns você praticou:
					</Text>
					<Text
						style={{
							fontSize: 64,
							fontFamily: Font.InterRegular,
							textAlign: "center",
							color: ColorTheme.text,
						}}
					>
						{formatTime(timeInMinutes)}
					</Text>
				</View>
			</View>
			<Button onPress={() => router.replace({ pathname: "/home", params: {} })}>
				Voltar
			</Button>
		</View>
	);
}
