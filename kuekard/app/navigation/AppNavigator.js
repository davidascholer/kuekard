import React, { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CardScreen from '../screens/CardScreen';
import LoginScreen from '../screens/LoginScreen';
import ListingsNavigator from './ListingsNavigator';
import SettingsNavigator from './SettingsNavigator';
import AppContext from "../context/context";
import ChooseLanguageScreen from "../screens/settings/ChooseLanguageScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {

  const appContext = useContext(AppContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!appContext.user ?
          <Stack.Screen name="LoginScreen" component={LoginScreen}
            options={{
              headerShown: false,
            }} />
          :
          <Stack.Screen name="ListingsNavigator" component={ListingsNavigator}
            options={{
              headerShown: false,
            }} />
        }
        <Stack.Screen name="CardScreen"
          component={CardScreen}
          options={{
            headerTransparent: true,
            headerTintColor: appContext.colorTheme.medDark,
            headerBackTitle: "Lists",
            title: "",

          }} />
        <Stack.Screen
          name="ChooseLanguageScreen"
          component={ChooseLanguageScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsNavigator"
          component={SettingsNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;