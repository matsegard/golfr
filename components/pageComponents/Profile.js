import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Input } from "native-base";
import PrimaryButton from "../inputs/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { signOut, getAuth } from "firebase/auth";
import { Formik } from "formik";
import { LoginSignupValidationSchema } from "../schemas/LoginSignupValidationSchema";

function Profile() {
  const navigation = useNavigation();
  const [editMode, setEditMode] = useState(false);
  const auth = getAuth();
  const route = useRoute();
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
        console.log("SIGNED OUT");
        console.log(auth.currentUser);
        navigation.navigate("Products");
      })
      .catch((error) => {
        console.log("ERROR");
      });
  }

  async function updateUser({ username }) {
    const updateRef = doc(db, "products", id);
    updateDoc(updateRef, {
      title: title,
      category: category,
      description: description,
      price: price,
      location: location,
      clubs: clubs,
      difficulty: difficulty,
      gender: gender,
      hand: hand,
      shaft: shaft,
      image: newImage.uri,
    })
      .then((updateRef) => {
        console.log("Uppdaterad");
        Alert.alert("Annons uppdaterad");
        navigation.navigate("MyProducts");
        setUpdate(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={LoginSignupValidationSchema}
        initialValues={{
          username: user.displayName,
          // password: "",
        }}
        onSubmit={(values) => {
          updateUser(values);
          setEditMode(!editMode);
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
              <Pressable onPress={() => navigation.navigate("HelpPage")}>
                <FontAwesomeIcon color="white" size={22} icon={faQuestion} />
              </Pressable>
              <Text style={styles.logout} onPress={() => testSignOut()}>
                Logout
              </Text>
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
                      variant="underlined"
                      placeholder="Underlined"
                      style={styles.editForm}
                    />
                  </View>
                </View>
              )}
            </View>
            <PrimaryButton
              label="Mina annonser"
              btnWidth={{
                width: 150,
                position: "absolute",
                right: "50%",
                bottom: 150,
              }}
              onPress={() => navigation.navigate("MyProducts")}
            />
            {editMode ? (
              <PrimaryButton
                label="Spara"
                btnWidth={{
                  width: 150,
                  position: "absolute",
                  right: 40,
                  bottom: 150,
                }}
                disabled={values.username === ""}
                onPress={() => {
                  setEditMode(false), () => handleSubmit;
                }}
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
    top: -19,
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
