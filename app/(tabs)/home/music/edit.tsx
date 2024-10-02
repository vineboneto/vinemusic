import { Button } from "@/components/form/button";
import { type DateValue, InputDate } from "@/components/form/date";
import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import { Select } from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { Loading } from "@/components/loading";
import { useMutation, useQuery } from "@/hooks/query";
import { useInstrumentStore } from "@/hooks/useInstrumentStore";
import { useMusicStore } from "@/hooks/useMusicStore";
import { date } from "@/utils/date";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function Index() {
	const [instrument, setInstrument] = useState<string | null>(null);
	const [instrumentText, setInstrumentText] = useState<string>("");
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

	const { id } = useLocalSearchParams<{ id: string }>();
	const { options: fetchOptions, create: createInstrument } =
		useInstrumentStore();
	const { fetchById, update } = useMusicStore();
	const { mutate } = useMutation<
		unknown,
		{
			startDate: Date;
			endDate: Date;
			observation: string | null;
			idInstrument: number;
			id: number;
		}
	>({
		fn: async (data) => {
			const totalInMinutes = date.diffInMinutes(data.startDate, data.endDate);
			await update({ ...data, totalInMinutes });
		},
		onSuccess: () => {
			Toast.show({
				type: ALERT_TYPE.SUCCESS,
				title: "Atualizado com sucesso",
			});
			router.back();
		},
		onError: (err) => {
			Toast.show({
				type: ALERT_TYPE.DANGER,
				title: "Erro",
				textBody: err.message,
			});
		},
	});

	const { data, isOk, isUndefined, isLoading, isError, error } = useQuery({
		fn: async () => {
			if (id) {
				return fetchById(Number(id));
			}
		},
	});
	const { data: options, isOk: isOkOptions } = useQuery({
		fn: fetchOptions,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isOk) {
			setInstrument(data.instrument.id.toString());
			setObservation(data.observation || "");
			setDateInitial({ date: data.startDate, open: false });
			setDateFinal({ date: data.endDate || undefined, open: false });
			setTimeInitial({ date: data.startDate, open: false });
			setTimeFinal({ date: data.endDate || undefined, open: false });
		}
	}, [isOk]);

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		return <Text>{error.message}</Text>;
	}

	if (isUndefined) {
		return <Text>Data não encontrado</Text>;
	}

	const submit = async () => {
		if (!id) return;

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

		if (
			!dateInitial.date ||
			!dateFinal.date ||
			!timeInitial.date ||
			!timeFinal.date
		) {
			Toast.show({
				type: ALERT_TYPE.DANGER,
				title: "Validação",
				textBody: "Infome os campos de data",
			});
			return;
		}

		const startDate = date.combineDateTime(dateInitial.date, timeInitial.date);
		const endDate = date.combineDateTime(dateFinal.date, timeFinal.date);

		if (startDate.getTime() > endDate.getTime()) {
			Toast.show({
				type: ALERT_TYPE.DANGER,
				title: "Validação",
				textBody: "Data inicial não pode ser maior que data final",
			});
			return;
		}

		if (isNewable) {
			const instrument = await createInstrument({ name: instrumentText });
			return mutate({
				idInstrument: instrument.id,
				observation,
				startDate,
				endDate,
				id: Number(id),
			});
		}

		return mutate({
			idInstrument: Number(instrument),
			observation,
			startDate,
			endDate,
			id: Number(id),
		});
	};

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
						options={isOkOptions ? options : []}
					/>
				)}
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
				variant="sucess"
				onPress={() => submit()}
			>
				Salvar
			</Button>
		</View>
	);
}
