import React, { useContext } from "react";
import { Text } from "react-native";

import AppContext from "../context/context";

function AppText({ children, style }) {

  const appContext = useContext(AppContext);

  return <Text style={[{width:"100%",textTransform:"lowercase",color:appContext.colorTheme.medium} , style]}>{children}</Text>;
}

export default AppText;
