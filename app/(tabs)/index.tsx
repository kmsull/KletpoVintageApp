import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import HomeScreen from "@/app/Home";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <HomeScreen />
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
