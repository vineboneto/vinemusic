import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		"Jungle-Regular": require("../assets/fonts/Junge-Regular.ttf"),
		"Inter_28pt-Medium": require("../assets/fonts/Inter_28pt-Medium.ttf"),
		"Inter_28pt-Regular": require("../assets/fonts/Inter_28pt-Regular.ttf"),
		"Inter_28pt-SemiBold": require("../assets/fonts/Inter_28pt-SemiBold.ttf"),
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
		<Stack>
			<Stack.Screen name="index" />
		</Stack>
	);
}
