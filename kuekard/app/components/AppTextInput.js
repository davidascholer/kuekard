import React, { useContext }  from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppContext from "../context/context";

function AppTextInput({ icon, onFocus, style, ...otherProps }) {

  const appContext = useContext(AppContext);

  return (
    <View style={[styles.container,{backgroundColor:appContext.colorTheme.light},style ]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={appContext.colorTheme.medDark}
          style={styles.icon}
        />
      )}
      <TextInput
        onFocus={onFocus}
        placeholderTextColor={appContext.colorTheme.medium}
        style={[{width:'100%',textTransform:"lowercase",color:appContext.colorTheme.medDark}]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent:"flex-start",
    marginVertical: 10,
    padding: 15,
    width:"100%",
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
