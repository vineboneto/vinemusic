import React from "react";
import { Redirect } from "expo-router";
import { useSession } from "@/context/auth";

import { ActivityIndicator, View } from "react-native";
import { Loading } from "@/components/loading";

export default function StartPage() {
	const { session, isLoading } = useSession();

	if (isLoading) {
		return <Loading />;
	}

	if (!session) {
		return <Redirect href="/signin" />;
	}

	return <Redirect href="/home" />;
}
