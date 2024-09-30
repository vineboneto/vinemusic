import { ButtonActionsGroup } from "@/components/home/button-action";
import { Card } from "@/components/home/card";
import { Font } from "@/constants/Font";
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
	return (
		<View
			style={{
				flex: 1,
				marginHorizontal: 20,
				rowGap: 20,
				marginTop: 20,
				marginBottom: 115,
			}}
		>
			<ButtonActionsGroup />
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
	);
}
