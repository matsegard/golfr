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
  const [editUsernameMode, setEditUsernameMode] = useState(false);
  const { user } = route.params;

  //updates username
  function updateUser({ username }) {
    setEditUsernameMode(!editUsernameMode);
    updateProfile(user, {
      displayName: username,
    })
      .then(() => {
        Alert.alert("Profil uppdaterad");
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Användarinställningar</Text>
      <Formik
        validationSchema={UsernameValidationSchema}
        initialValues={{
          username: user.displayName,
          //   password: "",
        }}
        onSubmit={(values, actions) => {
          updateUser(values);
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
            {!editUsernameMode ? (
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
                  <Pressable
                    onPress={() => setEditUsernameMode(!editUsernameMode)}
                  >
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
            ) : (
              <View
                style={{
                  width: Dimensions.get("window").width - 100,
                  marginLeft: 50,
                  marginBottom: 35,
                }}
              >
                <Text
                  style={{
                    fontFamily: "MontserratBold",
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Användarnamn
                </Text>
                <Input
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  placeholder={user.displayName}
                ></Input>
                {errors.username && (
                  <Text style={{ fontSize: 12, color: "red", marginTop: 5 }}>
                    {errors.username}
                  </Text>
                )}
                <PrimaryButton
                  label="Spara användarnamn"
                  btnWidth={{
                    marginTop: 20,
                    width: 190,
                  }}
                  disabled={values.username === ""}
                  onPress={handleSubmit}
                />
                <View
                  style={{
                    width: Dimensions.get("window").width - 100,
                    height: 1,
                    backgroundColor: "#e8e8e8",
                    marginTop: 35,
                  }}
                ></View>
              </View>
            )}

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
