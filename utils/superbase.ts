import { useSession } from "@clerk/clerk-expo";
import { createClient } from "@supabase/supabase-js";

export function useSupabaseClient() {
	const { session } = useSession();

	function createClerkSupabaseClient() {
		return createClient(
			process.env.EXPO_PUBLIC_SUPABASE_URL as string,
			process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
			{
				global: {
					// Get the custom Supabase token from Clerk
					fetch: async (url, options = {}) => {
						const clerkToken = await session?.getToken({
							template: "supabase",
						});

						const headers = new Headers(options?.headers);
						headers.set("Authorization", `Bearer ${clerkToken}`);

						return fetch(url, {
							...options,
							headers,
						});
					},
				},
			},
		);
	}

	return createClerkSupabaseClient;
}
