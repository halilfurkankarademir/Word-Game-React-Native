import { View, StyleSheet, Text, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Audio } from "expo-av";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Settings({
    isVisible,
    handleClose,
    toggleMusic,
    musicEnabled,
}) {
    const [switchSound, setSwitchSound] = useState();

    const playSwitchSound = async () => {
        if (switchSound) {
            await switchSound.replayAsync();
        }
    };

    useEffect(() => {
        const loadSound = async () => {
            try {
                const { sound } = await Audio.Sound.createAsync(
                    require("../assets/sounds/switch.mp3")
                );
                setSwitchSound(sound);
                await sound.setVolumeAsync(0.05);
            } catch {}
        };

        loadSound();

        return () => {
            if (switchSound) {
                switchSound.unloadAsync();
            }
        };
    }, []);

    return (
        <>
            {isVisible && (
                <View style={styles.container}>
                    <FontAwesome6
                        name="window-close"
                        size={24}
                        color="white"
                        style={styles.closeIco}
                        onPress={handleClose}
                    />
                    <Text style={styles.title}>Settings</Text>

                    <View style={styles.settingsRow}>
                        <Text style={styles.text}>
                            Music{" "}
                            <FontAwesome5
                                name="music"
                                size={24}
                                color="white"
                            />
                        </Text>
                        <Switch
                            value={musicEnabled}
                            onValueChange={async () => {
                                await playSwitchSound();
                                toggleMusic();
                            }}
                            thumbColor={musicEnabled ? "#e4b979" : "#f4f3f4"}
                            trackColor={{ false: "#767577", true: "#767577" }}
                        />
                    </View>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0080ff",
        width: "60%",
        height: wp("55%"),
        position: "absolute",
        zIndex: 2,
        borderRadius: 8,
        paddingRight: 20,
        paddingLeft: 20,
    },
    closeIco: {
        alignSelf: "flex-end",
        marginVertical: 20,
        color: "white",
    },
    title: {
        fontFamily: "Fun",
        fontSize: wp("8%"),
        textAlign: "center",
        marginBottom: 10,
        color: "white",
    },
    text: {
        fontFamily: "Fun",
        fontSize: wp("6%"),
        color: "white",
    },
    settingsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
});
