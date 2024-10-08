import { Font } from "@/constants/Font";
import { useTheme } from "@/hooks/useTheme";
import type { ComponentProps } from "react";

import {
	ActivityIndicator,
	Pressable,
	type StyleProp,
	Text,
	View,
	type ViewStyle,
} from "react-native";

type Props = Omit<ComponentProps<typeof Pressable>, "style"> & {
	children: React.ReactNode | string;
	variant?: "sucess" | "danger" | "default" | "ghost";
	style?: StyleProp<ViewStyle>;
	isLoading?: boolean;
	startIcon?: React.ReactNode;
};

export function Button({
	children,
	style,
	isLoading = false,
	variant = "default",
	disabled,
	startIcon,
	...rest
}: Props) {
	const { ColorTheme } = useTheme();

	return (
		<Pressable
			style={[
				style,
				{
					display: "flex",
					justifyContent: "center",
					flexDirection: "row",
					alignItems: "center",
					paddingVertical: 15,
					borderRadius: 8,
					backgroundColor:
						ColorTheme.button.container[disabled ? "disabled" : variant], // Define a cor de fundo de acordo com o variant
				},
			]}
			{...rest}
		>
			{isLoading ? (
				<ActivityIndicator color={ColorTheme.text} />
			) : (
				<>
					{startIcon && <View style={{ marginRight: 10 }}>{startIcon}</View>}
					<Text
						style={{
							fontFamily: Font.InterRegular,
							fontSize: 16,
							color: ColorTheme.button.text[disabled ? "disabled" : variant],
						}}
					>
						{children}
					</Text>
				</>
			)}
		</Pressable>
	);
}
