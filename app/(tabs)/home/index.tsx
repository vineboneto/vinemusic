import { ButtonActionsGroup } from "@/components/home/button-action";
import { Card } from "@/components/home/card";
import { Font } from "@/constants/Font";
import { Text, View } from "react-native";

function Title() {
	return (
		<Text style={{ fontFamily: Font.InterRegular }}>
			Atividades de estudo mais recentes ...
		</Text>
	);
}

export default function Index() {
	return (
		<View style={{ flex: 1, marginHorizontal: 20, rowGap: 20, marginTop: 20 }}>
			<ButtonActionsGroup />
			<Title />
			<Card status="finish" title="Piano" timeInMinutes={30} />
			<Card status="pendent" title="Guitarra" timeInMinutes={60 * 4} />
		</View>
	);
}
