import { Button } from "@/components/form/button";
import { Font } from "@/constants/Font";
import { useQuery } from "@/hooks/query";
import { useMusicStore } from "@/hooks/useMusicStore";
import { formatDate } from "@/utils";
import { date } from "@/utils/date";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { fetchById } = useMusicStore();
	const { data, isLoading } = useQuery({
		fn: async () => {
			if (id) {
				return fetchById(Number(id));
			}
		},
	});

	return (
		<View
			style={{
				flex: 1,
				marginHorizontal: 20,
				rowGap: 20,
			}}
		>
			<View>
				<Text style={{ fontFamily: Font.InterSemiBold, fontSize: 40 }}>
					Atividade Concluída
				</Text>
			</View>

			<View style={{ rowGap: 10 }}>
				<Text style={{ fontSize: 24, fontFamily: Font.InterRegular }}>
					Início: {data?.endDate ? formatDate(data.startDate) : "Carregando..."}
				</Text>
				<Text style={{ fontSize: 24, fontFamily: Font.InterRegular }}>
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
						}}
					>
						Parabéns você praticou:
					</Text>
					<Text
						style={{
							fontSize: 64,
							fontFamily: Font.InterRegular,
							textAlign: "center",
						}}
					>
						{data?.endDate
							? `${date.diffInMinutes(data.startDate, data.endDate)}m`
							: "0m"}
					</Text>
				</View>
			</View>
			<Button onPress={() => router.replace({ pathname: "/home" })}>
				Voltar
			</Button>
		</View>
	);
}
