import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router/stack";

export default function StackLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: Colors.light.background },
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
