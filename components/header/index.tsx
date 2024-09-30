import { Font } from "@/constants/Font";
import { Text } from "react-native";

const header = {
	headerTitleAlign: "center" as "center" | "left" | undefined,
	headerShadowVisible: false,
	headerTitle: (props: {
		children: string;
		tintColor?: string;
	}) => (
		<Text {...props} style={{ fontSize: 24, fontFamily: Font.JungleRegular }}>
			Vine Music
		</Text>
	),
};

export default header;
