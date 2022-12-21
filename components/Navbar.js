import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

function Navbar() {
  const [selected, setSelected] = useState(0);

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
      <Pressable
        onPress={() => setSelected(2)}
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
        onPress={() => setSelected(4)}
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
    position: "fixed",
    bottom: 0,
    height: "10%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  pressable: {
    width: 5,
    height: 5,
  },
});

export default Navbar;
