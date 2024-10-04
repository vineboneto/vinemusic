import header from "@/components/header";
import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text } from "react-native";

export default function StackLayout() {
	const { ColorTheme, theme } = useTheme();

	return (
		<>
			<StatusBar translucent style={theme === "dark" ? "light" : "dark"} />
			<Stack
				screenOptions={{
					...header(ColorTheme),

					headerBackTitleVisible: true,
					headerTintColor: ColorTheme.text,
					headerLeft: ({ canGoBack, label }) =>
						canGoBack ? <Pressable>{label}</Pressable> : null,
					contentStyle: { backgroundColor: ColorTheme.background },
				}}
			/>
		</>
	);
}
