import { Font } from "@/constants/Font";
import { useTheme } from "@/hooks/useTheme";
import { Text, View } from "react-native";

export default function Index() {
	const { ColorTheme } = useTheme();

	return (
		<View
			style={{
				flex: 1,
				marginHorizontal: 20,
				rowGap: 20,
				marginTop: 20,
			}}
		>
			<Text
				style={{
					fontFamily: Font.InterMedium,
					fontSize: 20,
					color: ColorTheme.text,
				}}
			>
				Aplicativo desenvolvido por Vinicius
			</Text>
			<Text
				style={{
					fontFamily: Font.InterRegular,
					fontSize: 14,
					color: ColorTheme.text,
				}}
			>
				Objetivo desse aplicativo é registrar os estudos realizados pela pessoa
				em um instrumento musical, para que dessa forma quantifique o quanto de
				fato estuda e com isso se organize melhor
			</Text>
			<Text
				style={{
					fontFamily: Font.InterRegular,
					fontSize: 14,
					color: ColorTheme.text,
				}}
			>
				Versão 1.0.0
			</Text>
		</View>
	);
}
