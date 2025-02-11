import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View, ScrollView } from "@/components/Themed";
import ShopCard from "@/components/ShopCard/ShopCard";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { db } from "@/db/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

type Product = {
    id: string;
    name: string;
    img: string;
    description: string;
    size: string;
    price: number;
};

export default function HomeScreen() {
    const [shirts, setShirts] = useState<Product[]>([]);
    const [pants, setPants] = useState<Product[]>([]);
    const [jackets, setJackets] = useState<Product[]>([]);

    useEffect(() => {
        const fetchPants = async () => {
            const querySnapshot = await getDocs(collection(db, "Pants"));
            const pantsList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPants(pantsList);
        };
        fetchPants();
    });

    useEffect(() => {
        const fetchJackets = async () => {
            const querySnapshot = await getDocs(collection(db, "Jackets"));
            const jacketsList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setJackets(jacketsList);
        };
        fetchJackets();
    });

    useEffect(() => {
        const fetchShirts = async () => {
            const querySnapshot = await getDocs(collection(db, "Shirts"));
            const shirtsList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setShirts(shirtsList);
        };

        fetchShirts();
    }, []);

    return (
        <ScrollView style={{ width: "100%", marginTop: "15%", backgroundColor: Colors[useColorScheme() ?? "light"].background }} contentContainerStyle={{ paddingBottom: 100 }}>
            <Text style={{ fontSize: 40, fontWeight: "bold", marginLeft: "4%", color: Colors[useColorScheme() ?? "light"].text }}>Jackets</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.shopSection}>
                {jackets.map((product) => (
                    <ShopCard key={product.id} product={product} />
                ))}
            </ScrollView>

            <Text style={{ fontSize: 40, fontWeight: "bold", marginLeft: "4%", color: Colors[useColorScheme() ?? "light"].text }}>Shirts</Text>

                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.shopSection}>
                    {shirts.map((product) => (
                        <ShopCard key={product.id} product={product} />
                    ))}
                </ScrollView>

            <Text style={{ fontSize: 40, fontWeight: "bold", marginLeft: "4%", color: Colors[useColorScheme() ?? "light"].text }}>Pants</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.shopSection}>
                {pants.map((product) => (
                    <ShopCard key={product.id} product={product} />
                ))}
            </ScrollView>
            <View style={{ height: 10, backgroundColor: Colors[useColorScheme() ?? "light"].background }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: "15%",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginLeft: "4%",
        color: "black",
    },
    shopSection: {
        width: "100%",
        maxHeight: "100%",
        paddingVertical: 32,
        backgroundColor: "transparent",
    },
    shopCard: {
        shadowOpacity: 2,
        shadowOffset: { width: 10, height: 12 },
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        marginHorizontal: 10,
    },
});
