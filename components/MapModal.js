import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";

import LocalizationContext from "../utils/LocalizationContext";

const MapModal = (props) => {
  const { t } = useContext(LocalizationContext);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props.closeModal();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>


          <View style={styles.container}>
            {<MapView
              loadingEnabled={true}
              style={styles.map}
              initialRegion={{
                latitude: props.lat,
                longitude: props.lon,
                latitudeDelta: 0.00522,
                longitudeDelta: 0.00522,
              }}>
              <Marker coordinate={props.region}></Marker>
            </MapView>}
          </View>

          {<TouchableOpacity style={styles.btnContainer} onPress={() => props.closeModal()}>
            <Text style={styles.appButtonText}>{t("close_map")}</Text>
          </TouchableOpacity>}
        </View>

      </View>
    </Modal>
  );

};

const styles = StyleSheet.create({
  container: {
    //...StyleSheet.absoluteFillObject,
    flex: 2,
    // margin: 20,
    width: "100%",
    //backgroundColor: "green",
    //justifyContent: "flex-end",
    //alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {

    width: "80%",
    height: "50%",
    margin: 20,
    backgroundColor: "#FFFAFA",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyleModal: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  btnContainer: {
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
  }
});

export default MapModal;