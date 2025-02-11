import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { CartContext } from "@/contexts/CartContext";

interface ShopCardProps {
    product: Product;
}

interface Product {
    id: string;
    description: string;
    img: string;
    name: string;
    price: number;
    size: string;
}

export default function ShopCard({ product }: ShopCardProps) {

    const { id, name, img, description, size, price } = product;

    const { addItem } = useContext(CartContext);

    const onAddItem = () => {
        addItem({ id, name, img, description, size, price });
        console.log("Item added to cart");
    };

    return (
        <View>
            <View style={styles.shopCard}>
                <View style={styles.productTitleContainer}>
                    <Text style={styles.productTitle}> {name} </Text>
                </View>

                <View style={styles.productImage}>
                    <Image source={{ uri: img }} style={{ height: 60, width: 60 }} />
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}> {description} </Text>
                </View>
                <View style={styles.productInformation}>
                    <View style={styles.sizeContainer}>
                        <Text style={{ color: "white", fontWeight: "bold" }}> {size}</Text>
                    </View>
                    <View style={styles.productPrice}>
                        <Text style={{ color: "white", fontWeight: "bold" }}> ${price}</Text>
                    </View>
                    <TouchableOpacity style={styles.addCartButton} onPress={onAddItem}>
                        <FontAwesome5 name="shopping-cart" size={24} style={{ color: "white" }} />
                        <Text style={{ color: "white", fontWeight: "bold" }}> + </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    shopCard: {
        width: 300,
        height: 400,
        borderRadius: 32,
        marginHorizontal: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 10, height: 12 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    productImage: {
        height: "50%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    productTitleContainer: {
        height: "10%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
    },
    productTitle: {
        fontSize: 24,
    },
    descriptionContainer: {
        height: "20%",
        width: "100%",
        paddingHorizontal: "4%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    description: {
        fontSize: 16,
        fontWeight: "bold",
    },
    productInformation: {
        height: "20%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: "5%",
    },
    productPrice: {
        borderWidth: 3,
        borderColor: "#ba0d0d",
        backgroundColor: "#ba0d0d",
        width: "30%",
        height: "60%",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    addCartButton: {
        borderWidth: 3,
        borderColor: "#ba0d0d",
        width: "30%",
        height: "60%",
        backgroundColor: "#ba0d0d",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    sizeContainer: {
        borderWidth: 3,
        borderColor: "#ba0d0d",
        width: "20%",
        height: "60%",
        backgroundColor: "#ba0d0d",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
});
