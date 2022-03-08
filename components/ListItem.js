import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

import LocalizationContext from "../utils/LocalizationContext";

import { CustomButton } from "../components/CustomButtons";
import { shortenText } from "../utils/helperFunctions";

const ListItem = (props) => {

  const { t } = useContext(LocalizationContext);
  const locale = props.locale;

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{props.item.name[locale] !== null ? props.item.name[locale] : props.item.name.fi}</Text>
      </View>
      <View
        style={{
          height: (props.visible) ? null : 0,
          overflow: 'hidden',
        }}>
        <Text style={{ fontSize: 14, color: "#2c3e50" }}>{props.item.location.address.street_address}, {props.item.location.address.locality}</Text>

        <Text style={{ fontSize: 16, color: "#2c3e50" }}>{shortenText(props.item.description.intro, 150)}</Text>
        <View style={styles.buttonStyle}>
          <CustomButton title={t("show_in_new_window")} onPress={() => {
            props.onPress({
              routeName: "Extra",
              params: {
                item: props.item,
                type: props.type
              }
            });
          }}></CustomButton>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#95A5A6',
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 8
  },
  title: {
    fontSize: 18,
    color: "#FFFAFA"
  },
  buttonStyle: {
    backgroundColor: null,
    marginVertical: 10,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
});

export default ListItem;