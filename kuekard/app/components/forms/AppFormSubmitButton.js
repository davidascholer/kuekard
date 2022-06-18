import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";

function AppFormSubmitButton({ buttonStyles, buttonTextStyles, type, title }) {
  const { handleSubmit } = useFormikContext();

  return (
  <TouchableOpacity type={type} style={buttonStyles} onPress={handleSubmit}>
    <Text style={buttonTextStyles}>{title}</Text>
    </TouchableOpacity>
    )
}

export default AppFormSubmitButton;
