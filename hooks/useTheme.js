import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

export default function useTheme() {
    const colorScheme = useColorScheme();

    const themeColors = {
        text: Colors[colorScheme].text,
        background: Colors[colorScheme].background,
        tint: Colors[colorScheme].tint,
        shopCard: Colors[colorScheme].shopCard,
    };

    return themeColors;
}
