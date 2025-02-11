import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Alert, Modal, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { collection, addDoc, doc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../db/firebaseConfig"; // Adjust the import path

export default function TabOneScreen() {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [collectionName, setCollectionName] = useState("");
    const [itemId, setItemId] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemSize, setItemSize] = useState("");

    const addItemToCollection = async () => {
        try {
            const newItem = {
                name: itemName,
                price: parseFloat(itemPrice),
                description: itemDescription,
                size: itemSize,
                timestamp: new Date(),
            };

            const docRef = await addDoc(collection(db, collectionName), newItem);
            Alert.alert("Success", `Item added with ID: ${docRef.id}`);
            setAddModalVisible(false);
        } catch (error) {
            console.error("Error adding item:", error);
            Alert.alert("Error", "Failed to add item");
        }
    };

    const removeItemFromCollection = async () => {
        try {
            if (itemId) {
                await deleteDoc(doc(db, collectionName, itemId));
                Alert.alert("Success", "Item removed successfully");
            } else if (itemName) {
                const querySnapshot = await getDocs(collection(db, collectionName));
                querySnapshot.forEach((doc) => {
                    if (doc.data().name === itemName) {
                        deleteDoc(doc.ref);
                        Alert.alert("Success", "Item removed successfully");
                    }
                });
            } else {
                Alert.alert("Info", "Please provide an ID or name to remove an item");
            }
            setRemoveModalVisible(false);
        } catch (error) {
            console.error("Error removing item:", error);
            Alert.alert("Error", "Failed to remove item");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.userImage}>
                <Image source={{ uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" }} style={{ borderRadius: 60, height: 120, width: 120 }} />
            </View>

            <View style={styles.nameContainer}>
                <Text style={styles.name}>John Smith</Text>
            </View>

            {/* Add Item Button */}
            <TouchableOpacity style={styles.button} onPress={() => setAddModalVisible(true)}>
                <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>

            {/* Remove Item Button */}
            <TouchableOpacity style={styles.button} onPress={() => setRemoveModalVisible(true)}>
                <Text style={styles.buttonText}>Remove Item</Text>
            </TouchableOpacity>

            {/* Add Item Modal */}
            <Modal animationType="slide" transparent={true} visible={addModalVisible} onRequestClose={() => setAddModalVisible(false)}>
                <View style={styles.modalView}>
                    <TextInput style={styles.input} placeholder="Collection Name" value={collectionName} onChangeText={setCollectionName} />
                    <TextInput style={styles.input} placeholder="Item Name" value={itemName} onChangeText={setItemName} />
                    <TextInput style={styles.input} placeholder="Item Price" value={itemPrice} onChangeText={setItemPrice} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Item Description" value={itemDescription} onChangeText={setItemDescription} />
                    <TextInput style={styles.input} placeholder="Item Size" value={itemSize} onChangeText={setItemSize} />
                    <TouchableOpacity style={styles.button} onPress={addItemToCollection}>
                        <Text style={styles.buttonText}>Add Item</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setAddModalVisible(false)}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Remove Item Modal */}
            <Modal animationType="slide" transparent={true} visible={removeModalVisible} onRequestClose={() => setRemoveModalVisible(false)}>
                <View style={styles.modalView}>
                    <TextInput style={styles.input} placeholder="Collection Name" value={collectionName} onChangeText={setCollectionName} />
                    <TextInput style={styles.input} placeholder="Item ID" value={itemId} onChangeText={setItemId} />
                    <TextInput style={styles.input} placeholder="Item Name" value={itemName} onChangeText={setItemName} />
                    <TouchableOpacity style={styles.button} onPress={removeItemFromCollection}>
                        <Text style={styles.buttonText}>Remove Item</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setRemoveModalVisible(false)}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    nameContainer: {
        width: "100%",
        alignItems: "center",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
    },
    userImage: {
        width: "100%",
        alignItems: "center",
        paddingVertical: "5%",
    },
    button: {
        marginTop: 20,
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalView: {
        margin: 20,
        marginTop: "25%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "80%",
    },
});
