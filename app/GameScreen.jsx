import { StyleSheet, View, Pressable, Text ,ActivityIndicator} from "react-native";
import { useEffect, useState } from "react";
import WordsJson from "../assets/words.json";
import React from "react";
import KeyboardLayout from "../components/Keyboard";
import { useRouter } from 'expo-router'; 

export default function GameScreen() {
    const [selectedWord, setSelectedWord] = useState("");
    const [hasWon,setHasWon] = useState(false);
    const [wordsData, setWordsData] = useState(WordsJson);
    const [loading,setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }, []);


    useEffect(() => {  //Update layout for each random word
        if (selectedWord) {
            const letters = selectedWord.split("");
            setRows(
                Array.from({ length: letters.length }, () =>
                    new Array(letters.length).fill("")
                )
            );
            setColors(
                Array.from({ length: letters.length }, () =>
                    new Array(letters.length).fill("#4a4a4a")
                )
            );
        }
    }, [selectedWord]);

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomWord = () => {
        const randomIndex = getRandomNumber(0, wordsData.length - 1);
        setSelectedWord(wordsData[randomIndex]);  //Select random word from words data
    };

    const letters = selectedWord.split("");
    const [rows, setRows] = useState( //Create rows up to the letters length
        Array.from({ length: letters.length }, () =>
            new Array(letters.length).fill("")
        )
    );

    useEffect(() => {
        randomWord();
    }, []);

    const [colors, setColors] = useState(
        Array.from({ length: letters.length }, () =>
            new Array(letters.length).fill("#4a4a4a")
        )
    );

    const [word, setWord] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const [rightLetterLength, setRightLetterLength] = useState("");

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
            }
        } else {
            if (currentCol < letters.length) {
                newRows[currentRow][currentCol] = key;
                setWord((prev) => [...prev, key]); // Add selected key to word array
                setRows(newRows);
                setCurrentCol(currentCol + 1);
            }
        }

        setColors(newColors);
    };

    const checkWord = () => {
        const newColors = colors.map((row) => [...row]);
        let correctLettersCount = 0;

        for (let i = 0; i < letters.length; i++) {
            if (letters.includes(word[i])) {
                newColors[currentRow][i] = "#dea709"; // If word includes that letter make it's bg is yellow
            }
            else{
                newColors[currentRow][i] = "#919191"; // If word doesn't include letter make it's bg light gray
            }
            if (letters[i] === word[i]) {
                newColors[currentRow][i] = "#50ad44"; // If letter is on the right place make it's bg is green
                correctLettersCount++;
            }
            
        }
        setRightLetterLength(correctLettersCount);
        setCurrentRow((prevRow) => prevRow + 1);
        setCurrentCol(0);
        setWord([]);
        setColors(newColors);
    };
    
    useEffect(() => {
        if (rightLetterLength === letters.length) {
            alert("You won!");
            setHasWon(true);
            router.push('/HomeScreen');
        }
    }, [rightLetterLength, letters.length]);

    
    if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

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
                    Check Answer {selectedWord}
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
        left: 20,
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
        fontFamily:'Poppins'
    },
});
