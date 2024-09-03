import { View, StyleSheet, Text, Switch } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Settings({ isVisible, handleClose }) {
    const [darkTheme, setDarkTheme] = useState(false);
    const [musicEnabled, setMusicEnabled] = useState(false);

    const toggleDarkTheme = () => {
        setDarkTheme(!darkTheme);
    };

    const toggleMusic = () => {
        setMusicEnabled(!musicEnabled);
    };

    return (
        <>
            {isVisible && (
                <View style={styles.container}>
                    <AntDesign
                        name="closecircleo"
                        size={24}
                        color="#28235d"
                        style={styles.closeIco}
                        onPress={handleClose}
                    />
                    <Text style={styles.title}>
                        Settings
                    </Text>

                    <View style={styles.settingsRow}>
                        <Text style={styles.text}>Dark Theme</Text>
                        <Switch
                            value={darkTheme}
                            onValueChange={toggleDarkTheme}
                            thumbColor={darkTheme ? "#e4b979" : "#f4f3f4"}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                        />
                    </View>

                    <View style={styles.settingsRow}>
                        <Text style={styles.text}>Music</Text>
                        <Switch
                            value={musicEnabled}
                            onValueChange={toggleMusic}
                            thumbColor={musicEnabled ? "#e4b979" : "#f4f3f4"}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                        />
                    </View>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2c236c",
        width: "60%",
        height: "30%",
        position: "absolute",
        zIndex: 2,
        borderRadius: 8,
        paddingRight:20, 
        paddingLeft:20 
    },
    closeIco: {
        alignSelf: "flex-end",
        marginVertical: 20,
        color:'white'
    },
    title: {
        fontWeight: "bold",
        fontFamily: "Poppins",
        fontSize: 24,
        textAlign: "center",
        marginBottom: 10,
        color:'white'
    },
    text: {
        fontFamily: "Poppins",
        fontSize: 16,
        fontWeight: "700",
        color:'white'
    },
    settingsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
});
