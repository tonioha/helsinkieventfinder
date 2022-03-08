import React from "react";
import {
  View,
  StyleSheet,
  Button
} from "react-native";

import OptionBox from "../components/OptionBox";
import { FavoritesButton } from "../components/CustomButtons";

const MainScreen = (props) => {
  return (
    <View style={styles.backGroundStyle}>
      <View style={styles.container}>
        <View style={{ width: "30%", alignSelf: "flex-end" }}>
          {<FavoritesButton title="Suosikit" onPress={() => {
            props.navigation.navigate({
              routeName: "Favorites"
            })
          }}></FavoritesButton>}
        </View>
      </View>
      <OptionBox navigationProps={props.navigation}></OptionBox>
    </View>
  );
}

const styles = StyleSheet.create({
  backGroundStyle: {
    backgroundColor: "#2C3E50",
    height: "100%",
    //alignItems: "center",
    justifyContent: "center",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'flex-end',

    position: 'absolute', // add if dont work with above
  }
});

export default MainScreen;