import { Anchor } from "@/components/anchor";
import { Button } from "@/components/form/button";
import { Colors } from "@/constants/Colors";
import { Font } from "@/constants/Font";
import { useMutation, useQuery } from "@/hooks/query";
import { useMusicStore } from "@/hooks/useMusicStore";
import { formatDate, formatTime } from "@/utils";
import { date } from "@/utils/date";
import Feather from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

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
	const [visible, setVisible] = useState(false);
	const { id } = useLocalSearchParams<{ id: string }>();
	const { fetchById, deleteById } = useMusicStore();
	const { data, isUndefined, isLoading, isError, error } = useQuery({
		fn: async () => {
			if (id) {
				return fetchById(Number(id));
			}
		},
	});

	const { mutate } = useMutation<unknown, number>({
		fn: deleteById,
		onSuccess: () => {
			Toast.show({
				type: ALERT_TYPE.SUCCESS,
				title: "Excluído com sucesso",
			});
			setVisible(false);
			router.replace("/home");
		},
		onError: (err) => {
			setVisible(false);
			Toast.show({
				type: ALERT_TYPE.DANGER,
				title: "Erro",
				textBody: err.message,
			});
		},
	});

	if (isLoading) {
		return <Text>Carregando...</Text>;
	}

	if (isError) {
		return <Text>{error.message}</Text>;
	}

	if (isUndefined) {
		return <Text>Data não encontrado</Text>;
	}

	const timeInMinutes = data.endDate
		? date.diffInMinutes(data.startDate, data.endDate)
		: 0;

	return (
		<>
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
								<Pressable onPress={() => setVisible(true)}>
									<Feather
										name="delete"
										color={Colors.light.button.container.danger}
										size={43}
									/>
								</Pressable>
								<Pressable
									onPress={() =>
										router.push({
											pathname: "/home/music/edit",
											params: { id: data.id },
										})
									}
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
					<GroupText title="Instrumento" description={data.instrument} />
					<GroupText title="Inicio" description={formatDate(data.startDate)} />
					{data.endDate && (
						<GroupText title="Fim" description={formatDate(data.endDate)} />
					)}
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
								{formatTime(timeInMinutes)}
							</Text>
						</View>
					</View>
					<View>
						<Text>{data.observation}</Text>
					</View>
				</View>
			</ScrollView>

			<Anchor visible={visible} onClose={() => setVisible(false)}>
				<View>
					<Text style={{ fontFamily: Font.InterMedium, fontSize: 20 }}>
						Tem certeza que deseja excluir essa atividade? Essa operação é
						irreversível!
					</Text>
					<Button
						style={{ marginTop: 40 }}
						variant="danger"
						onPress={() => mutate(data.id)}
					>
						Excluir
					</Button>
				</View>
			</Anchor>
		</>
	);
}
