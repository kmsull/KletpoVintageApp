import { StyleSheet, Image } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.userImage}>
                <Image source={{ uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" }} style={{ borderRadius: 60, height: 120, width: 120 }} />
            </View>

            <View style={styles.nameContainer}>
                <Text style={styles.name}>John Smith</Text>
            </View>
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
});
