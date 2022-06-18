/*
Sets a view that isn't obstructed by the notch on some phones.
- Minimun screen height is set to that of an iphone 7.
- If screen renders smaller, the user will be able to scroll.
*/
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AppContext from '../context/context';

export default function ScreenContainer({ children, styleSheet }) {

  const appContext = useContext(AppContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: appContext.colorTheme.medium }, styleSheet]}>
    {children}
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});