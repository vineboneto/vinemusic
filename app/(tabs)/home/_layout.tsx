import header from "@/components/header";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router/stack";
import { Pressable } from "react-native";

export default function StackLayout() {
	return (
		<Stack
			screenOptions={{
				...header,
				headerBackTitleVisible: true,
				headerLeft: ({ canGoBack, label, tintColor }) =>
					canGoBack ? <Pressable>{label}</Pressable> : null,
				contentStyle: { backgroundColor: Colors.light.background },
			}}
		/>
	);
}
