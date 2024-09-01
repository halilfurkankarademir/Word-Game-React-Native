import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function Keyboard() {
    
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
                        <Pressable
                            key={keyIndex}
                            style={styles.key}
                        >
                            <Text style={styles.keyText}>{key}</Text>
                        </Pressable>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    keyboard: {
        top: 80,
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
    },
});
