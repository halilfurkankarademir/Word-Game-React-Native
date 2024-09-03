import {
    View,
    StyleSheet,
    Text,
    Pressable,
    ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Background from "../assets/images/background.png";

export default function GameOver({ word, score }) {
    const router = useRouter();

    const redirectHome = () => {
        router.push("/HomeScreen");
    };

    const newGame = () => {
        router.push("/GameScreen");
    };

    return (
        <>
            <ImageBackground source={Background} style={styles.backgroundImage}>
                <Text style={styles.title}>You Lost</Text>
                <Text style={styles.text}>Your score: {score}</Text>
                <Text style={styles.title}>Correct word is: {word}</Text>
                <Pressable style={styles.button} onPress={newGame}>
                    <Text style={styles.text}>Try Again</Text>
                </Pressable>
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
        backgroundColor: "#009f1a",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ffffff",
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "center",
        elevation: 1,
        width: 150,
        marginVertical: 20,
    },
    title: {
        fontWeight: "bold",
        fontFamily: "Poppins",
        fontSize: 24,
        textAlign: "center",
        marginBottom: 10,
        color: "white",
    },
    text: {
        fontFamily: "Poppins",
        fontSize: 16,
        fontWeight: "700",
        color: "white",
    },
   
});
