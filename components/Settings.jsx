import { View, StyleSheet, Text, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Settings({ isVisible, handleClose }) {
    const [darkTheme, setDarkTheme] = useState(false);
    const [musicEnabled, setMusicEnabled] = useState(false);
    const [language, setLanguage] = useState("en");

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
                        Settings{" "}
                        <MaterialIcons
                            name="settings-suggest"
                            size={20}
                            color="black"
                        />
                    </Text>

                    <View style={styles.settingsRow}>
                        <Text style={styles.text}>Language</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={language}
                                style={styles.picker}
                                onValueChange={(itemValue) =>
                                    setLanguage(itemValue)
                                }
                            >
                                <Picker.Item label="EN" value="en" />
                                <Picker.Item label="TR" value="tr" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.settingsRow}>
                        <Text style={styles.text}>Dark Theme</Text>
                        <Switch
                            value={darkTheme}
                            onValueChange={toggleDarkTheme}
                            thumbColor={darkTheme ? "#28235d" : "#f4f3f4"}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                        />
                    </View>

                    <View style={styles.settingsRow}>
                        <Text style={styles.text}>Music</Text>
                        <Switch
                            value={musicEnabled}
                            onValueChange={toggleMusic}
                            thumbColor={musicEnabled ? "#28235d" : "#f4f3f4"}
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
        backgroundColor: "#E4B979",
        width: "60%",
        height: "40%",
        position: "absolute",
        zIndex: 2,
        borderRadius: 8,
        padding: 20,
    },
    closeIco: {
        alignSelf: "flex-end",
        marginVertical: 10,
    },
    title: {
        fontWeight: "bold",
        fontFamily: "Poppins",
        fontSize: 28,
        textAlign: "center",
        marginBottom: 10,
    },
    text: {
        fontFamily: "Poppins",
        fontSize: 16,
        fontWeight: "700",
    },
    settingsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    picker: {
        height: 50,
        width: 100,
        color: "white",
    },
    pickerContainer: {
        height: 50,
        width: 100,
        backgroundColor: "#2c236c",
        borderRadius: 8,
        overflow: "hidden",
        justifyContent: "center",
    },
});
