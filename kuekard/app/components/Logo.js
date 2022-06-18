import React from "react";
import { Image, StyleSheet, View } from 'react-native';

import logoImages from '../assets/images/logo';
import CardFlip from './animations/CardFlip';

export default function Logo({ navigation, styleSheet }) {
  return (
        <View style={[styleSheet,styles.logoContainer]}>
          <Image source={logoImages.k} style={styles.logoImage} />
          <Image source={logoImages.u} style={styles.logoImage} />
          <Image source={logoImages.e} style={styles.logoImage} />
          <CardFlip
            componentOne={<Image source={logoImages.kAlt} style={styles.logoImage} />}
            componentTwo={<Image source={logoImages.cardBack} style={styles.logoImage} />}
          />
          <Image source={logoImages.a} style={styles.logoImage} />
          <Image source={logoImages.r} style={styles.logoImage} />
          <Image source={logoImages.d} style={styles.logoImage} />
        </View>
  );
}

const styles = StyleSheet.create({

  logoContainer: {
    flexDirection: 'row',
  },
  logoImage: {
    margin: 1,
  },
});
