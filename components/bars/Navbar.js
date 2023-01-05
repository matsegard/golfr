import { Pressable, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { useNavigation } from "@react-navigation/native";

import { getAuth, onAuthStateChanged } from "firebase/auth"
=======


function Navbar() {
  const [selected, setSelected] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
  const navigation = useNavigation();
  const auth = getAuth();

  const currentUser = auth.currentUser;

  const auth = getAuth();
  const user = auth.currentUser;

  function addProduct() {
    setSelected(2);
    if (user) {
      navigation.navigate("AddProduct");
    } else {
      navigation.navigate("Login");
    }
  }

  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true)
      } else {
        setIsUserLoggedIn(false)
      }
    });
  }, []);

 function navigatetoPage(){
      if ( isUserLoggedIn === true ) {
        navigation.navigate("Profile", {
          user: currentUser,
         }) 
      } else {
        navigation.navigate("Login") 
      }
     setSelected(4)
 }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setSelected(0)}
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
      { isUserLoggedIn && (
        <Pressable
        onPress={() => setSelected(1)}
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
        onPress={addProduct}
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
        onPress={() => setSelected(3)}
        style={{
          backgroundColor: selected === 3 ? "#6A8E4E" : "transparent",
          color: selected === 3 ? "white" : "#828282",
          height: 45,
          width: 45,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7px",
        }}
      >
        <FontAwesomeIcon
          size={30}
          color={selected === 3 ? "white" : "#828282"}
          icon={faMagnifyingGlass}
        />
      </Pressable>
      <Pressable
        onPress={navigatetoPage}
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
    height: "10%",
    justifyContent: "space-evenly",
    // alignItems: "center",
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
