import header from "@/components/header";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router/stack";

export default function StackLayout() {
	return (
		<Stack
			screenOptions={{
				...header,
				contentStyle: { backgroundColor: Colors.light.background },
			}}
		/>
	);
}
