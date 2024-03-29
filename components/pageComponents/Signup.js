import { StyleSheet, Image, Text, Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Pressable } from "react-native";
import { Input, VStack, HStack, Alert, View, Divider } from "native-base";
import PrimaryButton from "../inputs/PrimaryButton.js";
import { useState } from "react";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { SignupValidationSchema } from "../schemas/SignupValidationSchema";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  reload,
} from "firebase/auth";

function Signup() {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();
  const [emailExist, setEmailExist] = useState(false);
  const [success, setSuccess] = useState(false);

  const CreateAccount = async ({ email, username, password }) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      username
    ).catch((errors) => {
      if (errors.code === "auth/email-already-in-use") {
        setSuccess(false);
        setEmailExist(true);
      }
    });
    if (auth !== false) {
      setSuccess(true);
      setTimeout(() => {
        navigation.navigate("Products");
      }, "500");
    }

    await updateProfile(user, {
      displayName: username,
    });

    await reload(user);
  };

  function alertDown() {
    setEmailExist(false);
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
      <View
        style={{
          width: Dimensions.get("window").width,
          justifyContent: "space-between",
          position: "absolute",
          paddingLeft: 30,
          top: 14,
        }}
      >
        <Pressable onPress={() => navigation.navigate("HelpPage")}>
          <FontAwesomeIcon
            style={{ marginLeft: 5 }}
            color="white"
            size={20}
            icon={faQuestion}
          />

          <Text style={{ fontWeight: "400", color: "white", paddingTop: "1%" }}>
            Hjälp
          </Text>
          <Divider
            style={{
              maxWidth: "9.4%",
            }}
            my="1"
            _light={{
              bg: "white",
            }}
          />
        </Pressable>
      </View>
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
                  Registrering lyckad
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      )}
      {emailExist && (
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
                <Alert.Icon mt="1" color="black" />
                <Text fontSize="md" color="coolGray.800">
                  Email finns redan
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      )}

      <Text style={styles.loginText}>Registrera dig</Text>
      <View style={styles.forms}>
        <Formik
          validateOnBlur={false}
          validationSchema={SignupValidationSchema}
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          onSubmit={(values) => CreateAccount(values)}
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
                      marginBottom: 4,
                    }}
                  >
                    Användarnamn
                  </Text>
                  <Input
                    variant="underlined"
                    placeholder="Användarnamn"
                    style={styles.editForm}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    onChange={alertDown}
                  />
                  {errors.username && (
                    <Text style={{ fontSize: 12, color: "red", marginTop: 5 }}>
                      {errors.username}
                    </Text>
                  )}
                </View>
                <View style={styles.form}>
                  <Text
                    style={{
                      fontFamily: "MontserratSemiBold",
                      color: "#B6B6B6",
                      marginBottom: 4,
                    }}
                  >
                    Email
                  </Text>
                  <Input
                    variant="underlined"
                    placeholder="Email"
                    style={styles.editForm}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    onChange={alertDown}
                  />
                  {errors.email && (
                    <Text style={{ fontSize: 12, color: "red", marginTop: 5 }}>
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View style={styles.form}>
                  <Text
                    style={{
                      fontFamily: "MontserratSemiBold",
                      color: "#B6B6B6",
                      marginBottom: 4,
                    }}
                  >
                    Lösenord
                  </Text>
                  <View style={styles.passwordCont}>
                    <Input
                      style={styles.editForm}
                      variant="underlined"
                      type={show ? "text" : "password"}
                      placeholder="Lösenord"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      onChange={alertDown}
                    />
                    {errors.password && (
                      <Text
                        style={{ fontSize: 12, color: "red", marginTop: 5 }}
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
                          style={[
                            !isValid ? styles.iconinvalid : styles.iconvalid,
                          ]}
                        />
                      ) : (
                        <FontAwesomeIcon
                          size={23}
                          icon={faEyeSlash}
                          mr="2"
                          color="#B6B6B6"
                          style={[
                            !isValid ? styles.iconinvalid : styles.iconvalid,
                          ]}
                        />
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
              <PrimaryButton
                label="Registrera"
                btnWidth={{
                  width: 182,
                  right: 50,
                  bottom: -58,
                  position: "absolute",
                }}
                disabled={
                  !isValid ||
                  (values.username === "" &&
                    values.email === "" &&
                    values.password === "")
                }
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
      <Text style={styles.login} onPress={() => navigation.navigate("Login")}>
        Eller logga in
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
    top: -55,
  },
  login: {
    color: "#B6B6B6",
    fontFamily: "MontserratSemiBold",
    letterSpacing: ".3%",
    textDecorationLine: "underline",
    position: "absolute",
    top: 500,
    marginTop: 10,
  },
  loginText: {
    fontSize: 20,
    fontFamily: "MontserratBold",
    bottom: 280,
    color: "white",
  },
  forms: {
    position: "absolute",
    top: 200,
  },
  form: {
    marginTop: 5,
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

export default Signup;
