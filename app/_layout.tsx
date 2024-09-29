import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Font } from "@/constants/Font";

SplashScreen.preventAutoHideAsync();

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
		<Stack screenOptions={{ contentStyle: { backgroundColor: "red" } }}>
			<Stack.Screen
				name="(tabs)"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
