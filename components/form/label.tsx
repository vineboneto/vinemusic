import { Font } from "@/constants/Font";
import { Text } from "react-native";

export function Label({ children }: { children: string }) {
	return (
		<Text
			style={{ fontSize: 14, paddingBottom: 5, fontFamily: Font.InterRegular }}
		>
			{children}
		</Text>
	);
}
