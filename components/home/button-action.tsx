import { type ThemeValue, useTheme } from "@/hooks/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

type Props = {
	openFilter: () => void;
	openReport: () => void;
	refetch: () => void;
};

export function ButtonActionsGroup({ openFilter, openReport, refetch }: Props) {
	const { ColorTheme } = useTheme();

	const styles = stylesFN(ColorTheme);

	return (
		<View style={styles.content}>
			<Pressable
				style={styles.button}
				onPress={() => router.push("/home/music/new")}
			>
				<Feather name="plus" size={35} color={ColorTheme.text} />
			</Pressable>
			<Pressable style={styles.button} onPress={() => openFilter()}>
				<Feather name="filter" color={ColorTheme.text} size={35} />
			</Pressable>
			<Pressable style={styles.button} onPress={() => openReport()}>
				<Feather name="file-text" color={ColorTheme.text} size={35} />
			</Pressable>
			<Pressable style={styles.button} onPress={() => refetch()}>
				<Feather name="refresh-cw" color={ColorTheme.text} size={35} />
			</Pressable>
		</View>
	);
}

const stylesFN = (theme: ThemeValue) =>
	StyleSheet.create({
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
			borderColor: theme.text,
		},
	});
