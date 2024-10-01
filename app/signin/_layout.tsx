import { Colors } from "@/constants/Colors";
import Stack from "expo-router/stack";
import { Pressable } from "react-native";

export default function StackLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitleAlign: "center",
				headerTitle: () => <></>,
				headerShadowVisible: false,
				headerBackTitleVisible: true,
				headerLeft: ({ canGoBack, label, tintColor }) =>
					canGoBack ? <Pressable>{label}</Pressable> : null,
				contentStyle: { backgroundColor: Colors.light.background },
			}}
		/>
	);
}
