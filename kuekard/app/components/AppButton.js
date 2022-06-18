import React, { useContext }  from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import AppContext from "../context/context";

function AppButton({ buttonStyles, buttonTextStyles, title, onPress }) {

  const appContext = useContext(AppContext);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: appContext.colorTheme.medDark }, buttonStyles]}
      onPress={onPress}
    >
      <Text style={[styles.text, buttonTextStyles]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
