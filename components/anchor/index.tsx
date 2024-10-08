import { type ThemeValue, useTheme } from "@/hooks/useTheme";
import { useEffect, useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	Modal,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
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
	const { ColorTheme } = useTheme();
	const styles = stylesFN(ColorTheme);

	useEffect(() => {
		if (visible) {
			// Altera a cor da StatusBar quando o modal estiver visível
			// StatusBar.setBarStyle("light-content");
			// StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.5)", true);
			// Animação para mostrar o modal de baixo para cima
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 400,
				useNativeDriver: true,
			}).start();
		} else {
			// Restaura a cor original da StatusBar
			// StatusBar.setBarStyle("dark-content");
			// StatusBar.setBackgroundColor("transparent", true);
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
						backgroundColor: ColorTheme.background,
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

const stylesFN = (theme: ThemeValue) =>
	StyleSheet.create({
		overlay: {
			flex: 1,
			backgroundColor: "rgba(0, 0, 0, 0.5)",
		},
	});
