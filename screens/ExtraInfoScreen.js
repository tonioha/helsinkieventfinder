import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import LocalizationContext from "../utils/LocalizationContext";
import MapModal from "../components/MapModal";
import InfoView from "../components/InfoView";
import AsyncStorage from '@react-native-async-storage/async-storage';



const ExtraInfoScreen = (props) => {
  const locale = LocalizationContext._currentValue.locale;
  const selectedItem = props.navigation.state.params.item;
  const type = props.navigation.state.params.type;
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavorited, setIsFavorited] = useState(null);

  const selectedRegion = {
    latitude: selectedItem.location.lat,
    longitude: selectedItem.location.lon,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const checkIfFavorited = useCallback(async () => {

    try {
      const value = JSON.parse(await AsyncStorage.getItem("favorites"));
      if (value.some(i => i.id === selectedItem.id)) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    } catch (err) {
      console.log("Reading error: " + err);
    }
  }, []);

  useEffect(() => {
    checkIfFavorited();
  }, [checkIfFavorited])

  return (
    <View style={styles.backGroundStyle}>

      <MapModal closeModal={() => { setModalVisible(false) }}
        visible={modalVisible}
        lat={selectedItem.location.lat}
        lon={selectedItem.location.lon}
        region={selectedRegion}>
      </MapModal>

      <InfoView
        item={selectedItem}
        locale={locale}
        type={type}
        onPress={() => setModalVisible(!modalVisible)}
        favorited={isFavorited}>
      </InfoView>

    </View>
  );

}

const styles = StyleSheet.create({
  backGroundStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#2C3E50",
    //height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default ExtraInfoScreen;