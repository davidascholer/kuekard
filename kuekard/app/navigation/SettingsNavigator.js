import React, { useContext }  from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ColorThemeScreen from '../screens/settings/ColorThemeScreen';
import CreateColorThemeScreen from '../screens/settings/CreateColorThemeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import CardFaceSettingsScreen from "../screens/settings/CardFaceSettingsScreen";
import AppContext from "../context/context";
import ChooseLanguageScreen from "../screens/settings/ChooseLanguageScreen";

const Stack = createNativeStackNavigator();

function SettingsNavigator({route}) {
  const appContext = useContext(AppContext);

  return (
    <Stack.Navigator 
    screenOptions={{
      headerStyle: {
        backgroundColor: appContext.colorTheme.medium,
      },
      headerLeft: ()=><></>,
      headerTransparent: true,
      headerTintColor: appContext.colorTheme.medDark,
      title: "Settings",
    }}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="ColorThemeScreen" component={ColorThemeScreen} />
      <Stack.Screen name="CreateColorThemeScreen" component={CreateColorThemeScreen} />
      <Stack.Screen name="CardFaceSettingsScreen" component={CardFaceSettingsScreen} />
      <Stack.Screen name="ChooseLanguageScreen" component={ChooseLanguageScreen} />

    </Stack.Navigator>
  );
}

export default SettingsNavigator;