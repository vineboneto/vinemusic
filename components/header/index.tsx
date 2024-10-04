import { Font } from "@/constants/Font";
import { type ThemeValue, useTheme } from "@/hooks/useTheme";
import { Text } from "react-native";

const header = (theme: ThemeValue) => ({
	headerTitleAlign: "center" as "center" | "left" | undefined,
	headerShadowVisible: false,
	headerStyle: {
		backgroundColor: theme.background,
	},
	headerTitle: (props: {
		children: string;
		tintColor?: string;
	}) => {
		const { ColorTheme } = useTheme();
		return (
			<Text
				{...props}
				style={{
					fontSize: 24,
					fontFamily: Font.JungleRegular,
					color: ColorTheme.text,
				}}
			>
				Vine Music
			</Text>
		);
	},
});

export default header;
