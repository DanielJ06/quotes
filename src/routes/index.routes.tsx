import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "@expo/vector-icons/Feather";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../types/RootState";

const { Navigator, Screen } = createBottomTabNavigator();

const Routes: React.FC = () => {
	const { quotes } = useSelector((state: RootState) => state.bookmark);

	return (
		<NavigationContainer>
			<Navigator
				screenOptions={() => ({
					tabBarActiveTintColor: "#15a691",
				})}
			>
				<Screen
					name="Home"
					component={Home}
					options={{
						tabBarIcon: ({ size, color }) => (
							<Icon name="home" color={color} size={size} />
						),
					}}
				/>
				<Screen
					name="Favorites"
					component={Favorites}
					options={{
						tabBarBadge: quotes.length > 0 ? quotes.length : undefined,
						tabBarBadgeStyle: {
							backgroundColor: "#15a691",
							alignItems: "center",
							justifyContent: "center",
						},
						tabBarIcon: ({ size, color }) => (
							<Icon name="bookmark" color={color} size={size} />
						),
					}}
				/>
			</Navigator>
		</NavigationContainer>
	);
};

export default Routes;
