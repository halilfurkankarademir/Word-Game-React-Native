import { StyleSheet, View, Pressable, Text , Image} from "react-native";
import GameScreen from "./GameScreen";
import { useState } from "react";
import Logo from "../assets/images/wh_logo_small.png"
import bgButtons from "../assets/images/bgButtons.jpg"

export default function HomeScreen() {
    const [hasClickedPlay, setHasClickedPlay] = useState(false);

    return (
        <View style={styles.containerMain}>
            {hasClickedPlay && <GameScreen></GameScreen>}
            {!hasClickedPlay && (
                <>
                <Image source={Logo} style={styles.logo} resizeMode="center"></Image>
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
    buttons:{
        backgroundColor: '#0080ff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ffffff',
        paddingVertical: 6,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#e67a73',
        shadowOffset: { width: 0, height: 39 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 1,
        width:150,
        marginTop:30,
        top:'10%'
    },
    container: {
        flexDirection: "column",
    },
    containerMain: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo:{
        width:300,
        position:'absolute',
        bottom:'5%'
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
   
});
