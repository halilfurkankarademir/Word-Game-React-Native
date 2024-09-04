import {
    StyleSheet,
    View,
    Pressable,
    Text,
    ImageBackground,
    Image,
    BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import WordsJson from "../assets/words.json";
import React from "react";
import KeyboardLayout from "../components/Keyboard";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "../assets/images/wh_logo_small.png";
import Background from "../assets/images/gamebg.png";

export default function GameScreen() {
    const [selectedWord, setSelectedWord] = useState("");
    const [hasWon, setHasWon] = useState(false);
    const [showGameOver, setShowGameOver] = useState(false);
    const [showYouWon, setShowYouWon] = useState(false);
    const [wordsData, setWordsData] = useState(WordsJson);
    const [noKeys, setNoKeys] = useState([]); // If letter is not in the word add in no keys array
    const [gameScore, setGameScore] = useState(0);

    const [rows, setRows] = useState(
        Array.from({ length: 0 }, () => new Array(0).fill(""))
    );

    const [colors, setColors] = useState(
        Array.from({ length: 5 }, () =>
            Array.from({ length: 5 }, () => "#ff65ff")
        )
    );

    const [word, setWord] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const [rightLetterLength, setRightLetterLength] = useState("");

    // Router
    const router = useRouter();

    // Functions
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomWord = () => {
        const randomIndex = getRandomNumber(0, wordsData.length - 1);
        setSelectedWord(wordsData[randomIndex]);
    };

    const onKeyPressed = (key) => {
        const newRows = rows.map((row) => [...row]);
        const newColors = colors.map((row) => [...row]);

        if (key === "check") {
            checkWord();
        } else if (key === "backspace") {
            if (currentCol > 0) {
                const prevCol = currentCol - 1;
                newRows[currentRow][prevCol] = "";
                newColors[currentRow][prevCol] = "#4a4a4a";
                setWord((prev) => prev.slice(0, -1));
                setRows(newRows);
                setCurrentCol(prevCol);
            }
        } else {
            if (currentCol < selectedWord.length) {
                newRows[currentRow][currentCol] = key;
                setWord((prev) => [...prev, key]);
                setRows(newRows);
                setCurrentCol(currentCol + 1);
            }
        }

        setColors(newColors);
    };

    const checkWord = () => {
        const newColors = colors.map((row) => [...row]);
        let correctLettersCount = 0;
    
        for (let i = 0; i < selectedWord.length; i++) {
            if (word[i] === selectedWord[i]) {
                newColors[currentRow][i] = "#50ad44"; // Correct letter
                correctLettersCount++;
                setGameScore((score) => score + 10);
            } else if (selectedWord.includes(word[i])) {
                newColors[currentRow][i] = "#dea709"; // Correct letter wrong place
            } else {
                newColors[currentRow][i] = "#919191"; // Wrong letter
                setNoKeys((prev) => [...prev, word[i]]);
            }
        }
    
        setRightLetterLength(correctLettersCount);
        setCurrentRow((prevRow) => prevRow + 1);
        setCurrentCol(0);
        setWord([]);
        setColors(newColors);
    
        _storeData(
            correctLettersCount === selectedWord.length
                ? gameScore + 10
                : gameScore
        );
    };
    

    const hasFinished = () => {
        if (currentRow === 5) {
            setHasWon(false);
            setShowGameOver(true);
        }
    };

    const handlePress = () => {
        router.push("/");
    };

    const _storeData = async (score) => {
        try {
            await AsyncStorage.setItem("score", score.toString());
            await AsyncStorage.setItem("word", selectedWord.toString());
        } catch (error) {
            console.error("Error saving score:", error);
        }
    };

    // useEffect hooks
    useEffect(() => {
        const backAction = () => {
            router.push("/HomeScreen");
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
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

    useEffect(() => {
        randomWord();
    }, []);

    useEffect(() => {
        hasFinished();
    }, [currentRow]);

    useEffect(() => {
        if (rightLetterLength === selectedWord.length) {
            setHasWon(true);
            setShowYouWon(true);
        }
    }, [rightLetterLength, selectedWord.length]);

    useEffect(() => {
        if (showGameOver) {
            router.push("/GameOver");
        }
        if (showYouWon) {
            router.push("/YouWon");
        }
    }, [showGameOver, showYouWon]);

    useEffect(() => {
        if (showGameOver || showYouWon) {
            _storeData(gameScore);
        }
    }, [showGameOver, showYouWon, gameScore]);

    console.warn(selectedWord)

    return (
        <ImageBackground source={Background} style={styles.backgroundImage}>
            <View style={styles.containerMain}>
                <Image source={Logo} style={styles.logo} resizeMode="center" />
                <Pressable onPress={handlePress} style={styles.homeIco}>
                    <Ionicons
                        name="arrow-back-circle-outline"
                        size={24}
                        color="white"
                    />
                </Pressable>
                <Text style={styles.score}>Score: {gameScore}</Text>
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
                <Pressable style={styles.button} onPress={()=>checkWord()}>
                    <FontAwesome name="check-square-o" size={24} color="white" />
                </Pressable>
                <KeyboardLayout onKeyPressed={onKeyPressed} noKeys={noKeys} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    button: {
        marginHorizontal: 4,
        padding: 10,
        backgroundColor: "#333",
        borderRadius: 5,
        zIndex:10,
        top:'15.2%',
        right:'42%'
    },
    cell: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 8,
        bottom: '5%',
    },
    cellText: {
        color: "white",
        fontSize: 25,
        fontFamily: "Fun",
    },
    containerMain: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    homeIco: {
        right: 140,
    },
    logo: {
        width: 250,
        position: "absolute",
        bottom: "25%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    score: {
        fontFamily: "Fun",
        fontSize: 24,
        color: "white",
        bottom:'3%',
        right: "3%",
        alignSelf: "flex-end",
    },
});
