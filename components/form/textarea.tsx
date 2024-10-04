import { useTheme } from "@/hooks/useTheme";
import type { ComponentProps } from "react";
import { TextInput } from "react-native";

export function Textarea({ ...rest }: ComponentProps<typeof TextInput>) {
	const { ColorTheme } = useTheme();

	return (
		<TextInput
			editable
			textAlignVertical="top"
			selectionColor={ColorTheme.text}
			placeholderTextColor={ColorTheme.text}
			style={{
				backgroundColor: ColorTheme.input,
				paddingHorizontal: 20,
				paddingVertical: 10,
				color: ColorTheme.text,
				borderRadius: 8,
			}}
			multiline
			numberOfLines={5}
			maxLength={200}
			{...rest}
		/>
	);
}
