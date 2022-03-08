import { createStackNavigator, CardStyleInterpolators } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import MainScreen from "../screens/MainScreen";
import QueryScreen from "../screens/QueryScreen";
import ExtraInfoScreen from "../screens/ExtraInfoScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const MainNavigator = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: {
        headerTitle: "",
        backgroundColor: "#F0F0F0",
        headerShown: false
      },
    },
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        backgroundColor: "#F0F0F0",
        headerTitle: "",
      },
    },
    Query: {
      screen: QueryScreen,
      navigationOptions: {
        backgroundColor: "#F0F0F0",
        headerTitle: "",
      },
    },
    Extra: {
      screen: ExtraInfoScreen,
      navigationOptions: {
        backgroundColor: "#F0F0F0",
        headerTitle: "",
      },
    }
  },
  {
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerStyle: {
        backgroundColor: "#F0F0F0",
      },
    },
  }
);


export default createAppContainer(MainNavigator);