import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Text } from "@/components/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { red } from "react-native-reanimated/lib/typescript/Colors";

export default function ShopCard() {
  const ColorScheme = useColorScheme();
  const red = Colors[useColorScheme() ?? "light"].tint;
  const productTitle = "One Cool Shirt";
  const productImageLink = require("../../assets/images/favicon.png");
  const productImageAlt = "Alternative Text";
  const productSize = "L";
  const productPrice = "9.99";
  return (
    <View>
      <View style={styles.shopCard}>
        <View style={styles.productTitleContainer}>
          <Text style={styles.productTitle}> {productTitle} </Text>
        </View>

        <View style={styles.productImage}>
          <Image source={productImageLink} alt={productImageAlt} height={60} />
        </View>

        <View style={styles.productInformation}>
          <View style={styles.sizeContainer}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {" "}
              {productSize}
            </Text>
          </View>
          <View style={styles.productPrice}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {" "}
              ${productPrice}
            </Text>
          </View>
          <TouchableOpacity style={styles.addCartButton}>
            <FontAwesome5
              name="shopping-cart"
              size={24}
              style={{ color: "white" }}
            />
            <Text style={{ color: "white", fontWeight: "bold" }}> + </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  shopCard: {
    width: 350,
    height: 500,
    borderRadius: 32,
    marginHorizontal: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  productImage: {
    height: "70%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  productTitleContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  productTitle: {
    fontSize: 24,
  },
  productInformation: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: "5%",
  },
  productPrice: {
    borderWidth: 3,
    borderColor: "#ba0d0d",
    backgroundColor: "#ba0d0d",
    width: "20%",
    height: "60%",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addCartButton: {
    borderWidth: 3,
    borderColor: "#ba0d0d",
    width: "30%",
    height: "60%",
    backgroundColor: "#ba0d0d",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  sizeContainer: {
    borderWidth: 3,
    borderColor: "#ba0d0d",
    width: "20%",
    height: "60%",
    backgroundColor: "#ba0d0d",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
