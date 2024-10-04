import { useTheme } from "@/hooks/useTheme";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";

export function Loading() {
	const { ColorTheme } = useTheme();

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator size="large" color={ColorTheme.text} />
		</View>
	);
}
