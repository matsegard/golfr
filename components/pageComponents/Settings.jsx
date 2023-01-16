import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import { Input } from "native-base";
import PrimaryButton from "../inputs/PrimaryButton";
import { getAuth, updateProfile, updatePassword } from "firebase/auth";
import { useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import { UsernameValidationSchema } from "../schemas/UsernameValidationSchema";
import { PasswordValidationSchema } from "../schemas/PasswordValidationSchema";

function Settings() {
  const auth = getAuth();
  const route = useRoute();
  const [username, setUsername] = useState(auth.currentUser.displayName);
  const [editMode, setEditMode] = useState(false);
  const { user } = route.params;

  //updates username
  function updateUser({ username }) {
    setEditMode(!editMode);
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        setUsername(auth.currentUser.displayName);
        Alert.alert("Profil uppdaterad");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Användarinställningar</Text>
      <Formik
        validationSchema={(UsernameValidationSchema, PasswordValidationSchema)}
        initialValues={{
          username: user.displayName,
          password: "",
        }}
        onSubmit={(values, actions) => {
          updateUser(values.username);
          actions.setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
        }) => (
          <>
            <View style={styles.email}>
              <Text
                style={{
                  fontFamily: "MontserratBold",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Användarnamn
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text>Ditt användarnamn är</Text>
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                    fontWeight: "bold",
                    marginBottom: 10,
                    marginLeft: 5,
                  }}
                >
                  {user.displayName}
                </Text>
                <Pressable onPress={() => console.log("USERNAME")}>
                  <Text
                    style={{
                      fontFamily: "MontserratSemiBold",
                      fontWeight: 500,
                      color: "#566fbf",
                      textDecorationLine: "underline",
                      marginLeft: 15,
                    }}
                  >
                    Ändra
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  width: Dimensions.get("window").width - 100,
                  height: 1,
                  backgroundColor: "#e8e8e8",
                  marginTop: 35,
                }}
              ></View>
            </View>

            <View style={styles.email}>
              <Text
                style={{
                  fontFamily: "MontserratBold",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Email adress
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text>Din email adress är</Text>
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                    fontWeight: "bold",
                    marginBottom: 10,
                    marginLeft: 5,
                  }}
                >
                  {user.email}
                </Text>
                <Pressable onPress={() => console.log("EMAIL")}>
                  <Text
                    style={{
                      fontFamily: "MontserratSemiBold",
                      fontWeight: 500,
                      color: "#566fbf",
                      textDecorationLine: "underline",
                      marginLeft: 15,
                    }}
                  >
                    Ändra
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  width: Dimensions.get("window").width - 100,
                  height: 1,
                  backgroundColor: "#e8e8e8",
                  marginTop: 35,
                }}
              ></View>
            </View>

            <View style={styles.email}>
              <Text
                style={{
                  fontFamily: "MontserratBold",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Lösenord
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text>Din email adress är</Text>
                <Text
                  style={{
                    fontFamily: "MontserratSemiBold",
                    fontWeight: "bold",
                    marginBottom: 10,
                    marginLeft: 5,
                  }}
                >
                  {user.email}
                </Text>
                <Pressable onPress={() => console.log("LÖSEN")}>
                  <Text
                    style={{
                      fontFamily: "MontserratSemiBold",
                      fontWeight: 500,
                      color: "#566fbf",
                      textDecorationLine: "underline",
                      marginLeft: 15,
                    }}
                  >
                    Ändra
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  width: Dimensions.get("window").width - 100,
                  height: 1,
                  backgroundColor: "#e8e8e8",
                  marginTop: 35,
                }}
              ></View>
            </View>
          </>
        )}
      </Formik>
      <View style={styles.deleteAccount}>
        <Text
          style={{
            fontFamily: "MontserratBold",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Radera konto
        </Text>
        <Text style={{ fontFamily: "MontserratRegular", marginBottom: 10 }}>
          Vill du radera ditt konto? Yada yada om du raderar konto blabla
        </Text>
        <Pressable onPress={() => console.log("PRESS")}>
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              fontWeight: 500,
              color: "red",
              textDecorationLine: "underline",
            }}
          >
            Jag vill radera mitt konto
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    width: Dimensions.get("window").width,
  },
  greenBubble: {
    width: Dimensions.get("window").width,
    height: 224,
    position: "absolute",
    top: -55,
  },
  headerText: {
    fontSize: "20",
    fontFamily: "MontserratSemiBold",
    marginTop: 50,
    marginBottom: 50,
    alignSelf: "center",
    color: "black",
  },
  deleteAccount: {
    width: Dimensions.get("window").width - 100,
    marginLeft: 50,
    flex: 3,
  },
  email: {
    width: Dimensions.get("window").width - 100,
    marginLeft: 50,
    flex: 1.5,
  },
  forms: {
    width: Dimensions.get("window").width - 100,
    marginLeft: 50,
  },
});

export default Settings;
