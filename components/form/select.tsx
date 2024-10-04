import { useTheme } from "@/hooks/useTheme";
import { Picker } from "@react-native-picker/picker";
import { Pressable } from "react-native";

type Props = {
	value: string | null;
	newable?: boolean;
	labelNewable?: string;
	onChange: (v: string | null) => void;
	options: { value: string; label: string }[];
	placeholder: string;
};

export function Select({
	value,
	newable = false,
	labelNewable = "Novo",
	onChange,
	options,
	placeholder,
}: Props) {
	const { ColorTheme } = useTheme();

	return (
		<Pressable
			style={{
				backgroundColor: ColorTheme.input,
				width: "100%",
				borderRadius: 8,
				height: 55,
			}}
		>
			<Picker
				selectedValue={value}
				mode="dropdown"
				numberOfLines={1}
				onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
			>
				<Picker.Item
					color="gray"
					style={{
						padding: 0,
						margin: 0,
						borderRadius: 8,
						backgroundColor: ColorTheme.cardContent,
						fontSize: 15,
					}}
					label={placeholder}
					value={null}
					key=""
				/>
				{newable && (
					<Picker.Item
						color={ColorTheme.button.container.sucess}
						style={{
							borderRadius: 8,
							padding: 0,
							margin: 0,
							backgroundColor: ColorTheme.cardContent,
							fontSize: 15,
						}}
						label={labelNewable}
						value="newable"
						key="newable"
					/>
				)}
				{options.map((v) => {
					return (
						<Picker.Item
							style={{
								borderRadius: 8,
								fontSize: 15,
								padding: 0,
								margin: 0,
								color: ColorTheme.text,
								backgroundColor: ColorTheme.cardContent,
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
