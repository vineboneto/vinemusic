import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Font } from "@/constants/Font";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		[Font.JungleRegular]: require("../assets/fonts/Junge-Regular.ttf"),
		[Font.InterMedium]: require("../assets/fonts/Inter_28pt-Medium.ttf"),
		[Font.InterRegular]: require("../assets/fonts/Inter_28pt-Regular.ttf"),
		[Font.InterSemiBold]: require("../assets/fonts/Inter_28pt-SemiBold.ttf"),
		[Font.InterBold]: require("../assets/fonts/Inter_28pt-Bold.ttf"),
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
		<AlertNotificationRoot>
			<StatusBar translucent />
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</AlertNotificationRoot>
	);
}
