import { Button } from "@/components/form/button";
import { Font } from "@/constants/Font";
import { useMutation, useQuery } from "@/hooks/query";
import { useMusicStore } from "@/hooks/useMusicStore";
import { formatTextWithEllipsis } from "@/utils";
import { date } from "@/utils/date";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

export default function Index() {
	const { id } = useLocalSearchParams<{ id: string }>();

	const { finish, deleteById, fetchById } = useMusicStore();
	const { mutate } = useMutation({ fn: finish });
	const { mutate: mutateDelete } = useMutation({ fn: deleteById });
	const { data } = useQuery({
		fn: async () => {
			if (id) {
				return fetchById(Number(id));
			}
		},
	});

	const submit = async (endDate: Date) => {
		if (!id || !data) return;

		if (date.diffInMinutes(data.startDate, endDate) === 0) {
			Dialog.show({
				title: "Deseja continuar?",
				textBody:
					"Você praticou menos de um minuto, essa atividade não será contabilizada. ",
				type: ALERT_TYPE.WARNING,
				button: "Continuar",
				onPressButton: async () => {
					await mutateDelete(Number(id));
					router.replace("/home");
					Dialog.hide();
					Toast.show({
						type: ALERT_TYPE.INFO,
						textBody: "Atividade removida",
					});
				},
			});
			return;
		}

		try {
			await mutate({ endDate, id: Number(id) });
			router.replace({ pathname: "/home/music/end", params: { id } });
		} catch {}
	};

	return (
		<View
			style={{
				flex: 1,
				marginHorizontal: 20,
				marginTop: 20,
				rowGap: 20,
			}}
		>
			<View>
				<Text style={{ fontFamily: Font.InterSemiBold, fontSize: 40 }}>
					Praticando
				</Text>
				<Text
					style={{ fontFamily: Font.InterSemiBold, fontSize: 40 }}
					numberOfLines={2}
				>
					{formatTextWithEllipsis(data?.instrument)}
				</Text>
			</View>

			<View>
				<Text style={{ fontSize: 24, fontFamily: Font.InterRegular }}>
					Inicio:{" "}
					{data?.startDate.toLocaleString("pt-BR", {
						dateStyle: "medium",
						timeStyle: "short",
					})}
				</Text>
			</View>
			<View>
				<Button onPress={() => submit(new Date())}>Finalizar</Button>
			</View>
		</View>
	);
}
