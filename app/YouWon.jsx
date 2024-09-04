import {
    View,
    StyleSheet,
    Text,
    Pressable,
    ImageBackground,
    Image,
    Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";
import Background from "../assets/images/wonbg.png";
import Cup from "../assets/images/cup.png";
import { Audio } from "expo-av"; 

export default function YouWon({}) {
    const router = useRouter();
    
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const cupAnim = useRef(new Animated.Value(0)).current;

    const [sound, setSound] = useState(null);
    useEffect(() => {
        // Scale animation for button
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

    
        Animated.loop(
            Animated.sequence([
                Animated.timing(cupAnim, {
                    toValue: -10,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(cupAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scaleAnim, cupAnim]);

    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/won.mp3') 
            );
            setSound(sound);
            await sound.playAsync(); 
        };

        loadSound();

        return () => {
            if (sound) {
                sound.stopAsync();
                sound.unloadAsync();
            }
        };
    }, []);

    const redirectHome = () => {
        router.push("/HomeScreen");
    };

    const newGame = () => {
        router.push("/GameScreen");
    };

    return (
        <>
            <ImageBackground source={Background} style={styles.backgroundImage}>
                <Animated.View style={{ transform: [{ translateY: cupAnim }] }}>
                    <Image
                        source={Cup}
                        style={styles.cup}
                        resizeMode="contain"
                    />
                </Animated.View>
                <Text style={styles.title}>You Won !</Text>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <Pressable style={styles.button} onPress={newGame}>
                        <Text style={styles.text}>New Game</Text>
                    </Pressable>
                </Animated.View>
                <Pressable style={styles.button} onPress={redirectHome}>
                    <Text style={styles.text}>Home Page</Text>
                </Pressable>
                <ConfettiCannon
                    count={50}
                    origin={{ x: -10, y: 0 }}
                    fadeOut={true}
                />
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
        width: 150,
        marginVertical: 15,
    },
    cup: {
        width: 150,
        height: 150,
        bottom: "1%",
    },
    title: {
        fontFamily: "Fun",
        fontSize: 60,
        textAlign: "center",
        marginBottom: 10,
        color: "white",
    },
    text: {
        fontFamily: "Fun",
        fontSize: 20,
        color: "white",
    },
});
