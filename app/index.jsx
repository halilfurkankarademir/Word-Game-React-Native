import { StyleSheet, View, Pressable, Text } from "react-native";
import GameScreen from "./GameScreen";
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
                    <Text style={styles.text}>Play</Text>
                </Pressable>
                <Pressable style={styles.buttons}>
                    <Text style={styles.text}>Settings</Text>
                </Pressable>
                <Pressable style={styles.buttons} onPress={()=>setHasClickedPlay(true)}>
                    <Text style={styles.text}>How to play?</Text>
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
        bottom:'5%',
        fontSize:50
    },
    text:{
        color:'white',
        fontSize:20,
        textAlign:'center',
        fontFamily:'PoppinsBold'
    },
    buttons:{
        backgroundColor:'#0083e0',
        padding:10,
        borderRadius:8,
        width:150,
        marginTop:20 
    }
});
