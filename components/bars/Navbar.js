import { Pressable, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const [selected, setSelected] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const navigation = useNavigation();
  const auth = getAuth();
  const route = useRoute();
  const currentUser = auth.currentUser;
  const user = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });

    checkCurrentPage();
  }, []);

  function checkCurrentPage() {
    const routeName = route.name;
    if (routeName === "Products") {
      setSelected(0);
    } else if (routeName === "Notifications") {
      setSelected(1);
    } else if (routeName === "AddProduct") {
      setSelected(2);
    } else if (routeName === "Search") {
      setSelected(3);
    } else if (routeName === "Profile" || "Login" || "Signup") {
      setSelected(4);
    }
  }

  function navigateToProfile() {
    if (isUserLoggedIn === true) {
      navigation.navigate("Profile", {
        user: currentUser,
      });
    } else {
      navigation.navigate("Login");
    }
  }

  function navigateToAddProduct() {
    if (user) {
      navigation.navigate("AddProduct");
    } else {
      navigation.navigate("Login");
    }
  }

  function navigateToNoti() {
    if (user) {
      navigation.navigate("Notifications");
    } else {
      navigation.navigate("Login");
    }
  }

  function navigateToProducts() {
    navigation.navigate("Products");
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={navigateToProducts}
        style={{
          backgroundColor: selected === 0 ? "#6A8E4E" : "transparent",
          color: selected === 0 ? "white" : "#828282",
          height: 45,
          width: 45,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7px",
        }}
      >
        <FontAwesomeIcon
          size={30}
          color={selected === 0 ? "white" : "#828282"}
          style={styles.icon}
          icon={faHouse}
        />
      </Pressable>
      {isUserLoggedIn && (
        <Pressable
          onPress={navigateToNoti}
          style={{
            backgroundColor: selected === 1 ? "#6A8E4E" : "transparent",
            color: selected === 1 ? "white" : "#828282",
            height: 45,
            width: 45,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "7px",
          }}
        >
          <FontAwesomeIcon
            size={30}
            color={selected === 1 ? "white" : "#828282"}
            icon={faBell}
          />
        </Pressable>
      )}
      <Pressable
        onPress={navigateToAddProduct}
        addProduct
        style={{
          backgroundColor: selected === 2 ? "#6A8E4E" : "transparent",
          color: selected === 2 ? "white" : "#828282",
          height: 45,
          width: 45,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7px",
        }}
      >
        <FontAwesomeIcon
          size={30}
          color={selected === 2 ? "white" : "#828282"}
          icon={faSquarePlus}
        />
      </Pressable>
  
      <Pressable
        onPress={navigateToProfile}
        style={{
          backgroundColor: selected === 4 ? "#6A8E4E" : "transparent",
          height: 45,
          width: 45,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7px",
        }}
      >
        <FontAwesomeIcon
          size={30}
          color={selected === 4 ? "white" : "#828282"}
          icon={faUser}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: "12%",
    justifyContent: "space-evenly",
    paddingTop: 10,
    flexDirection: "row",
    backgroundColor: "white",
  },
  pressable: {
    width: 5,
    height: 5,
  },
});

export default Navbar;
