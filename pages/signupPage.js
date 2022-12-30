import { StyleSheet, View, Image, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Pressable } from "react-native";
import { Input, Button } from "native-base";
import PrimaryButton from "../components/PrimaryButton.js";
import { useState } from "react";
import { Formik } from "formik";
import { LoginSignupValidationSchema } from "../components/LoginSignupValidationSchema";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function SignupPage({ navigation }) {
  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const auth = getAuth();

  function CreateAccount({ email, username, password }) {
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      setDoc(doc(db, `users/${auth.currentUser?.uid}`), {
        username: username,
        email: email,
      });
    });
    // .then(() =>
    //   updateProfile(auth.currentUser, {
    //     username: username,
    //   })
    // )
    // .catch((error) => {});
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
        source={require("../assets/Ellipse.png")}
      />
      <Text style={styles.loginText}>Registrera dig</Text>
      <View style={styles.forms}>
        <Formik
          validateOnBlur={false}
          validationSchema={LoginSignupValidationSchema}
          initialValues={{
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
                      marginBottom: 8,
                    }}
                  >
                    Username
                  </Text>
                  <Input
                    variant="underlined"
                    placeholder="Username"
                    style={styles.editForm}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
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
                      marginBottom: 8,
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
                      marginBottom: 8,
                    }}
                  >
                    Password
                  </Text>
                  <View style={styles.passwordCont}>
                    <Input
                      style={styles.editForm}
                      variant="underlined"
                      type={show ? "text" : "password"}
                      placeholder="Password"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
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
                  bottom: -90,
                  position: "absolute",
                }}
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
    backgroundColor: "FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  greenBubble: {
    width: "100%",
    height: 224,
    position: "absolute",
    top: -19,
  },
  login: {
    color: "#B6B6B6",
    fontFamily: "MontserratSemiBold",
    letterSpacing: ".3%",
    textDecorationLine: "underline",
    position: "absolute",
    top: 720,
  },
  loginText: {
    fontSize: 20,
    fontFamily: "MontserratBold",
    top: 240,
  },
  forms: {
    position: "absolute",
    top: 290,
  },
  form: {
    marginTop: 30,
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

export default SignupPage;
