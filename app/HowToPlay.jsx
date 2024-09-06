import { View, Text,ImageBackground,StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Background from "../assets/images/howtoplay.png"
import { useRouter} from 'expo-router';
import i18next from "../services/i18next";
import { useTranslation } from "react-i18next";

export default function HowToPlay() {
    
    const {t} = useTranslation();

    const router = useRouter();
    
    const homepage = () =>{
        router.push('/HomeScreen');
    }

    return (
    <ImageBackground style={{flex:1,justifyContent:'center',alignItems:'center',}} source={Background}>
      <Text style={styles.title}>{t('howtoplay.title')}</Text>
      <View style={{flexDirection:'row'}}>
        <View style={styles.cell1}></View>
        <Text style={styles.text}>{t('howtoplay.wrong')}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={styles.cell2}></View>
        <Text style={styles.text}>{t('howtoplay.wrongplace')}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={styles.cell3}></View>
        <Text style={styles.text}>{t('howtoplay.correct')}</Text>
      </View>
      <Pressable style={styles.button} onPress={homepage}>
        <Text style={{fontFamily:'Fun', color:'white', fontSize:wp('6%')}}>{t('howtoplay.button')}</Text>
      </Pressable>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#0080ff",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ffffff",
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "center",
        elevation: 1,
        width: wp('35%'),
        marginVertical: 15,
        top:wp('10%')
    },
    cell1: {
        width: wp("12%"),
        height: wp("12%"),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:'#919191',
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 8,
        bottom: wp("5%"),
    },
    cell2: {
        width: wp("12%"),
        height: wp("12%"),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:'#dea709',
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 8,
        bottom: wp("5%"),
    },
    cell3: {
        width: wp("12%"),
        height: wp("12%"),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:'#50ad44',
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 8,
        bottom: wp("5%"),
    },
    title: {
        fontFamily: "Fun",
        fontSize: wp('12%'),
        textAlign: "center",
        marginBottom: 10,
        color: "white",
        bottom: wp('25%')
    },
    text: {
        width:wp('80%'),
        fontFamily: "Fun",
        fontSize: wp('6%'),
        color: "white",
    },
});
