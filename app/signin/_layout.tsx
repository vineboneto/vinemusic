import { Colors } from "@/constants/Colors";
import Stack from "expo-router/stack";

export default function StackLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitleAlign: "center",
				headerTitle: () => <></>,
				headerShadowVisible: false,
				headerBackTitleVisible: false,
				contentStyle: { backgroundColor: Colors.light.background },
			}}
		/>
	);
}
