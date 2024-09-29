import { Font } from "@/constants/Font";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ fontFamily: Font.InterRegular }}>Home</Text>
		</View>
	);
}
