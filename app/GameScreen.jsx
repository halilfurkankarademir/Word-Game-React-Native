import {
    StyleSheet,
    View,
    Pressable,
    Text,
    ImageBackground,
    Image,
    BackHandler
} from "react-native";
import { useEffect, useState } from "react";
import WordsJson from "../assets/words.json";
import React from "react";
import KeyboardLayout from "../components/Keyboard";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "../assets/images/wh_logo_small.png";
import Background from "../assets/images/gamebg.png";
import GameOver from "../components/GameOver";

export default function GameScreen() {
    const [selectedWord, setSelectedWord] = useState("");
    const [hasWon, setHasWon] = useState(false);
    const [showGameOver,setShowGameOver] = useState(false);
    const [wordsData, setWordsData] = useState(WordsJson);
    const [noKeys, setNoKeys] = useState([]); // If letter is not in the word add in no keys array
    const [gameScore, setGameScore] = useState(0);

    const router = useRouter();

    useEffect(() => {
        const backAction = () => {
            router.back(); 
            return true;  
        };
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    
        return () => backHandler.remove(); 
    }, []);

    useEffect(() => {
        //Update layout for each random word
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
        setSelectedWord(wordsData[randomIndex]); //Select random word from words data
    };

    const letters = selectedWord.split("");
    const [rows, setRows] = useState(
        //Create rows up to the letters length
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
                newColors[currentRow][i] = "#dea709";
                // If word includes that letter make it's bg is yellow
            } else {
                newColors[currentRow][i] = "#919191";
                setNoKeys((prev) => [...prev, word[i]]);
                // If word doesn't include letter make it's bg light gray and add no key array
            }
            if (letters[i] === word[i]) {
                newColors[currentRow][i] = "#50ad44";
                correctLettersCount++;
                setGameScore(score=>score+10);
                // If letter is on the right place make it's bg is green
            }
        }
        setRightLetterLength(correctLettersCount);
        setCurrentRow((prevRow) => prevRow + 1);
        setCurrentCol(0);
        setWord([]);
        setColors(newColors);
    };

    const hasFinished = () =>{
        if(currentRow===5){
            setHasWon(false);
            setShowGameOver(true);
        }
    }
    useEffect(()=>{
        hasFinished();
    },[currentRow]);

    useEffect(() => {
        if (rightLetterLength === letters.length) {
            setHasWon(true);
            setShowGameOver(true);
        }
    }, [rightLetterLength, letters.length]);



    const handlePress = () => {
        router.push("/");
    };


    return (
        <ImageBackground source={Background} style={styles.backgroundImage}>
            <View style={styles.containerMain}>
                {
                    showGameOver && (
                        <GameOver hasWon={hasWon}></GameOver>
                    )
                }
                
                <Image
                    source={Logo}
                    style={styles.logo}
                    resizeMode="center"
                ></Image>
                <Pressable onPress={handlePress} style={styles.homeIco}>
                    <Ionicons
                        name="arrow-back-circle-outline"
                        size={32}
                        color="white"
                    />
                </Pressable>
                <Text style={styles.score}>Score:{" "}{gameScore}</Text>
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
                    <Text
                        style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: 20,
                            color: "white",
                        }}
                    >
                        {selectedWord}{" "}
                        <FontAwesome
                            name="check-square-o"
                            size={18}
                            color="white"
                        />
                    </Text>
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
        backgroundColor: "#009f1a",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ffffff",
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#e67a73",
        shadowOffset: { width: 0, height: 39 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 1,
        width: 200,
        bottom: "2%",
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
        bottom: 50,
    },
    cellText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "Poppins",
    },
    containerMain: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    homeIco: {
        bottom: '5%',
        right: 140,
    },
    logo: {
        width: 200,
        position: "absolute",
        bottom: "25%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    score:{
        fontFamily: "Poppins",
        fontSize:18,
        color:'white',
        bottom:65,
        right:'3%',
        alignSelf:'flex-end'
    },
    title: {
        color: "white",
        fontWeight: "bold",
        bottom: "30%",
        fontSize: 40,
        fontFamily: "Poppins",
        textAlign: "center",
    },

});
