import { Colors } from "@/constants/Colors";
import { Font } from "@/constants/Font";
import type { ComponentProps } from "react";

import { Pressable, Text } from "react-native";

type Props = ComponentProps<typeof Pressable> & {
	title: string;
};

export function Button({ title, ...rest }: Props) {
	return (
		<Pressable
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				paddingVertical: 15,
				borderRadius: 8,
				backgroundColor: Colors.light.button.container.default,
			}}
			{...rest}
		>
			<Text
				style={{
					fontFamily: Font.InterRegular,
					fontSize: 16,
					color: Colors.light.button.text.default,
				}}
			>
				{title}
			</Text>
		</Pressable>
	);
}
