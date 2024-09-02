import { StyleSheet, View, Pressable, Text } from "react-native";
import GameScreen from "../GameScreen"

export default function HomeScreen() {
    
    return (
        <View style={styles.containerMain}>
            <GameScreen></GameScreen>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    containerMain: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});
