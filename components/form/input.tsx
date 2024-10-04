import { useTheme } from "@/hooks/useTheme";
import type { ComponentProps } from "react";
import { TextInput } from "react-native";

export function Input({ ...rest }: ComponentProps<typeof TextInput>) {
	const { ColorTheme } = useTheme();

	return (
		<TextInput
			editable
			selectionColor={ColorTheme.text}
			placeholderTextColor={ColorTheme.text}
			style={{
				backgroundColor: ColorTheme.input,
				padding: 10,
				color: ColorTheme.text,
				borderRadius: 8,
			}}
			{...rest}
		/>
	);
}
