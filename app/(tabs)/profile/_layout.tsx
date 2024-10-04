import header from "@/components/header";
import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router/stack";

export default function StackLayout() {
	const { ColorTheme } = useTheme();
	return (
		<Stack
			screenOptions={{
				...header(ColorTheme),
				contentStyle: { backgroundColor: ColorTheme.background },
			}}
		/>
	);
}
