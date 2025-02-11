import { StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../db/firebaseConfig"; // Adjust the import path

export default function TabOneScreen() {
    // Function to add an item to Firestore
    const addItemToCollection = async () => {
        try {
            // Example item to add
            const newItem = {
                name: "New Item",
                description: "This is a new item added from the app.",
                timestamp: new Date(),
            };

            // Add the item to the "items" collection
            const docRef = await addDoc(collection(db, "items"), newItem);
            Alert.alert("Success", `Item added with ID: ${docRef.id}`);
        } catch (error) {
            console.error("Error adding item:", error);
            Alert.alert("Error", "Failed to add item");
        }
    };

    // Function to remove an item from Firestore
    const removeItemFromCollection = async () => {
        try {
            // Example: Delete the first item in the "items" collection
            const querySnapshot = await getDocs(collection(db, "items"));
            if (!querySnapshot.empty) {
                const firstDoc = querySnapshot.docs[0];
                await deleteDoc(doc(db, "items", firstDoc.id));
                Alert.alert("Success", "Item removed successfully");
            } else {
                Alert.alert("Info", "No items to remove");
            }
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
            <TouchableOpacity style={styles.button} onPress={addItemToCollection}>
                <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>

            {/* Remove Item Button */}
            <TouchableOpacity style={styles.button} onPress={removeItemFromCollection}>
                <Text style={styles.buttonText}>Remove Item</Text>
            </TouchableOpacity>
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
});
