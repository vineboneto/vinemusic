import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
	openFilter: () => void;
	openReport: () => void;
	refetch: () => void;
};

export function ButtonActionsGroup({ openFilter, openReport, refetch }: Props) {
	return (
		<View style={styles.content}>
			<Pressable
				style={styles.button}
				onPress={() => router.push("/home/music/new")}
			>
				<Feather name="plus" color={Colors.light.icon} size={35} />
			</Pressable>
			<Pressable style={styles.button} onPress={() => openFilter()}>
				<Feather name="filter" color={Colors.light.icon} size={35} />
			</Pressable>
			<Pressable style={styles.button} onPress={() => openReport()}>
				<Feather name="file-text" color={Colors.light.icon} size={35} />
			</Pressable>
			<Pressable style={styles.button} onPress={() => refetch()}>
				<Feather name="refresh-cw" color={Colors.light.icon} size={35} />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		columnGap: 10,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		width: 45,
		padding: 2,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.light.icon,
	},
});
