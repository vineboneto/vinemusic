import { Button } from "@/components/form/button";
import { Select } from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

const values = [
	{ value: "piano", label: "Piano" },
	{ value: "guitarra", label: "Guitarra" },
];

export default function Index() {
	const [instrument, setInstrument] = useState<string | null>(null);
	const [observation, setObservation] = useState<string>("");

	return (
		<View
			style={{
				flex: 1,
				marginHorizontal: 20,
				rowGap: 20,
				marginTop: 20,
			}}
		>
			<Select
				placeholder="Selecione um Instrumento"
				value={instrument}
				onChange={(v) => setInstrument(v)}
				options={values}
			/>
			<Textarea
				placeholder="Observações"
				value={observation}
				onChangeText={(v) => setObservation(v)}
			/>
			<Button onPress={() => router.push({ pathname: "/home/music/timer" })}>
				Iniciar
			</Button>
		</View>
	);
}
