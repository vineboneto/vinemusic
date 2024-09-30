import { Colors } from "@/constants/Colors";
import { Font } from "@/constants/Font";
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
					backgroundColor: Colors.light.input,
					paddingHorizontal: 20,
					paddingVertical: 10,
					height: 55,
					justifyContent: "center",
					width: "auto",
					borderRadius: 8,
				}}
			>
				<Text style={{ fontFamily: Font.InterRegular }}>{formatInput()}</Text>

				{value.open && (
					<RNDateTimePicker
						mode={mode}
						positiveButton={{ textColor: Colors.light.background }}
						negativeButton={{ textColor: Colors.light.background }}
						neutralButton={{ textColor: Colors.light.background }}
						textColor={Colors.light.background}
						accentColor={Colors.light.background}
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
