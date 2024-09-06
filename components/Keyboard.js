import { View, StyleSheet, Pressable,Text } from "react-native";
import React from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function KeyboardLayout({ onKeyPressed, noKeys }) {
    const keysEN = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        [
            "z", "x", "c", "v", "b", "n", "m",
            { type: 'backspace', icon: <FontAwesome5 name="backspace" size={wp('5%')} color="white" /> }
        ],
    ];
    const keysTR = [
        ["q", "w", "e", "r", "t", "y", "u", "ı", "o", "p","ğ","ü"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l","ş","i"],
        [
            "z", "x", "c", "v", "b", "n", "m","ö","ç",
            { type: 'backspace', icon: <FontAwesome5 name="backspace" size={wp('5%')} color="white" /> }
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
            {keysTR.map((row, rowIndex) => (
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
        bottom: wp('20%')
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: wp('3%'),
    },
    key: {
        marginHorizontal: 2,
        padding: wp('2.5%'),
        backgroundColor: "#333",
        borderRadius: 5,
    },
    keyText: {
        color: "white",
        textAlign: "center",
        fontSize: wp('5.5%'),
        fontFamily: 'Fun'
    },
    disabledKey: {
        backgroundColor: "#de353e",
    }
});
