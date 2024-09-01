import { useState } from "react";
import { StyleSheet, View, TextInput, Pressable,Text } from "react-native";
import KeyboardLayout from "../../components/Keyboard"

export default function HomeScreen() {
    
    const [selectedWord,setSelectedWord] = useState("fatma");

    const letters = selectedWord.split("");

    const handleChange = () => {

    };

    const checkWord = () => {
    
  };

    return (
        <View style={styles.containerMain}>
            <View style={styles.container}>
            {
              letters.map((letter)=>(
                <View style={styles.cell}></View>
              ))
            }
            </View>
            <Pressable style={styles.button} onPress={checkWord}>
                    <Text style={{fontWeight:'bold', textAlign:'center'}}>Check Answer</Text>
            </Pressable>
            <KeyboardLayout></KeyboardLayout>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    containerMain: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cell: {
        width: 50,
        height: 50,
        backgroundColor: "#4a4a4a",
        textAlign: "center",
        color: "white",
        fontSize: 25,
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius:8
    },
    button:{
        width: 200,
        height: 50,
        backgroundColor: "#50ad44",
        alignItems:'center',
        justifyContent:'center',
        top:10,
        borderRadius:8
    }
});
