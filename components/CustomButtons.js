import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={styles.appButtonContainer} onPress={() => props.onPress()}>
            <Text style={styles.appButtonText}>{props.title}</Text>
        </TouchableOpacity>
    )
};

const MainScreenButton = (props) => {
    return (
        <TouchableOpacity style={styles.mainScreenButtonContainer} onPress={() => props.onPress()}>
            <Text style={styles.mainButtonText}>{props.title}</Text>
        </TouchableOpacity>
    )

};

const ApplyButton = (props) => {
    return (
        <TouchableOpacity style={styles.applyButtonContainer} onPress={() => props.onPress()}>
            <Text style={styles.applyButtonText}>{props.title}</Text>
        </TouchableOpacity>
    )
};

const CancelButton = (props) => {
    return (
        <TouchableOpacity style={styles.cancelButtonContainer} onPress={() => props.onPress()}>
            <Text style={styles.cancelButtonText}>{props.title}</Text>
        </TouchableOpacity>
    )
};

const OpenMapButton = (props) => {
    return (
        <TouchableOpacity style={styles.openMapButtonContainer} onPress={() => props.onPress()}>
            <Text style={styles.openMapButtonText}>{props.title}</Text>
        </TouchableOpacity>
    )
};

const FavoritesButton = (props) => {
    return (
        <TouchableOpacity style={styles.favoritesButtonContainer} onPress={() => props.onPress()}>
            <Text style={styles.favoritesButtonText}>{props.title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#2c3e50",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        //margin: 0
        //alignSelf: "flex-start",
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        alignSelf: "center",
    },
    mainButtonText: {
        fontSize: 14,
        color: "#ecf0f1",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    applyButtonText: {
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
    },
    cancelButtonText: {
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
    },
    openMapButtonText: {
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
    },
    favoritesButtonText: {
        fontSize: 18,
        color: "#ecf0f1",
        alignSelf: "center",
    },
    mainScreenButtonContainer: {
        margin: 20,
        width: "80%",
        backgroundColor: "#2980b9",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: "center",
    },
    applyButtonContainer: {
        elevation: 8,
        backgroundColor: "#27ae60",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignSelf: "flex-start"
    },
    cancelButtonContainer: {
        elevation: 8,
        backgroundColor: "#c0392b",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignSelf: "flex-start"
    },
    openMapButtonContainer: {
        elevation: 8,
        backgroundColor: "#7f8c8d",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignSelf: "flex-start"
    },
    favoritesButtonContainer: {
        elevation: 8,
        backgroundColor: "#2980b9",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },

});

module.exports = {
    CustomButton,
    MainScreenButton,
    ApplyButton,
    CancelButton,
    OpenMapButton,
    FavoritesButton
}