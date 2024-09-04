import { View, StyleSheet, Pressable,Text } from "react-native";
import React from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function KeyboardLayout({ onKeyPressed, noKeys }) {
    const keys = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["   ",
            "z", "x", "c", "v", "b", "n", "m",
            { type: 'backspace', icon: <FontAwesome5 name="backspace" size={24} color="white" /> }
        ],
    ];

    const getKeyStyle = (key) => {
        const isKeyDisabled = noKeys.includes(key);
        return isKeyDisabled ? styles.disabledKey : styles.key;
    };

    const handlePress = (key) => {
        if (typeof key === 'object') {
            onKeyPressed(key.type);
        } else {
            onKeyPressed(key);
        }
    };

    return (
        <View style={styles.keyboard}>
            {keys.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((key, keyIndex) => (
                        <Pressable
                            key={keyIndex}
                            style={[styles.key, getKeyStyle(key)]}
                            onPress={() => handlePress(key)}
                        >
                            {typeof key === 'object' ? key.icon : <Text style={styles.keyText}>{key.toLocaleUpperCase()}</Text>}
                        </Pressable>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    keyboard: {
        top: 600,
        right: 0,
        left: 0,
        position: 'absolute'
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
        fontFamily: 'Fun'
    },
    disabledKey: {
        backgroundColor: "#de353e",
    }
});
