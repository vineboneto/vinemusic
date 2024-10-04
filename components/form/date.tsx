import { Font } from "@/constants/Font";
import { useTheme } from "@/hooks/useTheme";
import { formatDateOnly, formatTimeOnly } from "@/utils";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import { Pressable, Text, TouchableWithoutFeedback } from "react-native";

export type DateValue = { open: boolean; date: Date | undefined };

type Props = {
	mode: "time" | "date";
	value: DateValue;
	setValue: React.Dispatch<React.SetStateAction<DateValue>>;
	placeholder: string;
};

export function InputDate({ value, setValue, mode, placeholder }: Props) {
	const { ColorTheme } = useTheme();

	function formatInput() {
		if (mode === "date") {
			return value.date ? formatDateOnly(value.date) : placeholder;
		}

		return value.date ? formatTimeOnly(value.date) : placeholder;
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				setValue((old) => ({ ...old, open: false }));
			}}
		>
			<Pressable
				onPress={() => setValue((old) => ({ ...old, open: true }))}
				style={{
					backgroundColor: ColorTheme.input,
					paddingHorizontal: 20,
					paddingVertical: 10,
					height: 55,
					justifyContent: "center",
					width: "auto",
					borderRadius: 8,
				}}
			>
				<Text
					style={{
						fontFamily: Font.InterRegular,
						color: ColorTheme.text,
					}}
				>
					{formatInput()}
				</Text>

				{value.open && (
					<RNDateTimePicker
						mode={mode}
						positiveButton={{ textColor: ColorTheme.background }}
						negativeButton={{ textColor: ColorTheme.background }}
						neutralButton={{ textColor: ColorTheme.background }}
						textColor={ColorTheme.background}
						accentColor={ColorTheme.background}
						display="spinner"
						timeZoneName="America/Sao_Paulo"
						themeVariant="light"
						value={value.date || new Date()}
						onChange={(event, date) => {
							setValue((old) => ({ open: false, date }));
						}}
					/>
				)}
			</Pressable>
		</TouchableWithoutFeedback>
	);
}
