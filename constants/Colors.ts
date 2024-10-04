const tintColorLight = "#fff";
const tintColorDark = "#fff";

export const Colors = {
	light: {
		text: "black",
		background: "#fff",
		tint: tintColorLight,
		icon: "black",
		input: "#D9D9D9",
		tabIconDefault: "#687076",
		tabIconSelected: tintColorLight,
		backgroundBar: "black",
		cardContent: "#E9E9E9",
		button: {
			text: {
				default: "#fff",
				sucess: "#fff",
				danger: "#fff",
				ghost: "black",
				disabled: "white",
			},
			container: {
				default: "black",
				sucess: "#008000",
				danger: "#FF0000",
				ghost: "transparent",
				disabled: "#D9D9D9",
			},
		},
	},
	dark: {
		text: "#fff",
		background: "#151718",
		backgroundBar: "black",
		input: "#333333",
		tint: tintColorDark,
		cardContent: "#333333",
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: tintColorDark,
		button: {
			text: {
				default: "#fff",
				sucess: "black",
				danger: "black",
				ghost: "#fff",
				disabled: "white",
			},
			container: {
				default: "#1F1F1F",
				sucess: "#008000",
				danger: "#FF0000",
				ghost: "transparent",
				disabled: "#D9D9D9",
			},
		},
	},
};
