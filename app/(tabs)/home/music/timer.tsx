import { Button } from "@/components/form/button";
import { Font } from "@/constants/Font";
import { useMutation, useQuery } from "@/hooks/query";
import { useMusicStore } from "@/hooks/useMusicStore";
import { useTheme } from "@/hooks/useTheme";
import { formatTextWithEllipsis } from "@/utils";
import { date } from "@/utils/date";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

export default function Index() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { ColorTheme } = useTheme();

	const { finish, deleteById, fetchById } = useMusicStore();
	const { mutate } = useMutation<"invalid" | "home" | "next" | "wait", Date>({
		fn: async (endDate: Date) => {
			if (!id || !data) return "invalid";

			if (date.diffInMinutes(data.startDate, endDate) === 0) {
				const result = await new Promise<"home" | "wait">((resolve, reject) => {
					Dialog.show({
						title: "Deseja continuar?",
						textBody:
							"Você praticou menos de um minuto, essa atividade não será contabilizada. ",
						type: ALERT_TYPE.WARNING,
						button: "Continuar",
						onPressButton: async () => {
							deleteById(Number(id))
								.then(() => resolve("home"))
								.catch(reject);
						},
						onHide: () => resolve("wait"),
					});
				});

				return result;
			}

			const totalInMinutes = date.diffInMinutes(data.startDate, endDate);

			await finish({ endDate, id: Number(id), totalInMinutes });

			return "next";
		},
		onSuccess: (result) => {
			if (result === "home") {
				router.replace("/home");
				Dialog.hide();
				Toast.show({
					type: ALERT_TYPE.INFO,
					textBody: "Atividade removida",
				});
			}
			if (result === "next") {
				router.replace({ pathname: "/home/music/end", params: { id } });
			}
		},
		onError: (err) => {
			Toast.show({
				type: ALERT_TYPE.DANGER,
				title: "Erro",
				textBody: err.message,
			});
		},
	});

	const { data } = useQuery({
		fn: async () => {
			if (id) {
				return fetchById(Number(id));
			}
		},
	});

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
				<Text
					style={{
						fontFamily: Font.InterSemiBold,
						fontSize: 40,
						color: ColorTheme.text,
					}}
				>
					Praticando
				</Text>
				<Text
					style={{
						fontFamily: Font.InterSemiBold,
						fontSize: 40,
						color: ColorTheme.text,
						textTransform: "capitalize",
					}}
					numberOfLines={2}
				>
					{formatTextWithEllipsis(data?.instrument.name)}
				</Text>
			</View>

			<View>
				<Text
					style={{
						fontSize: 24,
						fontFamily: Font.InterRegular,
						color: ColorTheme.text,
					}}
				>
					Inicio:{" "}
					{data?.startDate.toLocaleString("pt-BR", {
						dateStyle: "medium",
						timeStyle: "short",
					})}
				</Text>
			</View>
			<View>
				<Button onPress={() => mutate(new Date())}>Finalizar</Button>
			</View>
		</View>
	);
}
