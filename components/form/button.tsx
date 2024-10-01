import { Colors } from "@/constants/Colors";
import { Font } from "@/constants/Font";
import type { ComponentProps } from "react";

import { Pressable, type StyleProp, Text, type ViewStyle } from "react-native";

type Props = Omit<ComponentProps<typeof Pressable>, "style"> & {
	children: string;
	variant?: "sucess" | "danger" | "default" | "ghost";
	style?: StyleProp<ViewStyle>;
};

export function Button({
	children,
	style,
	variant = "default",
	...rest
}: Props) {
	return (
		<Pressable
			style={[
				style,
				{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					paddingVertical: 15,
					borderRadius: 8,
					backgroundColor: Colors.light.button.container[variant], // Define a cor de fundo de acordo com o variant
				},
			]}
			{...rest}
		>
			<Text
				style={{
					fontFamily: Font.InterRegular,
					fontSize: 16,
					color: Colors.light.button.text[variant],
				}}
			>
				{children}
			</Text>
		</Pressable>
	);
}
