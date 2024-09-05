import { View, StyleSheet, Text, Switch } from "react-native";
import React, { useState , useEffect} from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Audio } from "expo-av"; 

export default function Settings({ isVisible, handleClose }) {
    const [darkTheme, setDarkTheme] = useState(false);
    const [musicEnabled, setMusicEnabled] = useState(false);
    const [buttonSound,setButtonSound] = useState();
    const [switchSound,setSwitchSound] = useState();

    const playButtonSound = async () => {
        if (buttonSound) {
            await buttonSound.replayAsync();  // Play the button sound
        }
    };
    const playSwitchSound = async () => {
        if (switchSound) {
            await switchSound.replayAsync();  // Play the button sound
        }
    };

    const toggleDarkTheme = () => {
        playSwitchSound();
        setDarkTheme(!darkTheme);
    };

    const toggleMusic = () => {
        playSwitchSound();
        setMusicEnabled(!musicEnabled);
    };

    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require("../assets/switch.mp3")  
            );
            setSwitchSound(sound);
            await sound.setVolumeAsync(0.05);
        };
        loadSound();

        return () => {
            if (switchSound) {
                switchSound.unloadAsync();
            }
        };
    }, []);

    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require("../assets/button-click.mp3")  
            );
            setButtonSound(sound);
            await sound.setVolumeAsync(0.05);
        };
        loadSound();

        return () => {
            if (buttonSound) {
                buttonSound.unloadAsync();
            }
        };
    }, []);

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
                            trackColor={{ false: "#767577", true: "#767577" }}
                        />
                    </View>

                    <View style={styles.settingsRow}>
                        <Text style={styles.text}>Music</Text>
                        <Switch
                            value={musicEnabled}
                            onValueChange={toggleMusic}
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
        fontFamily: "Fun",
        fontSize: 32,
        textAlign: "center",
        marginBottom: 10,
        color:'white'
    },
    text: {
        fontFamily: "Fun",
        fontSize: 20,
        color:'white'
    },
    settingsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
});
