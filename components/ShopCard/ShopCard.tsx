import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { Text, Card, ClearView } from "@/components/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { CartContext } from "@/contexts/CartContext";
import frame from "../../assets/images/frame.png";
import useTheme from "@/hooks/useTheme";

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

    const { text, background, altBackground, button } = useTheme();

    const onAddItem = () => {
        addItem({ id, name, img, description, size, price });
        console.log("Item added to cart");
    };

    return (
        <Card style={styles.shopCard}>
            <ClearView style={styles.productTitleContainer}>
                <Text style={styles.productTitle}> {name} </Text>
            </ClearView>

            <ClearView style={styles.productImage}>
                <Image source={frame} style={{ position: "absolute", height: 260, width: 260 }} />
                {/* <Image source={{ uri: img }} style={{ height: 60, width: 60 }} /> */}
                <FontAwesome5 name="tshirt" size={96} />
            </ClearView>
            <ClearView style={styles.descriptionContainer}>
                <Text style={styles.description}> {description} </Text>
            </ClearView>
            <ClearView style={styles.productInformation}>
                <View style={[styles.sizeContainer, { backgroundColor: button, borderColor: button }]}>
                    <Text style={{ color: "white", fontWeight: "bold" }}> {size}</Text>
                </View>
                <View style={[styles.productPrice, { backgroundColor: button, borderColor: button }]}>
                    <Text style={{ color: "white", fontWeight: "bold" }}> ${price}</Text>
                </View>
                <TouchableOpacity 
                    style={[styles.addCartButton, { backgroundColor: button, borderColor: button }]} 
                    onPress={onAddItem}
                >
                    <FontAwesome5 name="shopping-cart" size={24} style={{ color: "white" }} />
                    <Text style={{ color: "white", fontWeight: "bold" }}> + </Text>
                </TouchableOpacity>
            </ClearView>
        </Card>
    );
}

const styles = StyleSheet.create({
    shopCard: {
        width: 300,
        height: 400,
        borderRadius: 32,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 10, height: 12 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    productImage: {
        height: "60%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    productTitleContainer: {
        height: "10%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    productTitle: {
        fontSize: 24,
    },
    descriptionContainer: {
        height: "15%",
        width: "100%",
        paddingHorizontal: "2%",
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
        height: "15%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: "5%",
    },
    productPrice: {
        borderWidth: 3,
        width: "30%",
        height: "60%",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    addCartButton: {
        borderWidth: 3,
        width: "30%",
        height: "60%",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    sizeContainer: {
        borderWidth: 3,
        width: "20%",
        height: "60%",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
});
