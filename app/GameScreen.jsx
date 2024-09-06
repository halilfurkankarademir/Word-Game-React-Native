import {
    Animated,
    StyleSheet,
    View,
    Pressable,
    Text,
    ImageBackground,
    Image,
    BackHandler,
    ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import WordsEnJson from "../assets/words/wordsEn.json";
import WordsTrJson from "../assets/words/wordsTr.json";
import React from "react";
import KeyboardLayout from "../components/Keyboard";
import { useRouter } from "expo-router";
import Logo from "../assets/images/wh_logo_small.png";
import Background from "../assets/images/gamebg.png";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import i18next from "../services/i18next";
import { useTranslation } from "react-i18next";

export default function GameScreen() {
    const { t } = useTranslation();
    const [lang, setLang] = useState('en');
    const [selectedWord, setSelectedWord] = useState("");
    const [hasWon, setHasWon] = useState(false);
    const [showGameOver, setShowGameOver] = useState(false);
    const [showYouWon, setShowYouWon] = useState(false);
    const [wordsData, setWordsData] = useState([]);
    const [noKeys, setNoKeys] = useState([]);
    const [gameScore, setGameScore] = useState(0);
    const [keyboardSound, setKeyboardSound] = useState();
    const [revealSound, setRevealSound] = useState();
    const [goBackSound, setGoBackSound] = useState();

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

    const [animatedColors, setAnimatedColors] = useState(
        Array.from(
            { length: 5 },
            () => Array.from({ length: 5 }, () => new Animated.Value(0))
        )
    );

    const router = useRouter();

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const savedLang = await AsyncStorage.getItem('language');
                if (savedLang) {
                    setLang(savedLang);
                }
            } catch (error) {
                console.error('Error loading language:', error);
            }
        };

        loadLanguage();
    }, []);

    useEffect(() => {
        if (lang === 'en') {
            setWordsData(WordsEnJson);
        } else if (lang === 'tr') {
            setWordsData(WordsTrJson);
        }
    }, [lang]);

    useEffect(() => {
        const loadSound = async (soundFile, setSound) => {
            try {
                const { sound } = await Audio.Sound.createAsync(soundFile);
                setSound(sound);
                await sound.setVolumeAsync(0.05);
            } catch (error) {
                console.error("Error loading sound:", error);
            }
        };

        loadSound(require("../assets/sounds/keyboard.mp3"), setKeyboardSound);
        loadSound(require("../assets/sounds/reveal.mp3"), setRevealSound);
        loadSound(require("../assets/sounds/button-click.mp3"), setGoBackSound);

        return () => {
            keyboardSound?.unloadAsync();
            revealSound?.unloadAsync();
            goBackSound?.unloadAsync();
        };
    }, []);

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
        if (selectedWord && wordsData) {
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
            setAnimatedColors(
                Array.from({ length: letters.length }, () =>
                    Array.from(
                        { length: letters.length },
                        () => new Animated.Value(0)
                    )
                )
            );
        }
    }, [selectedWord]);


    useEffect(() => {
        randomWord();
    }, [wordsData]);


    useEffect(() => {
        const checkGameStatus = () => {
            if (currentRow >= selectedWord.length && word.join("") !== selectedWord) {
                setHasWon(false);
                setShowYouWon(false);
                setShowGameOver(true);
            }
            if (rightLetterLength === selectedWord.length) {
                setHasWon(true);
                setShowYouWon(true);
                setShowGameOver(false);
            }
        };
        checkGameStatus();
    }, [currentRow, rightLetterLength, selectedWord, word]);

    useEffect(() => {
        if (showGameOver || showYouWon) {
            _storeData(gameScore);
        }
        if (showGameOver) {
            router.push("/GameOver");
        }
        if (showYouWon) {
            router.push("/YouWon");
        }
    }, [showGameOver, showYouWon, gameScore]);

    useEffect(() => {
        if (currentCol > 4) {
            checkWord();
        }
    }, [currentCol]);

    const playKeyboardSound = async () => {
        if (keyboardSound) {
            await keyboardSound.replayAsync();
        }
    };

    const playRevealSound = async () => {
        if (revealSound) {
            await revealSound.replayAsync();
        }
    };

    const playGoBackSound = async () => {
        if (goBackSound) {
            await goBackSound.replayAsync();
        }
    };

    const showToast = async () => {
        ToastAndroid.show("Word can not be empty!", ToastAndroid.SHORT);
    };

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomWord = () => {
        if (wordsData.length > 0) {
            const randomIndex = getRandomNumber(0, wordsData.length - 1);
            setSelectedWord(wordsData[randomIndex]);
        }
    };

    const animateCell = (rowIndex, cellIndex, newColor) => {
        Animated.timing(animatedColors[rowIndex][cellIndex], {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const onKeyPressed = async (key) => {
        const newRows = rows.map((row) => [...row]);
        const newColors = colors.map((row) => [...row]);
        await playKeyboardSound();

        if (key === "backspace") {
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

        if (word.length === 0) {
            showToast();
            return;
        } else {
            playRevealSound();

            for (let i = 0; i < selectedWord.length; i++) {
                if (word[i] === selectedWord[i]) {
                    newColors[currentRow][i] = "#50ad44";
                    correctLettersCount++;
                    setGameScore((score) => score + 10);
                    animateCell(currentRow, i, "#50ad44");
                } else if (selectedWord.includes(word[i])) {
                    newColors[currentRow][i] = "#dea709";
                    animateCell(currentRow, i, "#dea709");
                } else {
                    newColors[currentRow][i] = "#919191";
                    setNoKeys((prev) => [...prev, word[i]]);
                    animateCell(currentRow, i, "#919191");
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
        }
    };

    const handlePress = async () => {
        await playGoBackSound();
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

    return (
        <ImageBackground source={Background} style={styles.backgroundImage}>
            <View style={styles.containerMain}>
                <Image source={Logo} style={styles.logo} resizeMode="center" />
                <Pressable onPress={handlePress} style={styles.homeIco}>
                    <Text style={styles.back}>{t("game.goback")}</Text>
                </Pressable>
                <Text
                    style={styles.score}
                    onPress={() => console.warn(selectedWord)}
                >
                    {t("game.score")}: {gameScore}
                </Text>
                <View style={styles.container}>
                    {rows.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((cell, cellIndex) => (
                                <Animated.View
                                    key={cellIndex}
                                    style={[
                                        styles.cell,
                                        {
                                            backgroundColor: animatedColors[
                                                rowIndex
                                            ][cellIndex].interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [
                                                    "#4a4a4a",
                                                    colors[rowIndex][cellIndex],
                                                ],
                                            }),
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
                                </Animated.View>
                            ))}
                        </View>
                    ))}
                </View>
                <KeyboardLayout onKeyPressed={onKeyPressed} noKeys={noKeys} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    back: {
        fontFamily: "Fun",
        color: "white",
        fontSize: wp("6%"),
        left: "5%",
        bottom: wp("25%"),
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: wp("100%"),
        height: hp("110%"),
    },
    cell: {
        width: wp("12%"),
        height: wp("12%"),
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 8,
        bottom: wp("30%"),
    },
    cellText: {
        color: "white",
        fontSize: wp("6%"),
        fontFamily: "Fun",
    },
    containerMain: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    homeIco: {
        right: wp("35%"),
    },
    logo: {
        width: wp("50%"),
        height: hp("40%"),
        bottom: wp("0%"),
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    score: {
        fontFamily: "Fun",
        fontSize: wp("6%"),
        color: "white",
        bottom: wp("31%"),
        left: wp("30%"),
    },
});
