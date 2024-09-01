import { View, Text, StyleSheet } from "react-native";
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
                        <Text key={keyIndex} style={styles.key}>
                            {key}
                        </Text>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    keyboard:{
        top:240
    },
    
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
    },
    key: {
        color: "white",
        marginHorizontal: 4,
        padding: 10,
        backgroundColor: "#333",
        textAlign: "center",
        borderRadius: 5,
        fontSize:20
    },
});
