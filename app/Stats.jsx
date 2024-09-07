import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import Background from "../assets/images/statsbg.png";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage import edilmeli
import { useTranslation } from "react-i18next";

export default function Stats() {

    const {t} = useTranslation();

    const [score, setScore] = useState("");
    const [timesPlayed,setTimesPlayed] = useState();
    const [win,setWin] = useState();
    const [lose,setLose] = useState();
    const router = useRouter();

    useEffect(() => {
        const loadScore = async () => {
            try {
                const storedScore = await AsyncStorage.getItem("score");
                const storedTimesPlayed = await AsyncStorage.getItem("timesPlayed");
                const storedWinCount = await AsyncStorage.getItem("winCount");
                const storedLoseCount = await AsyncStorage.getItem("loseCount");
                if(storedWinCount){
                    setWin(storedWinCount);
                }
                else{
                    setWin("0");
                }
                if(storedLoseCount){
                    setLose(storedLoseCount);
                }
                else{
                    setLose("0");
                }
                if(storedTimesPlayed){
                    setTimesPlayed(storedTimesPlayed)
                }
                else{
                    setTimesPlayed("0");
                }
                if (storedScore) {
                    setScore(storedScore);
                } else {
                    setScore("0");
                }
            } catch (error) {
                console.error("Error loading score:", error);
            }
        };

        loadScore();
    }, []);

    const closeStats = () => {
        router.push("/HomeScreen");
    };

    return (
        <View style={styles.containerMain}>
            <ImageBackground
                style={styles.backgroundImage}
                source={Background}
                resizeMode="cover"
            >
                <View style={styles.innerContainer}>
                    <FontAwesome6
                        name="window-close"
                        size={24}
                        color="white"
                        style={styles.closeIco}
                        onPress={() => closeStats()}
                    />
                    <Text style={styles.title}>
                        {t('stats.title')}{" "}
                        <Ionicons
                            name="stats-chart"
                            size={wp("8%")}
                            color="white"
                        />
                    </Text>
                    <Text style={styles.text}>{t('stats.score')}: <Text style={styles.text2}>{score}</Text></Text>
                    <Text style={styles.text}>{t('stats.times')}: <Text style={styles.text2}>{timesPlayed}</Text></Text>
                    <Text style={styles.text}>{t('stats.win')}: <Text style={styles.text2}>{win}</Text></Text>
                    <Text style={styles.text}>{t('stats.lose')}: <Text style={{color:'#ff2e4a'}}>{lose}</Text></Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    closeIco: {
        alignSelf: "flex-end",
    },
    containerMain: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    innerContainer: {
        width: wp("80%"),
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderRadius: 10,
        padding: wp("10%"),
    },
    title: {
        fontFamily: "Fun",
        fontSize: wp("12%"),
        textAlign: "center",
        marginBottom: 10,
        color: "white",
    },
    text: {
        fontFamily: "Fun",
        fontSize: wp("6%"),
        color: "white",
        textAlign: "center",
    },
    text2: {
        fontFamily: "Fun",
        fontSize: wp("6%"),
        color: "#40de07",
        textAlign: "center",
    },
});
