import React from "react";
import { Redirect } from "expo-router";
import { useSession } from "@/context/auth";
import { ActivityIndicator, View } from "react-native";

export default function StartPage() {
	const { session, isLoading } = useSession();

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="black" />
			</View>
		);
	}

	if (!session) {
		return <Redirect href="/signin" />;
	}

	return <Redirect href="/home" />;
}
