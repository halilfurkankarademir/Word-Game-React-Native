import { StyleSheet, View, Pressable, Text } from "react-native";
import GameScreen from "../app/GameScreen";
import { useState } from "react";

export default function HomeScreen() {
    const [hasClickedPlay, setHasClickedPlay] = useState(false);

    return (
        <View style={styles.containerMain}>
            {hasClickedPlay && <GameScreen></GameScreen>}
            {!hasClickedPlay && (
                <>
                <Text style={styles.title}>Word Hunt</Text>
                <Pressable style={styles.buttons} onPress={()=>setHasClickedPlay(true)}>
                    <Text style={styles.text}>Play the game</Text>
                </Pressable>
                </>
            )}
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
    },
    title:{
        color:'white',
        fontWeight:'bold',
        bottom:'30%',
        fontSize:20
    },
    text:{
        color:'white',
        fontSize:15
    },
    buttons:{
        backgroundColor:'#0083e0',
        padding:10,
        borderRadius:8
    }
});
