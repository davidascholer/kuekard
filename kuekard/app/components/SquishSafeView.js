/*
- Minimun screen height is set to that of an iphone 7.
- If screen renders smaller, the user will be able to scroll.
*/
import React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';

export default function SquishSafeView({ children, style }) {

  const height = Dimensions.get('window').height;
  const minHeight = 667;

  return (
    <>
      {height >= minHeight &&
        <>
          {children}
        </>
      }
      {height < minHeight &&
        <ScrollView style={[styles.scrollView, style]} >
          {children}
        </ScrollView>
      }
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%'
  }
});