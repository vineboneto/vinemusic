import { useTheme } from "@/hooks/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router/tabs";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
	const { ColorTheme, theme } = useTheme();

	return (
		<>
			<StatusBar translucent style={theme === "dark" ? "light" : "dark"} />
			<Tabs
				initialRouteName="home"
				sceneContainerStyle={{
					backgroundColor: ColorTheme.background,
				}}
				screenOptions={{
					tabBarActiveTintColor: ColorTheme.tabIconSelected,
					tabBarItemStyle: {
						backgroundColor: ColorTheme.backgroundBar,
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
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<Feather size={28} name="user" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="info"
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<Feather size={28} name="info" color={color} />
						),
					}}
				/>
			</Tabs>
		</>
	);
}
