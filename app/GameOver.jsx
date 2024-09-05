import {
    View,
    StyleSheet,
    Text,
    Pressable,
    ImageBackground,
    Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "../assets/images/lostbg.png";
import { Audio } from "expo-av"; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function GameOver({}) {
    const router = useRouter();

    const [word, setWord] = useState("");
    const scaleAnim = useRef(new Animated.Value(1)).current;


    const [buttonSound,setButtonSound] = useState();
    const [sound, setSound] = useState(null);

    useEffect(() => {
        const _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem("word");
                if (value !== null) {
                    setWord(value);
                    console.log(value);
                }
            } catch (error) {}
        };
        _retrieveData();
    }, []);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scaleAnim]);

    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/sounds/fail.mp3') 
            );
            setSound(sound);
            await sound.playAsync(); 
            await sound.setVolumeAsync(0.1);
        };

        loadSound();

        return () => {
            if (sound) {
                sound.stopAsync();
                sound.unloadAsync();
            }
        };
    }, []);

    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require("../assets/sounds/button-click.mp3")  
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

    const playButtonSound = async () => {
        if (buttonSound) {
            await buttonSound.replayAsync();  // Play the button sound
        }
    };


    const redirectHome = async () => {
        await playButtonSound();
        router.push("/HomeScreen");
    };

    const newGame = async () => {
        await playButtonSound();
        router.push("/GameScreen");
    };

    
    return (
        <>
            <ImageBackground source={Background} style={styles.backgroundImage}>
                <Text style={styles.title}>You Lost :(</Text>
                <Text style={styles.text}>
                    Correct word is:{" "}
                    <Text style={{ fontFamily: "Fun", color: "#23de5b" }}>
                        {word}
                    </Text>
                </Text>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <Pressable style={styles.button} onPress={newGame}>
                        <Text style={styles.text}>Try Again</Text>
                    </Pressable>
                </Animated.View>
                <Pressable style={styles.button} onPress={redirectHome}>
                    <Text style={styles.text}>Home Page</Text>
                </Pressable>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        zIndex: 1,
    },
    button: {
        backgroundColor: "#0080ff",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ffffff",
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "center",
        elevation: 1,
        width: wp('35%'),
        marginVertical: 20,
    },
    title: {
        fontFamily: "Fun",
        fontSize: wp('13%'),
        textAlign: "center",
        marginBottom: 20,
        color: "white",
    },
    text: {
        fontFamily: "Fun",
        fontSize: wp('5%'),
        color: "white",
    },
});
