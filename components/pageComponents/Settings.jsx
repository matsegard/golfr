import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import { Modal, Button, Input } from "native-base";
import PrimaryButton from "../inputs/PrimaryButton";
import {
  getAuth,
  updateProfile,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import { UsernameValidationSchema } from "../schemas/UsernameValidationSchema";
import { PasswordValidationSchema } from "../schemas/PasswordValidationSchema";
import { useNavigation } from "@react-navigation/native";

function Settings() {
  const auth = getAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [username, setUsername] = useState(auth.currentUser.displayName);
  const [email, setEmail] = useState(auth.currentUser.email);
  const [editUsernameMode, setEditUsernameMode] = useState(false);
  const [editPasswordMode, setEditPasswordMode] = useState(false);
  const [capturePassword, setCapturePassword] = useState(false);
  const [capturePasswordForPassword, setCapturePasswordForPassword] =
    useState(false);

  const { user } = route.params;

  //updates username
  function updateUsername({ username }) {
    setEditUsernameMode(!editUsernameMode);
    updateProfile(user, {
      displayName: username,
    })
      .then(() => {
        setUsername(user.displayName);
        navigation.navigate("Products"); //temporary solution to username not updating on profile
        Alert.alert("Profil uppdaterad");
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  // function updatePasswordAuth() {
  //   setCapturePasswordForPassword(true);
  // }

  function deleteAccount() {
    setCapturePassword(true);
  }

  async function updateUsersPassword({ password }) {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    setCapturePasswordForPassword(false);
    setEditPasswordMode(true);
  }

  function updateThePassword({ newPassword }) {
    updatePassword(user, newPassword)
      .then(() => {
        navigation.navigate("Products"); //temporary solution to username not updating on profile
        Alert.alert("Profil uppdaterad");
        console.log("PASSWORD CHANGE SUCCESS?");
      })
      .catch((error) => {
        console.log("PASSWORD CHANGE FAIL", error);
      });
  }

  async function deleteCurrentUser({ password }) {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    deleteUser(user)
      .then(() => {
        Alert.alert("User was deleted");
        navigation.navigate("Products");
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  return (
    <View style={styles.container}>
      {capturePassword && (
        <Formik
          validateOnBlur={false}
          initialValues={{
            password: "",
          }}
          onSubmit={(values) => {
            deleteCurrentUser(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Modal
                bottom="20"
                isOpen={capturePassword}
                onClose={() => setCapturePassword(false)}
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
              >
                <Modal.Content>
                  <Modal.CloseButton />
                  <Modal.Header>
                    Autentisera ditt lösenord för att fortsätta:
                  </Modal.Header>
                  <Modal.Body>
                    <Input
                      ref={initialRef}
                      variant="unstyled"
                      type="password"
                      placeholder="Lösenord"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button
                        variant="ghost"
                        colorScheme="blueGray"
                        onPress={() => {
                          setCapturePassword(false);
                        }}
                      >
                        Avsluta
                      </Button>
                      <PrimaryButton
                        label="Radera konto"
                        btnWidth={{
                          width: 120,
                          backgroundColor: "#d63a3a",
                        }}
                        onPress={handleSubmit}
                      />
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </>
          )}
        </Formik>
      )}

      {capturePasswordForPassword && (
        <Formik
          validateOnBlur={false}
          initialValues={{
            password: "",
          }}
          onSubmit={(values) => {
            updateUsersPassword(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Modal
                bottom="20"
                isOpen={capturePasswordForPassword}
                onClose={() => setCapturePasswordForPassword(false)}
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
              >
                <Modal.Content>
                  <Modal.CloseButton />
                  <Modal.Header>
                    Autentisera ditt lösenord för att fortsätta:
                  </Modal.Header>
                  <Modal.Body>
                    <Input
                      ref={initialRef}
                      variant="unstyled"
                      type="password"
                      placeholder="Lösenord"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button
                        variant="ghost"
                        colorScheme="blueGray"
                        onPress={() => {
                          setCapturePasswordForPassword(false);
                        }}
                      >
                        Avsluta
                      </Button>
                      <PrimaryButton
                        label="Updatera lösenord"
                        btnWidth={{
                          width: 162,
                        }}
                        onPress={handleSubmit}
                      />
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </>
          )}
        </Formik>
      )}

      <Text style={styles.headerText}>Användarinställningar</Text>
      <Formik
        validationSchema={UsernameValidationSchema}
        initialValues={{
          username: user.displayName,
        }}
        onSubmit={(values, actions) => {
          updateUsername(values);

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
          </>
        )}
      </Formik>
      <Formik
        // validationSchema={PasswordValidationSchema}
        initialValues={{
          newPassword: "",
        }}
        onSubmit={(values, actions) => {
          updateThePassword(values);
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
            {!editPasswordMode ? (
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
                  <Text>Ditt lösenord</Text>
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
                  <Pressable
                    onPress={() =>
                      setCapturePasswordForPassword(!capturePasswordForPassword)
                    }
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
                  Lösenord
                </Text>
                <Input
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  value={values.newPassword}
                  autoCapitalize="none"
                  placeholder="Lösenord"
                />
                {errors.password && (
                  <Text
                    style={{
                      position: "absolute",
                      fontSize: 12,
                      color: "red",
                      top: 62,
                    }}
                  >
                    {errors.password}
                  </Text>
                )}
                <PrimaryButton
                  label="Spara Lösenord"
                  btnWidth={{
                    marginTop: 20,
                    width: 190,
                  }}
                  disabled={values.newPassword === "" || !isValid}
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
        <Pressable onPress={deleteAccount}>
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
    marginBottom: 90,
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
