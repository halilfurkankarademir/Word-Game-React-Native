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

export default function YouWon({}) {
    const router = useRouter();
    const [score, setScore] = useState(0);

    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Animasyon döngüsü
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.05,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scaleAnim]);

    useEffect(() => {
        
        const retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('score');
                if (value !== null) {
                    setScore(value); 
                }
            } catch (error) {
                console.error('Error retrieving score from AsyncStorage:', error);
            }
        };
        
        retrieveData();
    }, []); // Bu useEffect yalnızca bileşen ilk yüklendiğinde çalışır

    const redirectHome = () => {
        router.push("/HomeScreen");
    };

    const newGame = () => {
        router.push("/GameScreen");
    };

    return (
        <>
            <ImageBackground source={Background} style={styles.backgroundImage}>
                <Image
                    source={Cup}
                    style={styles.cup}
                    resizeMode="contain"
                ></Image>
                <Text style={styles.title}>You Won !</Text>
                <Text style={styles.text}>Your score: {score}</Text>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <Pressable style={styles.button} onPress={newGame}>
                        <Text style={styles.text}>New Game</Text>
                    </Pressable>
                </Animated.View>
                <Pressable style={styles.button} onPress={redirectHome}>
                    <Text style={styles.text}>Home Page</Text>
                </Pressable>
                <ConfettiCannon
                    count={100}
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
        backgroundColor: "#009f1a",
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
        fontWeight: "bold",
        fontFamily: "Poppins",
        fontSize: 60,
        textAlign: "center",
        marginBottom: 10,
        color: "white",
    },
    text: {
        fontFamily: "Poppins",
        fontSize: 20,
        fontWeight: "700",
        color: "white",
    },
});
