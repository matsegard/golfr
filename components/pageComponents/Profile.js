import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../inputs/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { signOut, getAuth } from "firebase/auth";
import { Input, Alert, VStack, HStack } from "native-base";

function Profile() {
  const navigation = useNavigation();
  const auth = getAuth();
  const route = useRoute();
  // const [username, setUsername] = useState(auth.currentUser.displayName);
  const [success, setSuccess] = useState(false);
  const [logOutFail, setLogOutFail] = useState(false);
  const { user } = route.params;

  // funkar om man är inloggad blir error om man ej är
  if (auth == !true) {
    console.log("inte inloggad");
  } else {
    user;
  }

  // SIGN OUT FUNCTIONALITY
  function testSignOut() {
    signOut(auth)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          navigation.navigate("Login");
        }, "500");
      })
      .catch((error) => {
        setLogOutFail(true);
      });
  }

  //updates password
  // function updateUsersPassword({ password }) {
  //   updatePassword(auth.currentUser, { password: password })
  //     .then(() => {
  //       console.log(auth.currentUser);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

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
      <View style={styles.bubbleText}>
        {/* <Pressable onPress={() => navigation.navigate("HelpPage")}>
                <FontAwesomeIcon color="white" size={22} icon={faQuestion} />
              </Pressable> */}
        <Pressable
          onPress={() =>
            navigation.navigate("Settings", {
              user: auth.currentUser,
            })
          }
        >
          <FontAwesomeIcon color="white" size={24} icon={faGear} />
        </Pressable>
        <Text style={styles.logout} onPress={() => testSignOut()}>
          Logga ut
        </Text>
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
                  <Alert.Icon mt="1" color="black" />
                  <Text fontSize="md" color="coolGray.800">
                    Utloggning lyckad
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Alert>
        )}
        {logOutFail && (
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
                    Utloggning misslyckad
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Alert>
        )}
      </View>
      <View style={styles.profilePic}></View>
      <Pressable style={styles.addProfilePic}>
        <View>
          <FontAwesomeIcon color="white" size={15} icon={faPlus} />
        </View>
      </Pressable>
      <View style={styles.forms}>
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
            <Text>{user.displayName}</Text>
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
      </View>
      <PrimaryButton
        label="Mina annonser"
        btnWidth={{
          width: 150,
          position: "absolute",
          right: "15%",
          bottom: 150,
        }}
        onPress={() => navigation.navigate("MyProducts")}
      />
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
  bubbleText: {
    width: "88%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 20,
  },
  logout: {
    color: "white",
    fontFamily: "MontserratSemiBold",
    letterSpacing: ".3%",
    textDecorationLine: "underline",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: "75%",
    backgroundColor: "#B6B6B6",
    position: "absolute",
    top: 110,
  },
  addProfilePic: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#B0D182",
    position: "absolute",
    top: 230,
    right: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  forms: {
    position: "absolute",
    top: 330,
  },
  form: {
    marginTop: 30,
  },
  editFormContainer: {
    width: 280,
  },
});

export default Profile;
