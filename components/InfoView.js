import React, { useContext, useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, Linking } from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

import LocalizationContext from "../utils/LocalizationContext";
import { OpenMapButton } from "../components/CustomButtons";
import { checkDate } from "../utils/helperFunctions";

const InfoView = (props) => {
  const { t } = useContext(LocalizationContext);
  const startDate = checkDate(props.item.event_dates?.starting_day, props.locale);
  const endDate = checkDate(props.item.event_dates?.ending_day, props.locale);
  const webUrl = props.item.info_url;
  const [isFavorited, setIsFavorited] = useState(null);

  const handleStartLoadWithRequest = (req) => {
    const { url } = req;
    if (!url) return false;

    Linking.openURL(url);

    return false;
  };

  const toggleFavorite = async (item, type) => {
    if (isFavorited) {
      const value = JSON.parse(await AsyncStorage.getItem("favorites"));
      if (value !== null) {
        const favsDeleted = value.filter(i => i.id !== item.id);
        try {
          await AsyncStorage.setItem("favorites", JSON.stringify(favsDeleted));
          Toast.show(t("removed_fav"));
          setIsFavorited(false);
          props.favorited = false;
        } catch (err) {
          console.log("Saving error: " + err)
        }
      }

    } else {

      try {
        const value = await AsyncStorage.getItem("favorites");
        if (value !== null) {
          let favs = JSON.parse(value);
          if (!favs.some(x => x.id === item.id)) {
            favs.push({ id: item.id, type: type });
            try {
              await AsyncStorage.setItem("favorites", JSON.stringify(favs));
              setIsFavorited(true);
              Toast.show(t("added_to_fav"));
            } catch (err) {
              console.log("Saving error: " + err);
              Toast.show(t("err_fav_save"));
            }
          } else {
            Toast.show(t("already_fav"));
          }

        } else {

          try {
            await AsyncStorage.setItem("favorites", JSON.stringify(data));
          } catch (err) {
            console.log("Saving error: " + err)
          }
        }
      } catch (err) {
        console.log("Reading error: " + err);
      }
    }
  };

  useEffect(() => {
    setIsFavorited(props.favorited);
  }, [props.favorited])

  return (
    <ScrollView>
      <View style={[{ flex: 2 }]}>
        <Text style={styles.title}>{props.item.name[props.locale] !== null ? props.item.name[props.locale] : props.item.name.fi}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textStyle}>{props.item.location.address.street_address}</Text>
          <Text style={styles.textStyle}>{props.item.location.address.locality}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <OpenMapButton title={t("show_on_map")} onPress={() => props.onPress()}></OpenMapButton>
          <OpenMapButton title={isFavorited === true ? t("remove_from_fav") : t("add_to_fav")} onPress={() => toggleFavorite(props.item, props.type)}></OpenMapButton>
        </View>
        {props.type === "events" ? (
          <View>
            <Text style={styles.textStyle}>{t("start")}{startDate}</Text>
            <Text style={styles.textStyle}>{t("stop")}{endDate}</Text>
          </View>
        ) : null}
        {webUrl !== null ? <Text style={styles.textStyle} onPress={() => { Linking.openURL(props.item.info_url) }}>{props.item.info_url}</Text> : null}

        <Text style={styles.textStyle}>{props.item.description.intro}</Text>

        {props.type === "events" || props.type === "activities" ? (
          <View style={{ backgroundColor: "green" }}>
            <AutoHeightWebView
              originWhitelist={['*']}
              source={{ html: '<div style="color: white">' + props.item.description.body + '</div>' }}
              scalesPageToFit={false}
              style={{ backgroundColor: "#2C3E50" }}
              onShouldStartLoadWithRequest={handleStartLoadWithRequest}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    color: "white",
    padding: 3,
    marginVertical: 2,
    //width:"55%"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 4,
    color: "#FFFAFA"
  }
});

export default InfoView;