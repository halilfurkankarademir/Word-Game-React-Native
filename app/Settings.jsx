import {
    View,
    StyleSheet,
    Text,
    Switch,
    Image,
    TouchableOpacity,
    ImageBackground
} from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Audio } from "expo-av";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useTranslation } from "react-i18next";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import TRflag from "../assets/images/tr.png";
import UKflag from "../assets/images/uk.png";
import Background from "../assets/images/settingsbg.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Settings({ toggleMusic }) {
    const [switchSound, setSwitchSound] = useState();
    const { t, i18n } = useTranslation();

    const router = useRouter();


    const closeSettings = () =>{
        router.push('/HomeScreen');
    }

    const handleLanguageChange = async (lang) => {
        await AsyncStorage.setItem("language", lang); // Dil tercihini kaydet
        i18n.changeLanguage(lang);
    };

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const savedLang = await AsyncStorage.getItem("language");
                if (savedLang) {
                    i18n.changeLanguage(savedLang);
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadLanguage();
    }, []);

    return (
        <ImageBackground style={styles.container} source={Background}>
            <View style={styles.innerContainer}>
                <FontAwesome6
                    name="window-close"
                    size={24}
                    color="white"
                    style={styles.closeIco}
                    onPress={() => closeSettings()}
                />
                <Text style={styles.title}>{t("settings.title")}</Text>

                
                <View style={styles.language}>
                    <Text style={styles.text}>{t("settings.language")}{"   "}</Text>
                    <TouchableOpacity
                        onPress={() => handleLanguageChange("tr")}
                        style={[
                            styles.flagContainer,
                            i18n.language === "tr" && styles.selectedFlag,
                        ]}
                    >
                        <Image
                            style={styles.flag}
                            source={TRflag}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleLanguageChange("en")}
                        style={[
                            styles.flagContainer,
                            i18n.language === "en" && styles.selectedFlag,
                        ]}
                    >
                        <Image
                            style={styles.flag}
                            source={UKflag}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('5%'),
    },
    innerContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Add slight transparency for readability
        borderRadius: 10,
        padding: wp('5%'),
        alignItems: 'center',
        width: '100%',
    },
    closeIco: {
        alignSelf: "flex-end",
        marginVertical: 20,
    },
    flag: {
        width: wp("8%"),
        height: wp("8%"),
        marginHorizontal: wp("1.5%"),
    },
    language: {
        flexDirection: "row",
        marginVertical: wp("5%"),
    },
    flagContainer: {
        borderRadius: wp("2%"),
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedFlag: {
        borderColor: '#e4b979', // Highlight selected flag
    },
    title: {
        fontFamily: "Fun",
        fontSize: wp("8%"),
        textAlign: "center",
        color: "white",
        marginBottom: wp("5%"),
    },
    text: {
        fontFamily: "Fun",
        fontSize: wp("6%"),
        color: "white",
        marginBottom: wp("2%"),
    },
    settingsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: wp("3%"),
    },
});
