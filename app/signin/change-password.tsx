import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { Title } from "@/components/signin/title";
import { Font } from "@/constants/Font";
import { router } from "expo-router";
import { Text, View } from "react-native";

const headerHeight = 56;

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				marginTop: -headerHeight,
				justifyContent: "center",
				alignItems: "center",
				paddingHorizontal: 40,
			}}
		>
			<View style={{ rowGap: 20, width: "100%" }}>
				<Title />
				<Text
					style={{
						fontFamily: Font.InterRegular,
						fontSize: 15,
						textAlign: "center",
					}}
				>
					Digite sua nova senha
				</Text>
				<Input placeholder="Nova Senha" />
				<Input placeholder="Confirmar Nova Senha" />

				<Button onPress={() => router.replace({ pathname: "/signin" })}>
					Alterar
				</Button>
			</View>
		</View>
	);
}
