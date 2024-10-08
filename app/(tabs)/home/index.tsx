import { Anchor } from "@/components/anchor";
import { Button } from "@/components/form/button";
import { type DateValue, InputDate } from "@/components/form/date";
import { Label } from "@/components/form/label";
import * as FileSystem from "expo-file-system";
import { ButtonActionsGroup } from "@/components/home/button-action";
import { Card } from "@/components/home/card";
import { Font } from "@/constants/Font";
import { useQuery } from "@/hooks/query";
import { useMusicStore } from "@/hooks/useMusicStore";
import { router } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	Text,
	View,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useTheme } from "@/hooks/useTheme";
import { StatusBar } from "expo-status-bar";

function Title({ hasValue }: { hasValue: boolean }) {
	const { ColorTheme } = useTheme();

	return (
		<Text style={{ fontFamily: Font.InterRegular, color: ColorTheme.text }}>
			{hasValue
				? "Atividades de estudo mais recentes ..."
				: "Nenhuma atividade encontrada"}
		</Text>
	);
}

export default function Index() {
	const { ColorTheme, theme } = useTheme();
	const [visibleSearch, setVisibleSearch] = useState(false);
	const [visibleReport, setVisibleReport] = useState(false);
	const [dateInitial, setDateInitial] = useState<DateValue>({
		date: undefined,
		open: false,
	});
	const [dateFinal, setDateFinal] = useState<DateValue>({
		date: undefined,
		open: false,
	});
	const [dateInitialReport, setDateInitialReport] = useState<DateValue>({
		date: undefined,
		open: false,
	});
	const [dateFinalReport, setDateFinalReport] = useState<DateValue>({
		date: undefined,
		open: false,
	});

	const { fetch } = useMusicStore();
	const { data, isUndefined, isLoading, refetch } = useQuery({
		fn: () => fetch({ startDate: dateInitial.date, endDate: dateFinal.date }),
	});

	const search = () => {
		if (
			dateInitial.date &&
			dateFinal.date &&
			dateInitial.date.getTime() > dateFinal.date.getTime()
		)
			return Toast.show({
				title: "Data inicial não pode ser maior que data final",
				type: ALERT_TYPE.DANGER,
			});
		refetch();
		setVisibleSearch(false);
	};

	const _list = async () => {
		try {
			// Caminho para o diretório SQLite
			const sqliteDirectory = `${FileSystem.documentDirectory}SQLite/`;

			// Listar os arquivos no diretório SQLite
			const files = await FileSystem.readDirectoryAsync(sqliteDirectory);
			console.log("Arquivos no diretório SQLite:", files);
		} catch (error) {
			console.error("Erro ao listar arquivos no diretório SQLite:", error);
		}
	};

	const report = () => {
		if (!dateInitialReport.date || !dateFinalReport.date) {
			return Toast.show({
				title: "Preencha data inicial e final",
				type: ALERT_TYPE.DANGER,
			});
		}
		if (dateInitialReport.date.getTime() > dateFinalReport.date.getTime())
			return Toast.show({
				title: "Data inicial não pode ser maior que data final",
				type: ALERT_TYPE.DANGER,
			});
		setVisibleReport(false);
		router.push({
			pathname: "/home/music/report",
			params: {
				startDate: dateInitialReport.date.toISOString(),
				endDate: dateFinalReport.date.toISOString(),
			},
		});
	};

	return (
		<>
			<StatusBar translucent style={theme === "dark" ? "light" : "dark"} />
			<View
				style={{
					flex: 1,
					marginHorizontal: 20,
					rowGap: 20,
					marginTop: 20,
					marginBottom: 115,
				}}
			>
				<ButtonActionsGroup
					refetch={() => refetch()}
					openFilter={() => setVisibleSearch(true)}
					openReport={() => setVisibleReport(true)}
				/>
				<Title hasValue={!isUndefined && data.length > 0} />
				<SafeAreaView>
					{isLoading ? (
						<ActivityIndicator color={ColorTheme.text} size="large" />
					) : (
						<FlatList
							data={data}
							renderItem={({ item }) => <Card item={item} />}
							keyExtractor={(item, idx) => item.id.toString()}
							ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
						/>
					)}
				</SafeAreaView>
			</View>
			<Anchor
				visible={visibleSearch}
				onClose={() => setVisibleSearch(false)}
				height={450}
			>
				<View style={{ rowGap: 20 }}>
					<Text
						style={{
							fontFamily: Font.InterMedium,
							fontSize: 20,
							color: ColorTheme.text,
						}}
					>
						Filtrar Atividades
					</Text>
					<View>
						<Label>Data Inicial</Label>
						<InputDate
							value={dateInitial}
							setValue={setDateInitial}
							mode="date"
							placeholder="Data Inicial"
						/>
					</View>
					<View>
						<Label>Data Final</Label>
						<InputDate
							value={dateFinal}
							setValue={setDateFinal}
							mode="date"
							placeholder="Data Final"
						/>
					</View>
					<Button onPress={() => search()}>Buscar</Button>
					<Button
						onPress={() => {
							setDateInitial({ date: undefined, open: false });
							setDateFinal({ date: undefined, open: false });
						}}
					>
						Limpar
					</Button>
				</View>
			</Anchor>
			<Anchor
				visible={visibleReport}
				onClose={() => setVisibleReport(false)}
				height={400}
			>
				<View style={{ rowGap: 20 }}>
					<Text
						style={{
							fontFamily: Font.InterMedium,
							fontSize: 20,
							color: ColorTheme.text,
						}}
					>
						Relatório dos meus estudos
					</Text>
					<View>
						<Label>Data Inicial</Label>
						<InputDate
							value={dateInitialReport}
							setValue={setDateInitialReport}
							mode="date"
							placeholder="Data Inicial"
						/>
					</View>
					<View>
						<Label>Data Final</Label>
						<InputDate
							value={dateFinalReport}
							setValue={setDateFinalReport}
							mode="date"
							placeholder="Data Final"
						/>
					</View>
					<Button onPress={() => report()}>Gerar</Button>
				</View>
			</Anchor>
		</>
	);
}
