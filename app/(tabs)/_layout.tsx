import header from "@/components/header";
import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router/tabs";

export default function TabLayout() {
	return (
		<Tabs
			initialRouteName="home"
			sceneContainerStyle={{
				backgroundColor: Colors.light.background,
			}}
			screenOptions={{
				tabBarActiveTintColor: Colors.light.background,
				tabBarItemStyle: {
					backgroundColor: Colors.dark.background,
				},

				tabBarShowLabel: false,
				tabBarStyle: {
					height: 60,
					shadowOpacity: 0,
					elevation: 0,
					borderTopWidth: 0,
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<Feather size={28} name="home" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					...header,
					tabBarIcon: ({ color }) => (
						<Feather size={28} name="user" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="info"
				options={{
					...header,
					tabBarIcon: ({ color }) => (
						<Feather size={28} name="info" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
