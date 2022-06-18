import React, { useContext }  from "react";

import AppText from "../AppText";
import AppContext from "../../context/context";

function ErrorMessage({ error, visible }) {
  const appContext = useContext(AppContext);

  if (!visible || !error) return null;

  return <AppText style={{ color: appContext.colorTheme.dark }}>{error}</AppText>;
}

export default ErrorMessage;
