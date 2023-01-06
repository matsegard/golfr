import { StyleSheet, View, Image, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Pressable } from "react-native";
import { Input } from "native-base";
import { useState } from "react";
import PrimaryButton from "../inputs/PrimaryButton";
import { useRoute } from "@react-navigation/native";
import {
  signOut,
  getAuth,
  currentUser
} from "firebase/auth";
import React, { useEffect } from "react";


function Profile() {
  const [editMode, setEditMode] = useState(false);
  const auth = getAuth();
  const route = useRoute();
  const {
    user
  } = route.params;
// funkar om man är inloggad blir error om man ej är 
if(auth ==! true) {
  console.log('inte inloggad')
} else {
   user
}
  
  
console.log(auth)
  // SIGN OUT FUNCTIONALITY
  function testSignOut() {
    signOut(auth)
      .then(() => {
        console.log("SIGNED OUT");
        console.log(auth.currentUser);
      })
      .catch((error) => {
        console.log("ERROR");
      });
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
      <View style={styles.bubbleText}>
        <FontAwesomeIcon color="white" size={22} icon={faQuestion} />
        <Text style={styles.logout} onPress={() => testSignOut()} >Logout</Text>
      </View>
      <View style={styles.profilePic}></View>
      <Pressable style={styles.addProfilePic}>
        <View>
          <FontAwesomeIcon color="white" size={15} icon={faPlus} />
        </View>
      </Pressable>
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
              <Text>{user.password}</Text>
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
                variant="underlined"
                placeholder="Underlined"
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
              <Input
                variant="underlined"
                placeholder="Underlined"
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
                Password
              </Text>
              <Input
                variant="underlined"
                placeholder="Underlined"
                style={styles.editForm}
              />
            </View>
          </View>
        )}
      </View>
      {editMode ? (
        <PrimaryButton
          label="Spara"
          btnWidth={{
            width: 152,
            position: "absolute",
            right: 50,
            bottom: -670,
          }}
          onPress={() => setEditMode(!editMode)}
        />
      ) : (
        <PrimaryButton
          label="Redigera profil"
          btnWidth={{
            width: 152,
            position: "absolute",
            right: 50,
            bottom: -670,
          }}
          onPress={() => setEditMode(!editMode)}
        />
      )}
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
  bubbleText: {
    width: "88%",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
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
    top: 280,
  },
  form: {
    marginTop: 30,
  },
  editFormContainer: {
    width: 280,
  },
});

export default Profile;
