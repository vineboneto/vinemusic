import { Colors } from "@/constants/Colors";
import { Font } from "@/constants/Font";
import { formatDate } from "@/utils";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

function GroupText({
	title,
	description,
}: { title: string; description: string }) {
	return (
		<View>
			<Text style={{ fontFamily: Font.InterRegular, fontSize: 16 }}>
				{title}:
			</Text>
			<Text
				style={{ fontFamily: Font.InterSemiBold, fontSize: 30 }}
				numberOfLines={1}
			>
				{description}
			</Text>
		</View>
	);
}

export default function Index() {
	return (
		<ScrollView
			style={{
				flex: 1,
				marginHorizontal: 20,
				marginBottom: 40,
			}}
		>
			<View
				style={{
					flex: 1,
					rowGap: 20,
				}}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Text style={{ fontFamily: Font.InterSemiBold, fontSize: 40 }}>
						Atividade Concluída
					</Text>
					<View
						style={{
							position: "absolute",
							top: 20,
							right: 10,
						}}
					>
						<View style={{ flexDirection: "row", columnGap: 20 }}>
							<Pressable>
								<Feather
									name="delete"
									color={Colors.light.button.container.danger}
									size={43}
								/>
							</Pressable>
							<Pressable
								onPress={() => router.push({ pathname: "/home/music/edit" })}
							>
								<Feather
									name="edit"
									color={Colors.light.button.container.sucess}
									size={40}
								/>
							</Pressable>
						</View>
					</View>
				</View>
				<GroupText title="Instrumento" description="Piano" />
				<GroupText title="Inicio" description={formatDate(new Date())} />
				<GroupText title="Fim" description={formatDate(new Date())} />
				<View
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<View style={{ maxWidth: 250 }}>
						<Text
							style={{
								fontSize: 24,
								fontFamily: Font.InterRegular,
								textAlign: "center",
							}}
						>
							Tempo praticado:
						</Text>
						<Text
							style={{
								fontSize: 64,
								fontFamily: Font.InterRegular,
								textAlign: "center",
							}}
						>
							14m
						</Text>
					</View>
				</View>
				<View>
					<Text>
						Estudado partituras e teória musical Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Illum cupiditate itaque velit tenetur
						necessitatibus, ad dicta voluptates facilis iusto aperiam,
						temporibus accusamus optio dolor laborum fuga perspiciatis assumenda
						esse dolores. Lorem ipsum dolor sit amet consectetur adipisicing
						elit. Adipisci a est temporibus iste. Dolor error, culpa magnam
						pariatur voluptatem iure facere fugit incidunt labore mollitia qui,
						odit debitis eius eos? Lorem ipsum, dolor sit amet consectetur
						adipisicing elit. Esse recusandae veritatis eius quis nobis numquam
						voluptate perferendis harum quaerat nisi laborum ea sed dolor odio
						exercitationem, est a cum earum.
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}
