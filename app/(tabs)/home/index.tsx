import { Anchor } from "@/components/anchor";
import { Button } from "@/components/form/button";
import { type DateValue, InputDate } from "@/components/form/date";
import { Label } from "@/components/form/label";
import { ButtonActionsGroup } from "@/components/home/button-action";
import { Card } from "@/components/home/card";
import { Font } from "@/constants/Font";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

function Title() {
	return (
		<Text style={{ fontFamily: Font.InterRegular }}>
			Atividades de estudo mais recentes ...
		</Text>
	);
}

type MusicItemData = {
	status: "finish" | "pendent";
	title: string;
	timeInMinutes: number;
};

const data: MusicItemData[] = [
	{ status: "finish", title: "Piano", timeInMinutes: 30 },
	{ status: "pendent", title: "Guitarra", timeInMinutes: 60 * 4 },
];

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
					openFilter={() => setVisibleSearch(true)}
					openReport={() => setVisibleReport(true)}
				/>
				<Title />
				<SafeAreaView>
					<FlatList
						data={new Array(20).fill(0).map((_, idx) => data[idx % 2])}
						renderItem={({ item }) => (
							<Card
								title={item.title}
								timeInMinutes={item.timeInMinutes}
								status={item.status}
							/>
						)}
						keyExtractor={(item, idx) => idx.toString()}
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
