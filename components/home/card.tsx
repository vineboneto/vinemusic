import { Colors } from "@/constants/Colors";
import { Font } from "@/constants/Font";
import { formatText, formatTime } from "@/utils";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
	status: "finish" | "pendent";
	title: string;
	observation: string | null;
	timeInMinutes: number;
};

export function Card({ status, title, observation, timeInMinutes }: Props) {
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

	return (
		<View style={styles.content}>
			<View style={styles.title}>
				<Text
					style={{
						fontFamily: Font.InterRegular,
						fontSize: 25,
					}}
					numberOfLines={1}
				>
					{formatText(title)} {formatTime(timeInMinutes)}
				</Text>
				<Text
					style={{
						fontFamily: Font.InterRegular,
						fontSize: 12,
						alignSelf: "flex-start",
					}}
				>
					Domingo (22/04/2024)
				</Text>
			</View>
			<Text
				style={{
					fontFamily: Font.InterRegular,
					fontSize: 12,
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
					onPress={() =>
						router.push({
							pathname: "/home/music/view",
						})
					}
				>
					<Text
						style={{
							fontFamily: Font.InterRegular,
							fontSize: 14,
							textDecorationStyle: "solid",
							textDecorationLine: "underline",
							textDecorationColor: Colors.light.text,
						}}
					>
						Ver atividade
					</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: "#E9E9E9",
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 8,
		rowGap: 10,
	},
	title: {
		display: "flex",
		flexDirection: "row",
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
