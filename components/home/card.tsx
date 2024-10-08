import { Font } from "@/constants/Font";
import type { MusicSchema } from "@/db/schema";
import { type ThemeValue, useTheme } from "@/hooks/useTheme";
import { formatText, formatTime } from "@/utils";
import { date } from "@/utils/date";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
	item: MusicSchema;
};

export function Card({
	item: { instrument, observation, id, startDate, endDate, status },
}: Props) {
	const { ColorTheme } = useTheme();
	const styles = stylesFN(ColorTheme);

	function Status() {
		function getStatus() {
			if (status === "finish") return "Finalizada";
			return "Pendente";
		}

		return (
			<Text
				style={{
					fontFamily: Font.InterBold,
					fontSize: 14,
					color: status === "finish" ? "#008000" : "#FFA500",
				}}
			>
				{getStatus()}
			</Text>
		);
	}

	const timeInMinutes =
		endDate && startDate ? date.diffInMinutes(startDate, endDate) : 0;

	return (
		<View style={styles.content}>
			<View style={styles.title}>
				<Text
					style={{
						fontFamily: Font.InterRegular,
						fontSize: 25,
						textTransform: "capitalize",
						color: ColorTheme.text,
					}}
					numberOfLines={1}
				>
					{formatText(instrument.name)}{" "}
					{status === "pendent" ? "∞" : formatTime(timeInMinutes)}
				</Text>
				<Text
					style={{
						fontFamily: Font.InterRegular,
						fontSize: 12,
						alignSelf: "flex-start",
						color: ColorTheme.text,
					}}
				>
					{startDate.toLocaleString("pt-BR", { dateStyle: "long" })}
				</Text>
			</View>
			<Text
				style={{
					fontFamily: Font.InterRegular,
					fontSize: 12,
					color: ColorTheme.text,
				}}
				numberOfLines={2}
			>
				{observation}
			</Text>
			<View style={styles.foooter}>
				<Status />
				<Pressable
					style={{
						alignSelf: "flex-end",
					}}
					onPress={() => {
						if (status === "finish") {
							return router.push({
								pathname: "/home/music/view",
								params: { id },
							});
						}

						router.push({
							pathname: "/home/music/timer",
							params: { id },
						});
					}}
				>
					<Text
						style={{
							fontFamily: Font.InterRegular,
							fontSize: 14,
							color: ColorTheme.text,
							textDecorationStyle: "solid",
							textDecorationLine: "underline",
							textDecorationColor: ColorTheme.text,
						}}
					>
						Ver atividade
					</Text>
				</Pressable>
			</View>
		</View>
	);
}

const stylesFN = (theme: ThemeValue) =>
	StyleSheet.create({
		content: {
			backgroundColor: theme.cardContent,
			paddingHorizontal: 10,
			paddingVertical: 10,
			borderRadius: 8,
			rowGap: 10,
		},
		title: {
			display: "flex",
			flexDirection: "row",
			color: theme.text,
			alignItems: "center",
			justifyContent: "space-between",
		},
		foooter: {
			marginTop: 10,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
	});
