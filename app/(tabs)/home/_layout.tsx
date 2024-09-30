import header from "@/components/header";
import { Colors } from "@/constants/Colors";
import { Font } from "@/constants/Font";
import { Stack } from "expo-router/stack";
import { Pressable, Text } from "react-native";

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
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="music/edit" />
			<Stack.Screen name="music/end" />
			<Stack.Screen name="music/new" />
			<Stack.Screen name="music/report" />
			<Stack.Screen name="music/timer" />
			<Stack.Screen name="music/view" />
		</Stack>
	);
}
