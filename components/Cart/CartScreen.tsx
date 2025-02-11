import React, { useContext } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View, ScrollView, ClearView } from "../Themed";
import { CartContext } from "@/contexts/CartContext";
import { FontAwesome5 } from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";

export default function CartScreen() {
    const { cart, removeItem } = useContext(CartContext);

    const { card } = useTheme();

    return (
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Cart</Text>
            </View>
            <View style={{ paddingHorizontal: 8, height: "80%", justifyContent: "center", overflow: "hidden" }}>
                {cart.items.length === 0 ? (
                    // Display this message if the cart is empty
                    <View style={styles.emptyCartContainer}>
                        <Text style={styles.emptyCartText}>There's nothing to show, check the shop</Text>
                    </View>
                ) : (
                    // Display this list if the cart has items
                    <ScrollView style={styles.cartItemsContainer}>
                        {cart.items.map((item) => (
                            <View key={item.id} style={[styles.cartItem, { backgroundColor: card, borderColor: card }]}>
                                <Image source={{ uri: item.img }} style={styles.itemImage} />
                                <ClearView style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemDescription}>{item.description}</Text>
                                    <Text style={styles.itemSize}>Size: {item.size}</Text>
                                    <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
                                </ClearView>
                                <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => removeItem(item.id)}>
                                    <FontAwesome5 name="trash-alt" style={{ color: "red", fontSize: 24 }} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>

            {/* Total and Checkout Buttons (only visible when cart has items) */}
            {cart.items.length > 0 && (
                <View style={styles.bottomButtonsContainer}>
                    <View style={styles.totalButton}>
                        <Text style={styles.buttonText}>Total: ${cart.total.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={styles.checkoutButton}>
                        <Text style={styles.buttonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Spacer at the bottom */}
            <View style={{ height: 100 }}></View>
        </>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 60,
        alignItems: "center",
        width: "100%",
        height: "5%",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
    },
    emptyCartContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyCartText: {
        fontSize: 18,
        color: "#666",
        textAlign: "center",
    },
    cartItemsContainer: {
        width: "100%",
    },
    cartItem: {
        flexDirection: "row",
        borderRadius: 10,
        borderWidth: 2,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
        justifyContent: "center",
    },
    itemName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    itemDescription: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    itemSize: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007bff",
    },
    bottomButtonsContainer: {
        position: "absolute",
        bottom: 100,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 24,
    },
    totalButton: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        width: "45%",
    },
    checkoutButton: {
        backgroundColor: "#28a745",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        width: "45%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
