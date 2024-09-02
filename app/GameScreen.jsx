import { StyleSheet, View, Pressable, Text } from "react-native";
import { useState,useEffect } from "react";
import React from "react";
import KeyboardLayout from "../components/Keyboard";

export default function GameScreen() {
    const [selectedWord, setSelectedWord] = useState("yarak");

    const letters = selectedWord.split("");

    const [rows, setRows] = useState(
        Array.from({ length: letters.length }, () =>
            new Array(letters.length).fill("")
        )
    );

    const [colors, setColors] = useState(
        Array.from({ length: letters.length }, () =>
            new Array(letters.length).fill("#4a4a4a")
        )
    );

    const [word, setWord] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const [length, setLength] = useState(0);
    const [rightLetterLength, setRightLetterLength] = useState(0);

    const onKeyPressed = (key) => {
        const newRows = rows.map((row) => [...row]);
        const newColors = colors.map((row) => [...row]);

        if (key === "DEL") {
            if (currentCol > 0) {
                const prevCol = currentCol - 1;
                newRows[currentRow][prevCol] = "";
                newColors[currentRow][prevCol] = "#4a4a4a";
                setWord((prev) => prev.slice(0, -1));
                setRows(newRows);
                setCurrentCol(prevCol);
                setLength((prev) => prev - 1);
            }
        } else {
            if (currentCol < letters.length) {
                newRows[currentRow][currentCol] = key;
                setWord((prev) => [...prev, key]);
                setRows(newRows);
                setCurrentCol(currentCol + 1);
                setLength((prev) => prev + 1);
            }
        }

        setColors(newColors);
    };

    const checkWord = () => {
        const newColors = colors.map((row) => [...row]);

        for (let i = 0; i < letters.length; i++) {
            if (letters.includes(word[i])) {
                newColors[currentRow][i] = "#dea709"; // If word includes letter make it's bg is yellow
            }

            if (letters[i] === word[i]) {
                newColors[currentRow][i] = "#50ad44"; // If letter is on the right place make it's bg is green
                setRightLetterLength((prev) => prev + 1);
            }
        }
        setCurrentRow((prevRow) => prevRow + 1);
        setCurrentCol(0);
        setWord([]);
        setColors(newColors);
    };

    return (
        <View style={styles.containerMain}>
            <View style={styles.container}>
                {rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, cellIndex) => (
                            <View
                                key={cellIndex}
                                style={[
                                    styles.cell,
                                    {
                                        backgroundColor:
                                            colors[rowIndex][cellIndex],
                                        borderColor:
                                            rowIndex === currentRow &&
                                            cellIndex === currentCol
                                                ? "#969696" 
                                                : "transparent",
                                        borderWidth:
                                            rowIndex === currentRow &&
                                            cellIndex === currentCol
                                                ? 2
                                                : 0,
                                    },
                                ]}
                            >
                                <Text style={styles.cellText}>
                                    {cell.toUpperCase()}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
            <Pressable style={styles.button} onPress={checkWord}>
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    Check Answer
                </Text>
            </Pressable>
            <KeyboardLayout onKeyPressed={onKeyPressed} />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    cell: {
        width: 50,
        height: 50,
        backgroundColor: "#4a4a4a",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 8,
        left: 15,
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: "#50ad44",
        alignItems: "center",
        justifyContent: "center",
        top: 40,
        borderRadius: 8,
        left: "20%",
    },
    cellText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
    },
});
