import { Button } from "@/components/form/button";
import { Font } from "@/constants/Font";
import { formatTextWithEllipsis } from "@/utils";
import { router } from "expo-router";
import { Text, View } from "react-native";

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
			<View>
				<Text style={{ fontFamily: Font.InterSemiBold, fontSize: 40 }}>
					Praticando
				</Text>
				<Text
					style={{ fontFamily: Font.InterSemiBold, fontSize: 40 }}
					numberOfLines={2}
				>
					{formatTextWithEllipsis("Piano")}
				</Text>
			</View>

			<View>
				<Text style={{ fontSize: 24, fontFamily: Font.InterRegular }}>
					Inicio:{" "}
					{new Date().toLocaleString("pt-BR", {
						dateStyle: "medium",
						timeStyle: "short",
					})}
				</Text>
			</View>
			<View>
				<Button onPress={() => router.replace({ pathname: "/home/music/end" })}>
					Finalizar
				</Button>
			</View>
		</View>
	);
}
