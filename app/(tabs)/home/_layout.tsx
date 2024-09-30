import { Colors } from "@/constants/Colors";
import { Font } from "@/constants/Font";
import { Stack } from "expo-router/stack";
import { Pressable, Text } from "react-native";

export default function StackLayout() {
	return (
		<Stack
			screenOptions={{
				headerBackTitleVisible: true,
				headerLeft: ({ canGoBack, label, tintColor }) =>
					canGoBack ? <Pressable>{label}</Pressable> : null,
				contentStyle: { backgroundColor: Colors.light.background },
				headerTitleAlign: "center",
				headerShadowVisible: false,
				headerTitle: (props) => (
					<Text
						{...props}
						style={{ fontSize: 24, fontFamily: Font.JungleRegular }}
					>
						Vine Music
					</Text>
				),
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="music/new" />
			<Stack.Screen name="music/view" />
		</Stack>
	);
}
