import { StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import ShopCard from "@/components/ShopCard/ShopCard";

import { db } from "../db/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function TabOneScreen() {
    const [shirts, setShirts] = useState([]);
    const [pants, setPants] = useState([]);
    const [jackets, setJackets] = useState([]);

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
        <>
            <ScrollView style={styles.container} contentContainerStyle={{ paaddingBottom: 100 }}>
                <Text style={styles.title}>Jackets</Text>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.shopSection}>
                    {jackets.map((product) => (
                        <ShopCard key={product.id} name={product.name} img={product.img} description={product.description} size={product.size} price={product.price} />
                    ))}
                </ScrollView>

                <Text style={styles.title}>Shirts</Text>

                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.shopSection}>
                    {shirts.map((product) => (
                        <ShopCard key={product.id} name={product.name} img={product.img} description={product.description} size={product.size} price={product.price} />
                    ))}
                </ScrollView>

                <Text style={styles.title}>Pants</Text>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.shopSection}>
                    {pants.map((product) => (
                        <ShopCard key={product.id} name={product.name} img={product.img} description={product.description} size={product.size} price={product.price} />
                    ))}
                </ScrollView>
                <View style={{ height: 112 }} />
            </ScrollView>
        </>
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
        color: "white",
    },
    shopSection: {
        width: "100%",
        maxHeight: "100%",
        paddingVertical: 32,
    },
    shopCard: {
        shadowOpacity: 2,
        shadowOffset: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        marginHorizontal: 10,
    },
});
