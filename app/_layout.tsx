import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Font } from "@/constants/Font";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { StatusBar } from "expo-status-bar";
import { SessionProvider } from "@/context/auth";
import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "@/db/client";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		[Font.JungleRegular]: require("../assets/fonts/Junge-Regular.ttf"),
		[Font.InterMedium]: require("../assets/fonts/Inter_28pt-Medium.ttf"),
		[Font.InterRegular]: require("../assets/fonts/Inter_28pt-Regular.ttf"),
		[Font.InterSemiBold]: require("../assets/fonts/Inter_28pt-SemiBold.ttf"),
		[Font.InterBold]: require("../assets/fonts/Inter_28pt-Bold.ttf"),
	});

	const { success: hasRunMigrations, error: runningMigrationError } =
		useMigrations(db, migrations);
	useEffect(() => {
		if (runningMigrationError) throw runningMigrationError;
	}, [runningMigrationError]);

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<SessionProvider>
			<AlertNotificationRoot>
				<StatusBar translucent />
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(tabs)" />
				</Stack>
			</AlertNotificationRoot>
		</SessionProvider>
	);
}
