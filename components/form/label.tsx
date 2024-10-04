import { Font } from "@/constants/Font";
import { useTheme } from "@/hooks/useTheme";
import { Text } from "react-native";

export function Label({ children }: { children: string }) {
	const { ColorTheme } = useTheme();

	return (
		<Text
			style={{
				fontSize: 14,
				paddingBottom: 5,
				fontFamily: Font.InterRegular,
				color: ColorTheme.text,
			}}
		>
			{children}
		</Text>
	);
}
