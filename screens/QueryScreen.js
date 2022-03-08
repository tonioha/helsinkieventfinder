import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import DropDownPicker from 'react-native-dropdown-picker';

import LocalizationContext from "../utils/LocalizationContext";
import { ApplyButton, CancelButton } from "../components/CustomButtons";
import ListItem from "../components/ListItem";

import { keyExtractor } from "../utils/helperFunctions";

const QueryScreen = (props) => {
  const { t } = useContext(LocalizationContext);
  const [lastPressedId, setLastPressedId] = useState();
  const tags = props.navigation.state.params.tagObj;
  const type = props.navigation.state.params.type;
  const locale = LocalizationContext._currentValue.locale;

  if (locale === "fi") { DropDownPicker.setLanguage("FI"); }

  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(tags);
  const [queryData, setQueryData] = useState([]);
  const [backupData, setBackupData] = useState([]);

  useEffect(() => {
    setQueryData(props.navigation.state.params.resp);
    setBackupData(props.navigation.state.params.resp);
  }, [])

  const applyFilter = () => {
    const filteredData = backupData.filter(({ tags }) =>
      value.every((t) => tags.some((ta) => ta.name.toUpperCase() === t.toUpperCase())));

    setLastPressedId(null);
    setQueryData(filteredData);
  }

  const clearFilter = () => {
    setValue([]);
    setQueryData(backupData);
  }

  const Item = ({ item }) => (
    <View>
      <TouchableHighlight underlayColor="none" onPress={() => { setLastPressedId(item.id); setOpen(false) }}>
        <ListItem item={item}
          onPress={props.navigation.navigate}
          type={type}
          locale={locale}
          visible={(lastPressedId === item.id)}
          favorited={false}>
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
      <View style={[{ backgroundColor: "#2C3E50", marginHorizontal: 8 }, {
        flex: (isOpen) ? 4 : 1,
      }]}>
        <Text style={styles.textStyle}>{t("filter")}</Text>
        <DropDownPicker

          containerStyle={{ width: "70%" }}
          multiple={true}
          min={0}
          max={5}
          open={isOpen}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onClose={() => { setOpen(false) }}
        />
        <View style={{ height: 10 }}></View>
        <View style={{ flexDirection: "row" }}>
          <ApplyButton title={t("use")} onPress={applyFilter}></ApplyButton>
          <View style={{ width: "5%" }}></View>
          <CancelButton title={t("clear")} onPress={clearFilter}></CancelButton>
        </View>
      </View>
      <View style={{ height: 25 }}></View>
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

DropDownPicker.addTranslation("FI", {
  PLACEHOLDER: "Valitse suodatin",
  SEARCH_PLACEHOLDER: "Kirjoita jotain...",
  SELECTED_ITEMS_COUNT_TEXT: "{count} suodatinta valittu",
  NOTHING_TO_SHOW: "Ei näytettävää."
});

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

export default QueryScreen;