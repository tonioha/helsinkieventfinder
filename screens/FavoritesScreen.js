import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    StyleSheet,
    FlatList,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as HelsinkiApi from "../utils/api";
import LocalizationContext from "../utils/LocalizationContext";
import ListItem from "../components/ListItem";
import { sortData } from "../utils/helperFunctions";

import { keyExtractor } from "../utils/helperFunctions";

const FavoritesScreen = (props) => {
    const [lastPressedId, setLastPressedId] = useState();
    const locale = LocalizationContext._currentValue.locale;
    const { navigation } = props;

    const [queryData, setQueryData] = useState([]);

    const loadFavorites = useCallback(async () => {
        try {
            const data = await AsyncStorage.getItem("favorites");
            const parsedData = JSON.parse(data);
            const apiData = await HelsinkiApi.getMultipleWithId(parsedData, locale);
            sortData(apiData, locale)
            setQueryData(apiData);
        } catch (err) {
            console.log("Reading error: " + err);
        }
    }, []);

    useEffect(() => {
        const focusListener = navigation.addListener('didFocus', () => {
            loadFavorites();
        });
        return () => {
            focusListener.remove();
        };
    }, []);


    const Item = ({ item }) => (
        <View>
            <TouchableHighlight underlayColor="none" onPress={() => { setLastPressedId(item.id) }}>
                <ListItem item={item}
                    onPress={props.navigation.navigate}
                    type={item.type}
                    locale={locale}
                    visible={(lastPressedId === item.id)}>
                </ListItem>
            </TouchableHighlight>
        </View>
    );

    const renderItem = ({ item }) => {
        return (
            <Item item={item} />
        );
    };

    return (
        <View style={styles.backGroundStyle}>
            <View style={{ height: 10 }}></View>
            <View style={styles.container}>
                <FlatList initialNumToRender={20}
                    data={queryData}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}>
                </FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backGroundStyle: {
        backgroundColor: "#2C3E50",
        flex: 1,
        //alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        fontSize: 18,
        color: "#ecf0f1",
        padding: 3
    },
    container: {
        flex: 4,
    }
});

export default FavoritesScreen;