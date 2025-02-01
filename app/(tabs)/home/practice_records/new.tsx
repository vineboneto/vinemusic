import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { useMutation, useQuery } from "@/hooks/query";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { usePracticeStore } from "@/hooks/usePracticeStore";
import { useTheme } from "@/hooks/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function Index() {
	const { ColorTheme } = useTheme();
	const [instrument, setInstrument] = useState<string | null>(null);
	const [instrumentText, setInstrumentText] = useState<string>("");
	const [observation, setObservation] = useState<string>("");
	const { create } = usePracticeStore();
	const { options, create: createInstrument } = useInstrumentStore();
	const { mutate } = useMutation({
		fn: create,
		onSuccess: (result) => {
			if (!result) {
				Toast.show({
					type: ALERT_TYPE.DANGER,
					title: "Erro",
					textBody: "Error ao cadastrar, tente novamente mais tarde",
				});

				return;
			}
			router.push({
				pathname: "/home/practice_records/timer",
				params: { id: result },
			});
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
			const instrumentId = await createInstrument({ name: instrumentText });
			if (!instrumentId) {
				Toast.show({
					type: ALERT_TYPE.DANGER,
					title: "Error",
					textBody: "Erro ao criar instrumento, tente novamente mais tarde",
				});
				return;
			}
			return mutate({
				instrument_id: instrumentId,
				observation,
				status: "pendent",
				start_date: new Date(),
			});
		}

		return mutate({
			instrument_id: Number(instrument),
			observation,
			status: "pendent",
			start_date: new Date(),
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
				<View style={{ position: "relative" }}>
					<Input
						placeholder="Digite o Novo Instrumento"
						value={instrumentText}
						onChangeText={(e) => setInstrumentText(e)}
					/>
					<Pressable
						style={{ position: "absolute", right: 10, top: 15 }}
						onPress={() => setInstrument(null)}
					>
						<Feather name="x" size={28} color={ColorTheme.text} />
					</Pressable>
				</View>
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
