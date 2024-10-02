import { Anchor } from "@/components/anchor";
import { Button } from "@/components/form/button";
import { type DateValue, InputDate } from "@/components/form/date";
import { Label } from "@/components/form/label";
import { ButtonActionsGroup } from "@/components/home/button-action";
import { Card } from "@/components/home/card";
import { Font } from "@/constants/Font";
import { useQuery } from "@/hooks/query";
import { useMusicStore } from "@/hooks/useMusicStore";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

function Title({ hasValue }: { hasValue: boolean }) {
	return (
		<Text style={{ fontFamily: Font.InterRegular }}>
			{hasValue
				? "Atividades de estudo mais recentes ..."
				: "Nenhuma atividade encontrada"}
		</Text>
	);
}

export default function Index() {
	const [visibleSearch, setVisibleSearch] = useState(false);
	const [visibleReport, setVisibleReport] = useState(false);
	const [dateInitial, setDateInitial] = useState<DateValue>({
		date: new Date(),
		open: false,
	});
	const [dateFinal, setDateFinal] = useState<DateValue>({
		date: new Date(),
		open: false,
	});

	const { fetch } = useMusicStore();
	const { data, isUndefined, refetch } = useQuery({ fn: fetch });

	return (
		<>
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
				<Title hasValue={isUndefined} />
				<SafeAreaView>
					<FlatList
						data={data}
						renderItem={({ item }) => <Card item={item} />}
						keyExtractor={(item, idx) => item.id.toString()}
						ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
					/>
				</SafeAreaView>
			</View>
			<Anchor
				visible={visibleSearch}
				onClose={() => setVisibleSearch(false)}
				height={400}
			>
				<View style={{ rowGap: 20 }}>
					<Text style={{ fontFamily: Font.InterMedium, fontSize: 20 }}>
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
					<Button onPress={() => setVisibleSearch(false)}>Buscar</Button>
				</View>
			</Anchor>
			<Anchor
				visible={visibleReport}
				onClose={() => setVisibleReport(false)}
				height={400}
			>
				<View style={{ rowGap: 20 }}>
					<Text style={{ fontFamily: Font.InterMedium, fontSize: 20 }}>
						Relatório dos meus estudos
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
					<Button
						onPress={() => {
							setVisibleReport(false);
							router.push({ pathname: "/home/music/report" });
						}}
					>
						Gerar
					</Button>
				</View>
			</Anchor>
		</>
	);
}
