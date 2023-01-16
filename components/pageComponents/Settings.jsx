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
            <View style={styles.forms}>
              {!editMode ? (
                <View>
                  <View style={styles.form}>
                    <Text
                      style={{
                        fontFamily: "MontserratSemiBold",
                        color: "#B6B6B6",
                        marginBottom: 8,
                      }}
                    >
                      Username
                    </Text>
                    <Text>{username}</Text>
                    <View
                      style={{
                        width: 280,
                        height: 1,
                        backgroundColor: "#D9D9D9",
                        marginTop: 18,
                      }}
                    ></View>
                  </View>
                  <View style={styles.form}>
                    <Text
                      style={{
                        fontFamily: "MontserratSemiBold",
                        color: "#B6B6B6",
                        marginBottom: 8,
                      }}
                    >
                      Email
                    </Text>
                    <Text>{user.email}</Text>
                    <View
                      style={{
                        width: 280,
                        height: 1,
                        backgroundColor: "#D9D9D9",
                        marginTop: 18,
                      }}
                    ></View>
                  </View>
                </View>
              ) : (
                <View style={styles.editFormContainer}>
                  <View style={styles.form}>
                    <Text
                      style={{
                        fontFamily: "MontserratSemiBold",
                        color: "#B6B6B6",
                        marginBottom: 8,
                      }}
                    >
                      Username
                    </Text>
                    <Input
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                      variant="underlined"
                      placeholder={user.displayName}
                      style={styles.editForm}
                    />
                    {errors.username && (
                      <Text
                        style={{ fontSize: 12, color: "red", marginTop: 5 }}
                      >
                        {errors.username}
                      </Text>
                    )}
                  </View>
                  <View style={styles.form}>
                    <Text
                      style={{
                        fontFamily: "MontserratSemiBold",
                        color: "#B6B6B6",
                        marginBottom: 8,
                      }}
                    >
                      Email
                    </Text>
                    <Text>{user.email}</Text>
                    <View
                      style={{
                        width: 280,
                        height: 1,
                        backgroundColor: "#D9D9D9",
                        marginTop: 18,
                      }}
                    ></View>
                  </View>
                  <View style={styles.form}>
                    <Text
                      style={{
                        fontFamily: "MontserratSemiBold",
                        color: "#B6B6B6",
                        marginBottom: 8,
                      }}
                    >
                      Password
                    </Text>
                    <Input
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      variant="underlined"
                      placeholder="Lösenord"
                      style={styles.editForm}
                    />
                    {errors.password && (
                      <Text
                        style={{ fontSize: 12, color: "red", marginTop: 5 }}
                      >
                        {errors.password}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </View>
            {editMode ? (
              <PrimaryButton
                label="Spara"
                btnWidth={{
                  width: 150,
                  position: "absolute",
                  right: 40,
                  bottom: 150,
                }}
                disabled={(values.username === "", values.password === "")}
                onPress={handleSubmit}
              />
            ) : (
              <PrimaryButton
                label="Redigera profil"
                btnWidth={{
                  width: 150,
                  position: "absolute",
                  right: 50,
                  bottom: 150,
                }}
                onPress={() => setEditMode(!editMode)}
              />
            )}
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
    alignSelf: "center",
    color: "black",
  },
  deleteAccount: {
    width: Dimensions.get("window").width - 100,
    marginLeft: 50,
    flex: 5,
  },
  forms: {
    width: Dimensions.get("window").width - 100,
    marginLeft: 50,
  },
});

export default Settings;
