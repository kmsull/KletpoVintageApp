import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

export default function useTheme() {
    const colorScheme = useColorScheme();

    const themeColors = {
        text: Colors[colorScheme].text,
        background: Colors[colorScheme].background,
        altBackground: Colors[colorScheme].altBackground,
        tint: Colors[colorScheme].tint,
        border: Colors[colorScheme].border,
        shopCard: Colors[colorScheme].shopCard,
        button: Colors[colorScheme].button,
        card: Colors[colorScheme].card,
        tabIconInactive: Colors[colorScheme].tabIconInactive,
    };

    return themeColors;
}
