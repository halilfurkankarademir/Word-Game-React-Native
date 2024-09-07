import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from "react-native";
import HomeScreen from "./HomeScreen"

export default function App() {

    return (
        <View style={styles.containerMain}>
            <HomeScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
    },
});
