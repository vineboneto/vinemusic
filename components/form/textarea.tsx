import { Colors } from "@/constants/Colors";
import type { ComponentProps } from "react";
import { TextInput } from "react-native";

export function Textarea({ ...rest }: ComponentProps<typeof TextInput>) {
	return (
		<TextInput
			editable
			textAlignVertical="top"
			selectionColor={Colors.light.text}
			placeholderTextColor={Colors.light.text}
			style={{
				backgroundColor: Colors.light.input,
				padding: 10,
				color: Colors.light.text,
				borderRadius: 8,
			}}
			multiline
			numberOfLines={5}
			maxLength={200}
			{...rest}
		/>
	);
}
