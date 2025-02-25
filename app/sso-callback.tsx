import { Loading } from "@/components/loading";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React from "react";

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
