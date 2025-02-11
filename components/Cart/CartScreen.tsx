import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { CartContext } from "@/contexts/CartContext";
import { Text, View } from "@/components/Themed";

export default function CartScreen() {
    const { cart } = useContext(CartContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cart</Text>
            <Text>{JSON.stringify(cart)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
