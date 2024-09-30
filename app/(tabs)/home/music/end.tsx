import { Button } from "@/components/form/button";
import { Font } from "@/constants/Font";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				marginHorizontal: 20,
				marginTop: 60,
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
					Início:{" "}
					{new Date().toLocaleString("pt-BR", {
						dateStyle: "short",
						timeStyle: "short",
					})}
				</Text>
				<Text style={{ fontSize: 24, fontFamily: Font.InterRegular }}>
					Fim:{" "}
					{new Date().toLocaleString("pt-BR", {
						dateStyle: "short",
						timeStyle: "short",
					})}
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
						14m
					</Text>
				</View>
			</View>
			<Button
				title="Voltar"
				onPress={() => router.replace({ pathname: "/home" })}
			/>
		</View>
	);
}
