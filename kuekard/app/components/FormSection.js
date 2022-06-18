import React from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormSubmitButton as SubmitButton,
  ErrorMessage
} from "./forms";

const validationSchema = {
  email: Yup.string().required().min(1).email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
};

//Add the name input to the validation schema if creating an account
const appendedValidationSchema = {
  name: Yup.string().required().min(1).label("Name"),
  ...validationSchema
};

function FormSection({ buttonStyles, buttonTextStyles, children, createAccountHandler, errorMessage, errorMessageVisible, handleSignIn, signInHandler, signInScreen, screenText }) {

  return (
    <View style={styles.container}>
      <Form
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={(values) => signInScreen ? signInHandler(values.email, values.password) : createAccountHandler(values.name, values.email, values.password)}
        validationSchema={signInScreen ? Yup.object().shape(validationSchema) : Yup.object().shape(appendedValidationSchema)}
      >
        <ErrorMessage error={errorMessage} visible={errorMessageVisible} />
        {!signInScreen &&
          <FormField style={styles.field} maxLength={25} name="name" placeholder="Name" />
        }
        <FormField style={styles.field} maxLength={50} name="email" placeholder="Email" icon="account" />
        <FormField
          style={styles.field}
          maxLength={25}
          name="password"
          numberOfLines={1}
          placeholder="Password"
          type="password"
          secureTextEntry={true}
          icon="lock"
        />
        <SubmitButton type="submit" title={screenText} buttonStyles={buttonStyles} buttonTextStyles={buttonTextStyles} />
        <View style={styles.buttonContainer}>
        {children}
        </View>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
  field: {
    width:'100%'
  }
});
export default FormSection;
