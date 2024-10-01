import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { Title } from "@/components/signin/title";
import { Colors } from "@/constants/Colors";
import { Font } from "@/constants/Font";
import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				paddingHorizontal: 50,
			}}
		>
			<View style={{ rowGap: 20, width: "100%" }}>
				<Title />
				<View>
					<Input placeholder="Email" />
				</View>
				<View>
					<Input placeholder="Senha" />
				</View>
				<Button onPress={() => router.push("/home")}>Entrar</Button>
				<View style={{ alignItems: "center" }}>
					<Button
						variant="ghost"
						style={{ width: 200 }}
						onPress={() => router.push("/home")}
					>
						Entrar Offline
					</Button>
				</View>
				<Pressable onPress={() => router.push("/signin/forgot-password")}>
					<Text
						style={{
							textAlign: "center",
							fontFamily: Font.InterRegular,
							fontSize: 15,
							textDecorationColor: Colors.light.text,
							textDecorationLine: "underline",
							textDecorationStyle: "solid",
						}}
					>
						Esqueci minha Senha
					</Text>
				</Pressable>
			</View>
		</View>
	);
}
