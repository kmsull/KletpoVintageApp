import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import Profile from "@/components/Profile/ProfileScreen";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Profile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
