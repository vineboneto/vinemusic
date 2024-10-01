import { Font } from "@/constants/Font";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				marginHorizontal: 20,
				rowGap: 20,
				marginTop: 20,
			}}
		>
			<Text style={{ fontFamily: Font.InterMedium, fontSize: 20 }}>
				Aplicativo desenvolvido por Vinicius
			</Text>
			<Text style={{ fontFamily: Font.InterRegular, fontSize: 14 }}>
				Objetivo desse aplicativo é registrar os estudos realizados pela pessoa
				em um instrumento musical, para que dessa forma quantifique o quanto de
				fato estuda e com isso se organize melhor
			</Text>
			<Text style={{ fontFamily: Font.InterRegular, fontSize: 14 }}>
				Versão 1.0.0
			</Text>
		</View>
	);
}
