import React, {useEffect, useCallback, useState} from 'react';
import type {Node} from 'react';

import * as RNLocalize from "react-native-localize";
import * as i18n from "./utils/i18n";
import LocalizationContext from "./utils/LocalizationContext";

import MainNavigator from "./navigation/MainNavigator";

const App: () => Node = () => {

  const [locale, setLocale] = useState(i18n.DEFAULT_LANGUAGE);

  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );

  const handleLocalizationChange = useCallback(
    (newLocale) => {
      const newSetLocale = i18n.setI18nConfig(newLocale);
      setLocale(newSetLocale);
    },
    [locale]
  );

  useEffect(() => {
    handleLocalizationChange();

    RNLocalize.addEventListener("change", handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener("change", handleLocalizationChange);
    };
  }, []);

  return (
    <LocalizationContext.Provider value={localizationContext}>
    <MainNavigator screenProps={{
      localizationContext: localizationContext
    }}/>
    </LocalizationContext.Provider>
  );
  
  }
  export default App;
