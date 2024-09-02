import { View, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Settings({ isVisible, handleClose }) {
    return (
        <>
            {isVisible && (
                <View style={styles.container}>
                    <AntDesign
                        name="closecircleo"
                        size={24}
                        color="white"
                        style={styles.closeIco}
                        onPress={handleClose}
                    />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        width: "60%",
        height: "40%",
        position: "absolute",
        zIndex: 2,
        borderRadius: 10,
    },
    closeIco: {
        alignSelf: "flex-end",
        marginHorizontal: 10,
        marginVertical: 10,
    },
});
