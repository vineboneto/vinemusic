import { Font } from "@/constants/Font";
import { Text } from "react-native";

export function Title() {
	return (
		<Text
			style={{
				fontFamily: Font.JungleRegular,
				fontSize: 36,
				textAlign: "center",
			}}
		>
			Vine Music
		</Text>
	);
}
