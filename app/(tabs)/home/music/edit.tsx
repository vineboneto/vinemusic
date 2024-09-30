import { Button } from "@/components/form/button";
import { type DateValue, InputDate } from "@/components/form/date";
import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import { Select } from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { Colors } from "@/constants/Colors";
import { Font } from "@/constants/Font";
import { formatDateOnly } from "@/utils";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View, TouchableWithoutFeedback } from "react-native";

const values = [
	{ value: "piano", label: "Piano" },
	{ value: "guitarra", label: "Guitarra" },
];

export default function Index() {
	const [instrument, setInstrument] = useState<string | null>(null);
	const [observation, setObservation] = useState<string>("");
	const [dateInitial, setDateInitial] = useState<DateValue>({
		date: new Date(),
		open: false,
	});
	const [timeInitial, setTimeInitial] = useState<DateValue>({
		date: new Date(),
		open: false,
	});
	const [dateFinal, setDateFinal] = useState<DateValue>({
		date: new Date(),
		open: false,
	});
	const [timeFinal, setTimeFinal] = useState<DateValue>({
		date: new Date(),
		open: false,
	});

	return (
		<View
			style={{
				flex: 1,
				marginHorizontal: 20,
				rowGap: 10,
			}}
		>
			<View>
				<Label>Instrumento</Label>
				<Select
					placeholder="Selecione um Instrumento"
					value={instrument}
					onChange={(v) => setInstrument(v)}
					options={values}
				/>
			</View>
			<View>
				<Label>Data Inicial</Label>
				<View
					style={{
						flexDirection: "row",
						columnGap: 20,
						justifyContent: "space-between",
					}}
				>
					<View style={{ flex: 1 }}>
						<InputDate
							value={dateInitial}
							setValue={setDateInitial}
							mode="date"
							placeholder="Data Inicial"
						/>
					</View>
					<View style={{ flex: 1 }}>
						<InputDate
							value={timeInitial}
							setValue={setTimeInitial}
							mode="time"
							placeholder="Hora Inicial"
						/>
					</View>
				</View>
			</View>
			<View>
				<Label>Data Final</Label>
				<View
					style={{
						flexDirection: "row",
						columnGap: 20,
						justifyContent: "space-between",
					}}
				>
					<View style={{ flex: 1 }}>
						<InputDate
							value={dateFinal}
							setValue={setDateFinal}
							mode="date"
							placeholder="Data Final"
						/>
					</View>
					<View style={{ flex: 1 }}>
						<InputDate
							value={timeFinal}
							setValue={setTimeFinal}
							mode="time"
							placeholder="Hora Final"
						/>
					</View>
				</View>
			</View>

			<View>
				<Label>Observações</Label>
				<Textarea
					placeholder="Observações"
					value={observation}
					onChangeText={(v) => setObservation(v)}
				/>
			</View>

			<Button
				style={{ marginTop: 10 }}
				title="Salvar"
				variant="sucess"
				onPress={() => router.back()}
			/>
		</View>
	);
}
