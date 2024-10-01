import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { useMutation, useQuery } from "@/hooks/query";
import { useMusicStore } from "@/hooks/useMusicStore";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function Index() {
	const [instrument, setInstrument] = useState<string | null>(null);
	const [instrumentText, setInstrumentText] = useState<string>("");
	const [observation, setObservation] = useState<string>("");
	const { create, fetchDistinctInstruments } = useMusicStore();
	const { mutate } = useMutation({ fn: create });
	const { data, hasValue } = useQuery({
		fn: fetchDistinctInstruments,
	});

	async function submit() {
		if (!instrument?.trim()) {
			Toast.show({
				type: ALERT_TYPE.DANGER,
				title: "Validação",
				textBody: "Infome o instrumento",
			});
			return;
		}

		const isNewable = instrument === "newable";

		if (isNewable && !instrumentText.trim()) {
			Toast.show({
				type: ALERT_TYPE.DANGER,
				title: "Validação",
				textBody: "Infome o instrumento",
			});
			return;
		}

		async function run() {
			if (isNewable) {
				return mutate({
					instrument: instrumentText,
					observation,
					status: "pendent",
					startDate: new Date(),
				});
			}
			if (instrument) {
				return mutate({
					instrument,
					observation,
					status: "pendent",
					startDate: new Date(),
				});
			}
		}

		const result = await run();

		if (result) {
			router.push({ pathname: "/home/music/timer", params: { id: result.id } });
		}
	}

	return (
		<View
			style={{
				flex: 1,
				marginHorizontal: 20,
				rowGap: 20,
				marginTop: 20,
			}}
		>
			{instrument === "newable" ? (
				<Input
					placeholder="Digite o Novo Instrumento"
					value={instrumentText}
					onChangeText={(e) => setInstrumentText(e)}
				/>
			) : (
				<Select
					newable
					labelNewable="Novo Instrumento"
					placeholder="Selecione um Instrumento"
					value={instrument}
					onChange={(v) => setInstrument(v)}
					options={
						hasValue(data)
							? data.map(({ instrument }) => ({
									value: instrument,
									label: instrument,
								}))
							: []
					}
				/>
			)}
			<Textarea
				placeholder="Observações"
				value={observation}
				onChangeText={(v) => setObservation(v)}
			/>
			<Button onPress={submit}>Iniciar</Button>
		</View>
	);
}
