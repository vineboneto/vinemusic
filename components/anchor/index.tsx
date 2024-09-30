import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	Modal,
	StyleSheet,
	TouchableOpacity,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

type Props = {
	visible: boolean;
	onClose: () => void;
	height?: number;
	children: React.ReactNode;
};

export function Anchor({ visible, onClose, children, height = 300 }: Props) {
	const slideAnim = useRef(new Animated.Value(screenHeight)).current;

	useEffect(() => {
		if (visible) {
			// Animação para mostrar o modal de baixo para cima
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 400,
				useNativeDriver: true,
			}).start();
		} else {
			// Animação para esconder o modal
			Animated.timing(slideAnim, {
				toValue: screenHeight,
				duration: 400,
				useNativeDriver: true,
			}).start();
		}
	}, [visible, slideAnim]);

	return (
		<Modal transparent visible={visible} animationType="none">
			<StatusBar
				translucent
				backgroundColor={visible ? "rgba(0, 0, 0, 0.5)" : "transparent"}
				animated={false}
				hideTransitionAnimation="fade"
			/>
			<TouchableOpacity
				style={styles.overlay}
				activeOpacity={1}
				onPress={() => onClose()}
			/>

			<Animated.View
				style={[
					{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						height,
						backgroundColor: "#fff",
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						padding: 20,
					},
					{ transform: [{ translateY: slideAnim }] },
				]}
			>
				{children}
			</Animated.View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	openButton: {
		padding: 15,
		backgroundColor: "#007BFF",
		borderRadius: 5,
	},
	openButtonText: {
		color: "#fff",
		textAlign: "center",
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalText: {
		fontSize: 18,
		marginBottom: 20,
	},
	closeButton: {
		backgroundColor: "#FF0000",
		padding: 10,
		borderRadius: 5,
	},
	closeButtonText: {
		color: "#fff",
	},
});
