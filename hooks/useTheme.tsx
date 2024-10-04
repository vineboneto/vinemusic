import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "react-native"; // Importando o hook
import { Colors } from "@/constants/Colors";

const THEME_KEY = "vinemusic_theme";

export type ThemeValue = typeof Colors.dark & typeof Colors.light;

type ContextData = {
	toggleTheme: () => Promise<void>;
	theme: "dark" | "light";
	ColorTheme: ThemeValue;
};

const ThemeContext = createContext<ContextData>({
	toggleTheme: () => Promise.resolve(),
	theme: "light",
	ColorTheme: Colors.light,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const colorScheme = useColorScheme(); // Obtendo o esquema de cores do dispositivo
	// color scheme
	const [theme, setTheme] = useState<"dark" | "light">(colorScheme ?? "light"); // Define o tema inicial com base no esquema do dispositivo

	useEffect(() => {
		const loadTheme = async () => {
			const savedTheme = await SecureStore.getItemAsync(THEME_KEY);
			if (savedTheme) {
				setTheme(savedTheme as "dark" | "light");
			} else {
				// Se não houver tema salvo, utiliza o esquema do dispositivo
				// color scheme
				setTheme(colorScheme ?? "light");
			}
		};

		loadTheme();
	}, [colorScheme]); // Dependência do colorScheme para atualizar o tema se mudar

	const toggleTheme = async () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		await SecureStore.setItemAsync(THEME_KEY, newTheme);
	};

	return (
		<ThemeContext.Provider
			value={{ theme, toggleTheme, ColorTheme: Colors[theme] }}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	return useContext(ThemeContext);
};
