import { Font } from "@/constants/Font";
import { useTheme } from "@/hooks/useTheme";
import { Text } from "react-native";

export function Title() {
	const { ColorTheme } = useTheme();

	return (
		<Text
			style={{
				fontFamily: Font.JungleRegular,
				fontSize: 36,
				textAlign: "center",
				color: ColorTheme.text,
			}}
		>
			Vine Music
		</Text>
	);
}
