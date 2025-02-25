import { Button } from "@/components/form/button";
import { Title } from "@/components/signin/title";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "@/hooks/useTheme";
import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
	const { ColorTheme } = useTheme();

	const [isLoading, setIsLoading] = useState(false);
	const { startSSOFlow } = useSSO();

	async function onGoogleSign() {
		try {
			setIsLoading(true);

			const redirectUrl = AuthSession.makeRedirectUri({
				scheme: "vineboneto",
				path: "sso-callback",
			});

			await new Promise((resolve) => {
				Alert.alert("Confirm", `${redirectUrl}`, [
					{
						text: "OK",
						onPress: () => resolve(true),
					},
					{
						text: "Cancel",
						onPress: () => resolve(false),
						style: "cancel",
					},
				]);
			});

			const { createdSessionId, setActive, signIn, signUp } =
				await startSSOFlow({
					strategy: "oauth_google",
					redirectUrl,
				});

			if (createdSessionId && setActive) {
				await setActive({
					session: createdSessionId,
				});
			} else {
				setIsLoading(false);
			}
		} catch (err) {
			setIsLoading(false);
			console.error(JSON.stringify(err, null, 2));
			await new Promise((resolve) => {
				Alert.alert("Confirm", `${(err as Error).message}`, [
					{
						text: "OK",
						onPress: () => resolve(true),
					},
					{
						text: "Cancel",
						onPress: () => resolve(false),
						style: "cancel",
					},
				]);
			});
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
						<Ionicons size={19} name="logo-google" color={ColorTheme.text} />
					}
				>
					Entrar com Google
				</Button>
			</View>
		</View>
	);
}
