import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import jwtDecode from 'jwt-decode';
//Component imports
import ConnectionStatus from '../components/ConnectionStatus';
import FormSection from '../components/FormSection';
import Logo from '../components/Logo';
import ScreenContainer from '../components/ScreenContainer';
import AppContext from "../context/context";
import MediaButtonContainer from "../components/MediaButtonContainer";
import KeyboardHidden from "../components/KeyboardHidden";
import SquishSafeView from "../components/SquishSafeView";
//Data imports
import accountsApi from '../api/accountsApi';


export default function LoginScreen() {
  //Global settings
  const appContext = useContext(AppContext);
  //Local vars (stateful)
  const [signInScreen, setSignInScreen] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //Local vars (stateless)
  const getScreenText = screen => screen ? screenTextOptions[0] : screenTextOptions[1];
  const screenTextOptions = ["Sign In", "Create Account"];
  const errMes = "Please check your wireless connection and try again.";

  useEffect(() => {
    console.log('user: ' + appContext.user)
  })

  //Lookup account and set a token if credentials check out
  const handleSignIn = async (email, password) => {
    const result = await accountsApi.getUser(email, password);

    if (!result.ok) {
      setShowForgotPassword(true);
      let errorMes = "Invalid email or password.";
      if (result.data !== errorMes)
        errorMes = errMes;
      setErrorMessage(errorMes);
      return setLoginFailed(true);
    }

    setUserContent(result.data);

  }

  const handleCreateAccount = async (name, email, password) => {
    const result = await accountsApi.postNewAccount(name, email, password);

    if (!result.ok) {
      setShowForgotPassword(true);
      let errorMes = "User already registered.";
      if (result.data !== errorMes)
        errorMes = errMes;
      setErrorMessage(errorMes);
      return setLoginFailed(true);
    }

    setUserContent(result.data);

  }

  const handleMediaLogin = async (name, id, type) => {
    const result = await accountsApi.getSetMediaUser(name, id, type);

    if (!result.ok) {
      setErrorMessage(errMes);
      console.log(result);
      return setLoginFailed(true);
    }

    setUserContent(result.data);

  }

  const setUserContent = data => {
    //Set object with structure: {"name":"","data":{},"token":""}
    setLoginFailed(false);
    //Save decoded token from server to asyncstorage

    //Save the data from server to asyncstorage
    appContext.saveData(data["data"]);
    const user = jwtDecode(data["token"]);
    appContext.saveUser(user["_id"]);
  }

  const forgotPassword = async email => {
    const result = await accountsApi.confirmUserEmail(email);

    let resultMsg = "email doesn't exist";
    if (result.ok) {
      //send email here
      resultMsg = "email exists";
    }

    alert("an email with a link to rest your password has been sent if an account at " + email + " exists" + "\n" + resultMsg + '\nsend email w link to reset password link w email in params\nset new encrypted pw where email = email in params');
  }

  const setEmptyUserContent = () => {
    appContext.saveGenericData();
    appContext.saveGenericUser();
  }

  return (
    <ScreenContainer styleSheet={styles.container}>
      <SquishSafeView>
        <StatusBar
          hidden={false} />
        <ConnectionStatus styleSheet={styles.error}></ConnectionStatus>
        <View style={[styles.viewContainer, { flex: 1 }]}>
          <Logo styleSheet={styles.logo} />
        </View>
        <View style={[styles.viewContainer, { flex: 3 }]}>
          <FormSection
            buttonStyles={styles.button}
            buttonTextStyles={styles.buttonText}
            signInScreen={signInScreen}
            screenText={getScreenText(signInScreen)}
            signInHandler={handleSignIn}
            createAccountHandler={handleCreateAccount}
            errorMessage={errorMessage}
            errorMessageVisible={loginFailed}
          >
            {signInScreen &&
              <TouchableOpacity style={styles.button} onPress={() => setSignInScreen(false)}>
                <Text style={styles.buttonText}>{screenTextOptions[1]}</Text>
              </TouchableOpacity>
            }
            {!signInScreen &&
              <TouchableOpacity title={screenTextOptions[0]} style={styles.button} onPress={() => setSignInScreen(true)}>
                <Text style={styles.buttonText}>{screenTextOptions[0]}</Text>
              </TouchableOpacity>
            }
            {showForgotPassword && signInScreen && <TouchableOpacity style={styles.button} onPress={forgotPassword}>
              <Text style={[styles.buttonText, { color: appContext.colorTheme.light }]}>Forgot Password</Text>
            </TouchableOpacity>}
          </FormSection>
        </View>
        <KeyboardHidden>
          <View style={[styles.viewContainer, { flex: 2, }]}>
            <MediaButtonContainer handleMediaLogin={handleMediaLogin} />
          </View>
        </KeyboardHidden>
        <TouchableOpacity title={screenTextOptions[0]} style={styles.button} onPress={() => setEmptyUserContent()}>
          <Text style={styles.buttonText}>continue without signing in</Text>
        </TouchableOpacity>
      </SquishSafeView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: "500",
    fontSize: 20,

  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  error: {
    color: 'red',
    textAlign: 'center'
  },
  logo: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
  },
  viewContainer: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
    width: '100%',
  }
});
