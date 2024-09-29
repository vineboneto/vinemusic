import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { type StyleProp, Text, type ViewStyle } from "react-native";
import { Font } from "@/constants/Font";

SplashScreen.preventAutoHideAsync();

const defaultStyle: StyleProp<ViewStyle> = {
	backgroundColor: "#fff",
};

export default function RootLayout() {
	const [loaded, error] = useFonts({
		[Font.JungleRegular]: require("../assets/fonts/Junge-Regular.ttf"),
		[Font.InterMedium]: require("../assets/fonts/Inter_28pt-Medium.ttf"),
		[Font.InterRegular]: require("../assets/fonts/Inter_28pt-Regular.ttf"),
		[Font.InterSemiBold]: require("../assets/fonts/Inter_28pt-SemiBold.ttf"),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<Stack
			screenOptions={{
				headerTitleAlign: "center",
				headerShadowVisible: false,
				headerTitle: (props) => (
					<Text
						{...props}
						style={{ fontSize: 24, fontFamily: "Jungle-Regular" }}
					>
						Vine Music
					</Text>
				),
			}}
		>
			<Stack.Screen name="index" options={{ contentStyle: defaultStyle }} />
		</Stack>
	);
}
