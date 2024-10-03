import * as SecureStore from "expo-secure-store";

async function getToken(key: string) {
	return SecureStore.getItem(key);
}

async function saveToken(key: string, value: string) {
	return SecureStore.setItemAsync(key, value);
}

export const tokenCache = { getToken, saveToken };
