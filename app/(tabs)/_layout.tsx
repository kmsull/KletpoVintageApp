import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { FontAwesome5 } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerTransparent: true,
        headerTitleStyle: {
          color: "transparent",
        },
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconInactive,
        tabBarStyle: {
          borderRadius: 32,
          backgroundColor: "white",
          position: "absolute",
          height: "6%",
          marginBottom: "5%",
          width: "80%",
          marginHorizontal: "10%",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Store",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="store" color={color} size={25} />
          ),
          headerRight: () => (
            <Link href="/cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="shopping-cart"
                    size={25}
                    color={Colors[colorScheme ?? "light"].tabIconInactive}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="shopping-cart" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="address-card" color={color} size={25} />
          ),
        }}
      />
    </Tabs>
  );
}
