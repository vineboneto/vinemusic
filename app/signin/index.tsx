import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { Title } from "@/components/signin/title";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useEffect, useState } from "react";
import { View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
	const [isLoading, setIsLoading] = useState(false);
	const googleOAuth = useOAuth({ strategy: "oauth_google" });

	async function onGoogleSign() {
		try {
			setIsLoading(true);

			const redirectUrl = Linking.createURL("/");

			const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl });

			if (oAuthFlow.authSessionResult?.type === "success") {
				if (oAuthFlow.setActive) {
					await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
				}
			} else {
				setIsLoading(false);
			}
		} catch (err) {
			setIsLoading(false);
			console.error(err);
		}
	}

	useEffect(() => {
		WebBrowser.warmUpAsync();

		return () => {
			WebBrowser.coolDownAsync();
		};
	}, []);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				paddingHorizontal: 50,
				marginTop: -56,
			}}
		>
			<View style={{ rowGap: 30, width: "100%" }}>
				<Title />

				<Button
					isLoading={isLoading}
					onPress={onGoogleSign}
					startIcon={
						<Ionicons
							size={19}
							name="logo-google"
							color={Colors.light.background}
						/>
					}
				>
					Entrar com Google
				</Button>
			</View>
		</View>
	);
}
