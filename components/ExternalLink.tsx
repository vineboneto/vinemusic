import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import type { ComponentProps } from "react";
import { Platform } from "react-native";

type Props = ComponentProps<typeof Link>;

export function ExternalLink({ ...props }: Props) {
	return (
		<Link
			target="_blank"
			{...props}
			onPress={async (event) => {
				if (Platform.OS !== "web") {
					// Prevent the default behavior of linking to the default browser on native.
					event.preventDefault();
					// Open the link in an in-app browser.
					await openBrowserAsync(props.href.toString());
				}
			}}
		/>
	);
}
