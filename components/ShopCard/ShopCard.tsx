import React, { useContext } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View, Card, ClearView } from '@/components/Themed';
import { FontAwesome5 } from "@expo/vector-icons";
import { CartContext } from '@/contexts/CartContext';
import frame from '@/assets/images/frame.png';
import useTheme from '@/hooks/useTheme';

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

    const { button } = useTheme();

    const onAddItem = () => {
        addItem({ id, name, img, description, size, price });
    };

    return (
        <Card style={{ borderRadius: 32, marginHorizontal: 10, paddingHorizontal: 10, }}>
            <ClearView style={{ paddingVertical: 6 }}>
                <Text style={{ fontSize: 24, textAlign: 'center' }}>{name}</Text>
            </ClearView>
            <ClearView style={{ paddingHorizontal: 10 }}>
                <Image source={frame} style={{ height: 260, width: 260 }} />
                <FontAwesome5 name="tshirt" size={96} style={{ position: 'absolute', top: '30%', left: '30%' }} />
            </ClearView>
            <ClearView style={{ paddingVertical: 4 }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{description}</Text>
            </ClearView>
            <ClearView style={styles.buttonContainer}>
                <View style={[styles.cartButton, { backgroundColor: button, borderColor: button, paddingHorizontal: 24 }]}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{size}</Text>
                </View>
                <View style={[styles.cartButton, { backgroundColor: button, borderColor: button, paddingHorizontal: 12 }]}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>${price}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.addToCartButton, { backgroundColor: button, borderColor: button }]}
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
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',   
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    cartButton: {
        borderRadius: 16,
        paddingVertical: 9,
    },
    addToCartButton: {
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});