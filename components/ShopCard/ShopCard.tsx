import React, { useContext, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { Text, View, Card, ClearView } from "@/components/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { CartContext } from "@/contexts/CartContext";
import frame from "@/assets/images/frame.png";
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
    const [showDescription, setOpenModal] = useState(false);
    const { id, name, img, description, size, price } = product;

    const { addItem } = useContext(CartContext);

    const { button } = useTheme();

    const onAddItem = () => {
        addItem({ id, name, img, description, size, price });
    };

    const openDescriptionModal = () => {
        setOpenModal(true);
    };

    const closeDiscriptionModal = () => {
        setOpenModal(false);
    };

    return (
        <Card style={{ borderRadius: 32, marginHorizontal: 18, paddingHorizontal: 10, backgroundColor: "transparent", width: 300 }}>
            <ClearView style={{ paddingHorizontal: 10 }}>
                <Image source={frame} style={{ height: 260, width: 260 }} />
                <FontAwesome5 name="tshirt" size={96} style={{ position: "absolute", top: "30%", left: "30%" }} />
            </ClearView>
            <ClearView style={styles.infoContainer}>
                <TouchableOpacity style={styles.desCard} onPress={openDescriptionModal}>
                    <ClearView style={{ paddingVertical: 6 }}>
                        <Text style={{ fontSize: 16, fontStyle: "italic" }}>
                            {name} ({size})
                        </Text>
                    </ClearView>
                    <ClearView style={{ paddingVertical: 4, maxWidth: 260 }}>
                        <Text style={{ fontSize: 12, color: "gray", fontStyle: "italic", fontWeight: "600" }}>{description}</Text>
                    </ClearView>
                </TouchableOpacity>
                <ClearView style={styles.buttonContainer}>
                    <View style={[styles.addToCartButton, { backgroundColor: button, borderColor: button, paddingHorizontal: 12 }]}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>${price}</Text>
                    </View>
                    <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: button, borderColor: button }]} onPress={onAddItem}>
                        <FontAwesome5 name="shopping-cart" size={24} style={{ color: "white" }} />
                        <Text style={{ color: "white", fontWeight: "bold" }}> + </Text>
                    </TouchableOpacity>
                </ClearView>
            </ClearView>
            <Modal style={styles.descriptionModal} visible={showDescription} onClose={closeDiscriptionModal}>
                <ClearView style={styles.modalView}>
                    <ClearView style={styles.modalInfo}>
                        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{name}</Text>
                        <Text style={{ fontSize: 16, fontStyle: "italic" }}>{description}</Text>
                        <Text style={{ fontSize: 14, color: "gray" }}>Size: {size}</Text>
                        <Text style={{ fontSize: 14, color: "gray" }}>Price: ${price}</Text>
                        <TouchableOpacity onPress={closeDiscriptionModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </ClearView>
                </ClearView>
            </Modal>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        gap: 8,
    },
    desCard: {
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "white",
        width: "70%",
        backgroundColor: "white",
        padding: 8,
    },
    buttonContainer: {
        flexDirection: "column",
        justifyContent: "center",
        gap: 8,
    },
    addToCartButton: {
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});
