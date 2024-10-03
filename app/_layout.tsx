import { router, Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Font } from "@/constants/Font";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { StatusBar } from "expo-status-bar";
import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "@/db/client";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Loading } from "@/components/loading";
import { tokenCache } from "@/storage/tokenCache";

SplashScreen.preventAutoHideAsync();

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env
	.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function Layout() {
	const { isSignedIn, isLoaded } = useAuth();

	useEffect(() => {
		if (!isLoaded) return;

		if (isSignedIn) {
			router.replace({ pathname: "/home" });
		} else {
			router.replace({ pathname: "/signin" });
		}
	}, [isSignedIn, isLoaded]);

	return (
		<>
			<StatusBar translucent />
			{isLoaded ? <Slot /> : <Loading />}
		</>
	);
}

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
		<ClerkProvider
			publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}
			tokenCache={tokenCache}
		>
			<AlertNotificationRoot>
				<Layout />
			</AlertNotificationRoot>
		</ClerkProvider>
	);
}
