import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function KeyboardLayout ({ onKeyPressed }) {
    const keys = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m", "DEL"],
    ];

    return (
        <View style={styles.keyboard}>
            {keys.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((key, keyIndex) => (
                        <Pressable key={keyIndex} style={styles.key} onPress={()=>onKeyPressed(key)}>
                            <Text style={styles.keyText}>{key.toLocaleUpperCase()}</Text>
                        </Pressable>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    keyboard: {
        top: 640,
        right:0,
        left:0,
        position:'absolute'
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
    },
    key: {
        marginHorizontal: 4,
        padding: 10,
        backgroundColor: "#333",
        borderRadius: 5,
    },
    keyText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontFamily:'Poppins'
    },
});
