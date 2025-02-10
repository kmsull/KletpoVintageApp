import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import EventMap from "../../components/EventMap/EventMap";

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <EventMap />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
