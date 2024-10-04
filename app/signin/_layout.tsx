import { useTheme } from "@/hooks/useTheme";
import Stack from "expo-router/stack";

export default function StackLayout() {
	const { ColorTheme } = useTheme();

	return (
		<Stack
			screenOptions={{
				headerTitleAlign: "center",
				headerTitle: () => <></>,
				headerStyle: {
					backgroundColor: ColorTheme.background,
				},
				headerTintColor: ColorTheme.text,
				headerShadowVisible: false,
				headerBackTitleVisible: false,
				contentStyle: { backgroundColor: ColorTheme.background },
			}}
		/>
	);
}
