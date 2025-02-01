import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Shirts</Text>
      <ScrollView
        style={styles.shopSection}
        horizontal={true}
        contentOffset={{ x: -2, y: -8 }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.shopCard}>
          <Text>This one</Text>
        </View>
        <View style={styles.shopCard}>
          <Text>This one</Text>
        </View>
        <View style={styles.shopCard}>
          <Text>This one</Text>
        </View>
        <View style={styles.shopCard}>
          <Text>This one</Text>
        </View>
      </ScrollView>
      <Text style={styles.title}>Pants</Text>
      <ScrollView
        style={styles.shopSection}
        horizontal={true}
        contentOffset={{ x: -2, y: -8 }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.shopCard}>
          <Text>This one</Text>
        </View>
        <View style={styles.shopCard}>
          <Text>This one</Text>
        </View>
        <View style={styles.shopCard}>
          <Text>This one</Text>
        </View>
        <View style={styles.shopCard}>
          <Text>This one</Text>
        </View>
      </ScrollView>
      <Text style={styles.title}>Jackets</Text>
      <ScrollView
        style={styles.shopSection}
        horizontal={true}
        contentOffset={{ x: -2, y: -8 }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.shopCard}>
          <Text>This one</Text>
        </View>
        <View style={styles.shopCard}>
          <Text>This one</Text>
        </View>
        <View style={styles.shopCard}>
          <Text>This one</Text>
        </View>
        <View style={styles.shopCard}>
          <Text>This one</Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: "15%",
    height: "100%",
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
    width: 200,
    height: 250,
    shadowOpacity: 2,
    shadowOffset: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginHorizontal: 10,
  },
});
