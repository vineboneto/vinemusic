import { Colors } from "@/constants/Colors";
import { Font } from "@/constants/Font";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
	return (
		<Tabs
			sceneContainerStyle={{
				backgroundColor: Colors.light.background,
			}}
			screenOptions={{
				tabBarActiveTintColor: Colors.light.background,
				tabBarItemStyle: {
					backgroundColor: Colors.dark.background,
				},
				tabBarShowLabel: false,
				headerTitleAlign: "center",
				headerShadowVisible: false,
				tabBarStyle: {
					// backgroundColor: Colors.light.background,
					backgroundColor: "red",
					height: 60,
					shadowOpacity: 0,
					elevation: 0,
					borderTopWidth: 0,
				},
				headerTitle: (props) => (
					<Text
						{...props}
						style={{ fontSize: 24, fontFamily: Font.JungleRegular }}
					>
						Vine Music
					</Text>
				),
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={28} name="home" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={28} name="person" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="info"
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={28} name="info" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
