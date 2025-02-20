import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { FontAwesome5 } from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: 3 }} {...props} />;
}

export default function TabLayout() {

    const { text, altBackground, tint, border, tabIconInactive } = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
                headerTransparent: true,
                headerTitleStyle: {
                    color: "transparent",
                },
                tabBarInactiveTintColor: tabIconInactive,
                tabBarStyle: {
                    borderRadius: 32,
                    backgroundColor: "tan",
                    position: "absolute",
                    height: "7%",
                    paddingTop: "1%",
                    marginBottom: "3%",
                    width: "80%",
                    marginHorizontal: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Store",
                    tabBarIcon: ({ color }) => <FontAwesome5 name="store" color={color} size={25} />,
                    headerRight: () => (
                        <Link href="/cart" asChild>
                            <Pressable
                                style={{
                                    backgroundColor: altBackground,
                                    borderRadius: 50,
                                    borderColor: border,
                                    // borderWidth: 2,
                                    height: 64,
                                    width: 64,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 32,
                                    marginRight: 16,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 5, height: 6 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 10,
                                }}
                            >
                                {({ pressed }) => <FontAwesome5 name="shopping-cart" size={25} color={text} style={{ opacity: pressed ? 0.5 : 1 }} />}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ color }) => <FontAwesome5 name="shopping-cart" color={color} size={25} />,
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    title: "Events",
                    tabBarIcon: ({ color }) => <FontAwesome5 name="map-marked-alt" color={color} size={25} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <FontAwesome5 name="address-card" color={color} size={25} />,
                }}
            />
        </Tabs>
    );
}
