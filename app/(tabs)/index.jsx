import { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import KeyboardLayout from "../../components/Keyboard";

export default function HomeScreen() {
    const [selectedWord, setSelectedWord] = useState("fatma");

    const letters = selectedWord.split("");

    const [rows, setRows] = useState(
        Array.from({ length: letters.length }, () =>
            new Array(letters.length).fill("")
        )
    );

    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);

    const onKeyPressed = (key) => {
        const newRows = rows.map((row) => [...row]);

        if (key === "DEL") {
            const prevCol = currentCol - 1;
            newRows[currentRow][prevCol] = "";
            setRows(newRows);
            setCurrentCol(prevCol);
        }

        else{
            newRows[currentRow][currentCol] = key;
            setRows(newRows);
            setCurrentCol(currentCol + 1);
        }
    };

    const checkWord = () => {};

    return (
        <View style={styles.containerMain}>
            <View style={styles.container}>
                {rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, cellIndex) => (
                            <View key={cellIndex} style={styles.cell}>
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
    container: {
        flexDirection: "column",
    },
    containerMain: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
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
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: "#50ad44",
        alignItems: "center",
        justifyContent: "center",
        top: 40,
        borderRadius: 8,
    },
    cellText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
    },
});
