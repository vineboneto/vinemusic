import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { useMutation, useQuery } from "@/hooks/query";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { useMusicStore } from "@/hooks/useMusicStore";
import { useTheme } from "@/hooks/useTheme";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function Index() {
	const { ColorTheme } = useTheme();
	const [instrument, setInstrument] = useState<string | null>(null);
	const [instrumentText, setInstrumentText] = useState<string>("");
	const [observation, setObservation] = useState<string>("");
	const { create } = useMusicStore();
	const { options, create: createInstrument } = useInstrumentStore();
	const { mutate } = useMutation({
		fn: create,
		onSuccess: (result) => {
			router.push({ pathname: "/home/music/timer", params: { id: result.id } });
		},
		onError: (err) => {
			Toast.show({
				type: ALERT_TYPE.DANGER,
				title: "Erro",
				textBody: err.message,
			});
		},
	});
	const { data, isOk } = useQuery({
		fn: options,
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

		if (isNewable) {
			const instrument = await createInstrument({ name: instrumentText });
			return mutate({
				idInstrument: instrument.id,
				observation,
				status: "pendent",
				startDate: new Date(),
			});
		}

		return mutate({
			idInstrument: Number(instrument),
			observation,
			status: "pendent",
			startDate: new Date(),
		});
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
					options={isOk ? data : []}
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
