import React, { useContext } from "react";
import {
    StyleSheet,
    View,
    Text
} from "react-native";

import * as HelsinkiApi from "../utils/api";

import LocalizationContext from "../utils/LocalizationContext";
import { MainScreenButton } from "../components/CustomButtons";
import { sortData, createTagsObject } from "../utils/helperFunctions";


const OptionBox = (props) => {
    const { t } = useContext(LocalizationContext);
    let locale = LocalizationContext._currentValue.locale;
    if (locale !== "fi" && locale !== "en") { locale = "en" };
    const { navigationProps } = props;

    const apiGet = async (path, type) => {
        try {
            const resp = await HelsinkiApi.get(path, locale);
            const tagObj = createTagsObject(resp.tags);
            navigationProps.navigate({
                routeName: "Query",
                params: {
                    resp: sortData(resp.data, locale),
                    tagObj: tagObj,
                    type: type
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.primaryStyle}>
            <View>
                <Text style={styles.textStyle}>{t("what_to_search")}</Text>
            </View>
            <View style={styles.spacing}></View>
            <View style={styles.buttonContainerStyle}>
                <MainScreenButton title={t("places")} onPress={async () => apiGet("v2/places/", "places")}></MainScreenButton>
                <View style={styles.spacing}></View>
                <MainScreenButton title={t("events")} onPress={async () => apiGet("v1/events/", "events")}></MainScreenButton>
                <View style={styles.spacing}></View>
                <MainScreenButton title={t("activities")} onPress={async () => apiGet("v1/activities/", "activities")}></MainScreenButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    primaryStyle: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    buttonContainerStyle: {
        margin: 20,
        width: "40%",
    },
    spacing: {
        height: 35,
    },
    textStyle: {
        color: "white",
        fontSize: 25
    }
})

export default OptionBox;