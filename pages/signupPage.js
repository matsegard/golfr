import { StyleSheet, View, Image, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Pressable } from "react-native";
import { Input, WarningOutlineIcon, FormControl } from "native-base";
import PrimaryButton from "../components/PrimaryButton.js";
import { useState } from "react";

function SignupPage({ navigation }) {
  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);

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
            />
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
            <FormControl isInvalid w="100%" maxW="300px">
              <Input
                variant="underlined"
                placeholder="Email"
                style={styles.editForm}
                onChange={(e) => handleEmailChange(e)}
              />
              {/* {error ? (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Ogiltig email
                </FormControl.ErrorMessage>
              ) : null} */}
            </FormControl>
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
              />
              <Pressable style={styles.eye} onPress={() => setShow(!show)}>
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
      </View>
      <PrimaryButton
        label="Registrera"
        btnWidth={{
          width: 182,
          right: 115,
          bottom: -640,
          position: "absolute",
        }}
        onPress={null}
      />
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
});

export default SignupPage;
