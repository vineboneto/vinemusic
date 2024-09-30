import { Colors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { useRef } from "react";
import { Pressable } from "react-native";

type Props = {
	value: string | null;
	onChange: (v: string | null) => void;
	options: { value: string; label: string }[];
	placeholder: string;
};

export function Select({ value, onChange, options, placeholder }: Props) {
	const ref = useRef<Picker<string | null> | null>(null);

	return (
		<Pressable
			style={{
				backgroundColor: Colors.light.input,
				width: "100%",
				borderRadius: 8,
			}}
		>
			<Picker
				selectedValue={value}
				mode="dialog"
				numberOfLines={1}
				onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
			>
				<Picker.Item
					color="gray"
					style={{
						borderRadius: 8,
						fontSize: 15,
					}}
					label={placeholder}
					value={null}
					key=""
				/>
				{options.map((v) => {
					return (
						<Picker.Item
							style={{
								borderRadius: 8,
								fontSize: 15,
								color: Colors.light.text,
							}}
							key={v.value}
							label={v.label}
							value={v.value}
						/>
					);
				})}
			</Picker>
		</Pressable>
	);
}
