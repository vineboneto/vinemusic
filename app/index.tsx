import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Loading } from "@/components/loading";

export default function StartPage() {
	const { isSignedIn, isLoaded } = useAuth();

	if (!isLoaded) {
		return <Loading />;
	}

	if (isSignedIn) {
		return <Redirect href="/home" />;
	}

	return <Redirect href="/signin" />;
}
