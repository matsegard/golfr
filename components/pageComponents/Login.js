import { StyleSheet, View, Image, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import { Pressable } from "react-native";
import { Input, Alert, VStack, HStack } from "native-base";
import PrimaryButton from "../inputs/PrimaryButton.js";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LoginValidationSchema } from "../schemas/LoginValidationSchema";
import React from "react";

function Login() {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();
  const [errorCode, setErrorCode] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  function signIn({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccess(true);
        setTimeout(() => {
          navigation.navigate("Products", {
            user: auth.currentUser,
          });
        }, "500");
      })
      .catch((errors) => {
        if (errors.code === "auth/user-not-found") {
          setErrorCode(true);
          console.log(" adressen existerar inte");
        }
        if (errors.code === "auth/wrong-password") {
          setErrorPassword(true);
          console.log("Lösenordet existerar inte");
        }
      });
  }

  function errorMessage() {
    setErrorCode(false);
    setErrorPassword(false);
  }

  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.greenBubble,
          {
            transform: [{ rotate: "180deg" }],
          },
        ]}
        source={require("../../assets/Ellipse.png")}
      />
      {success && (
        <Alert
          w="50%"
          borderBottomRadius="2xl"
          position="absolute"
          top="0"
          status="success"
        >
          <VStack space={2} flexShrink={1} w="100%" alignItems="center">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="0" color="black" />
                <Text fontSize="md" color="coolGray.800">
                  Inloggning lyckad
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      )}
      {errorCode && (
        <Alert
          w="50%"
          borderBottomRadius="2xl"
          position="absolute"
          top="0"
          backgroundColor="danger.400"
        >
          <VStack space={2} flexShrink={1} w="100%" alignItems="center">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="0" color="black" />
                <Text fontSize="md" color="coolGray.800">
                  Fel email
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      )}

      {errorPassword && (
        <Alert
          w="50%"
          borderBottomRadius="2xl"
          position="absolute"
          top="0"
          backgroundColor="danger.400"
        >
          <VStack space={2} flexShrink={1} w="100%" alignItems="center">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="0" color="black" />
                <Text fontSize="md" color="coolGray.800">
                  Fel lösenord
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      )}

      <Text style={styles.loginText}>Logga in</Text>

      <View style={styles.forms}>
        <Formik
          validateOnBlur={false}
          validationSchema={LoginValidationSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            signIn(values);
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
              <View style={styles.editFormContainer}>
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
                  <Input
                    onChange={errorMessage}
                    variant="underlined"
                    placeholder="Email"
                    style={styles.editForm}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {errors.email && (
                    <Text
                      style={{
                        position: "absolute",
                        fontSize: 12,
                        color: "red",
                        top: 62,
                      }}
                    >
                      {errors.email}
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
                    Lösenord
                  </Text>
                  <View style={styles.passwordCont}>
                    <Input
                      onChange={errorMessage}
                      style={styles.editForm}
                      variant="underlined"
                      type={show ? "text" : "password"}
                      placeholder="Lösenord"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    {errors.password && (
                      <Text
                        style={{
                          position: "absolute",
                          fontSize: 12,
                          color: "red",
                          top: 35,
                          width: 130,
                        }}
                      >
                        {errors.password}
                      </Text>
                    )}
                    <Pressable
                      style={styles.eye}
                      onPress={() => setShow(!show)}
                    >
                      {show ? (
                        <FontAwesomeIcon
                          size={23}
                          icon={faEye}
                          mr="2"
                          color="#B6B6B6"
                        />
                      ) : (
                        <FontAwesomeIcon
                          size={23}
                          icon={faEyeSlash}
                          mr="2"
                          color="#B6B6B6"
                        />
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
              <Pressable>
                <Text style={styles.forgotPassword}>Glömt ditt lösenord?</Text>
              </Pressable>
              <PrimaryButton
                label="Logga in"
                disabled={
                  !isValid || (values.email === "" && values.password === "")
                }
                btnWidth={{
                  width: 182,
                  right: 50,
                  bottom: -70,
                  position: "absolute",
                }}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>

      <Text style={styles.signup} onPress={() => navigation.navigate("Signup")}>
        Eller registrera dig
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  greenBubble: {
    width: "100%",
    height: 224,
    position: "absolute",
    top: -70,
  },
  signup: {
    color: "#B6B6B6",
    fontFamily: "MontserratSemiBold",
    letterSpacing: ".3%",
    textDecorationLine: "underline",
    position: "absolute",
    top: 500,
    marginTop: 20,
  },
  loginText: {
    fontSize: 20,
    fontFamily: "MontserratBold",
    bottom: 280,
    color: "white",
  },
  forms: {
    position: "absolute",
    top: 220,
  },
  form: {
    marginTop: 36,
  },
  editFormContainer: {
    width: 280,
  },
  passwordCont: {
    position: "relative",
  },
  eye: {
    position: "absolute",
    right: 5,
    bottom: 10,
  },
  forgotPassword: {
    fontSize: 12,
    fontFamily: "MontserratLight",
    color: "#9E9E9E",
    paddingTop: 15,
    right: -165,
  },
  iconinvalid: {
    bottom: 20,
  },
});

export default Login;
