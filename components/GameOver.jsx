import { View, StyleSheet, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function Settings({ hasWon, word, score }) {
    const router = useRouter();

    const redirectHome = () => {
        router.push("/HomeScreen");
    };

    
    const newGame = () => {
        router.push("/GameScreen");
    };

    

    return (
        <>
            <View style={styles.container}>
                {hasWon && (
                    <>
                        <Text style={styles.title}>You Won!</Text>
                        <Text style={styles.text}>Your score: {score}</Text>
                        <Pressable style={styles.button} onPress={newGame}>
                            <Text style={styles.text}>New Game</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={redirectHome}>
                            <Text style={styles.text}>Home Page</Text>
                        </Pressable>
                    </>
                )}
                {!hasWon && (
                    <>
                        
                        <Text style={styles.title}>You Lose :(</Text>
                        <Text style={styles.text}>Your score: {score}</Text>
                        <Text style={styles.title}>
                            Correct word is: {word}
                        </Text>
                        <Pressable style={styles.button} onPress={newGame}>
                            <Text style={styles.text}>Try Again</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={redirectHome}>
                            <Text style={styles.text}>Home Page</Text>
                        </Pressable>
                    </>
                )}
            </View>
        </>
    );
}
const styles = StyleSheet.create({
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
    container: {
        backgroundColor: "#2c236c",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 2,
        borderRadius: 8,
        paddingRight: 20,
        paddingLeft: 20,
        alignItems: "center",
        justifyContent: "center",
        zIndex:20
    },
    closeIco: {
        alignSelf: "flex-end",
        marginVertical: 20,
        color: "white",
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
    settingsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
});
