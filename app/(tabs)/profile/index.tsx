import { Font } from "@/constants/Font";
import { useTheme } from "@/hooks/useTheme";
import { useAuth, useUser } from "@clerk/clerk-expo";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

import {
	Pressable,
	Text,
	View,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";

const blurhash =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Index() {
	const { ColorTheme, theme, toggleTheme } = useTheme();

	const { signOut } = useAuth();
	const { user } = useUser();

	return (
		<>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
							fontFamily: Font.InterSemiBold,
							fontSize: 30,
							textAlign: "center",
							color: ColorTheme.text,
						}}
					>
						Meus Dados
					</Text>

					<View
						style={{
							width: "100%",
							alignItems: "center",
							justifyContent: "center",
							rowGap: 20,
						}}
					>
						<Image
							source={user?.imageUrl}
							placeholder={{ blurhash }}
							contentFit="cover"
							style={{
								height: 100,
								width: 100,
								borderRadius: 200,
							}}
							transition={1000}
						/>
						<Text
							style={{
								fontFamily: Font.InterRegular,
								fontSize: 20,
								color: ColorTheme.text,
							}}
						>
							{user?.fullName || ""}
						</Text>

						<View
							style={{
								columnGap: 20,
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Pressable
								onPress={toggleTheme}
								style={{
									...(theme === "dark" && {
										borderWidth: 1,
										borderColor: ColorTheme.text,
										borderRadius: 200,
									}),
									padding: 10,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Ionicons name="moon" size={25} color={ColorTheme.text} />
							</Pressable>
							<Pressable
								onPress={toggleTheme}
								style={{
									...(theme === "light" && {
										borderWidth: 1,
										borderColor: ColorTheme.text,
										borderRadius: 200,
									}),
									padding: 10,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Ionicons name="sunny" size={30} color={ColorTheme.text} />
							</Pressable>
						</View>
					</View>

					<View
						style={{
							flex: 1,
							justifyContent: "flex-end",
							alignItems: "center",
							marginBottom: 60,
						}}
					>
						<Pressable
							style={{
								flexDirection: "row",
								alignItems: "center",
								columnGap: 10,
							}}
							onPress={() => signOut()}
						>
							<Feather
								name="log-out"
								size={20}
								color={ColorTheme.text}
								style={{ transform: [{ rotate: "180deg" }] }}
							/>
							<Text
								style={{
									fontFamily: Font.InterRegular,
									fontSize: 16,
									color: ColorTheme.text,
								}}
							>
								Sair
							</Text>
						</Pressable>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
}
