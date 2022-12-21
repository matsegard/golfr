import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

export default function Navbar() {
  const [selected, setSelected] = useState(false);

  let icons = [faHouse, faBell, faSquarePlus, faMagnifyingGlass, faUser];

  const handlePress = (icon) => () =>
    setSelected(selected => ({
      ...icon,
      [icon]: !selected[icon],
    }));

  return (
    <View style={styles.container}>
      {icons.map((icon, i) => {
        return (
          <Pressable
            key={i}
            onPress={handlePress(icon)}
            style={{
              backgroundColor: selected ? "#6A8E4E" : "transparent",
              color: selected ? "white" : "#828282",
              height: 45,
              width: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "7px",
            }}
          >
            <FontAwesomeIcon
              size={30}
              color={selected ? "white" : "#828282"}
              style={styles.icon}
              icon={icon}
            />
          </Pressable>
        );
      })}

      {/* <Pressable
        style={{
          backgroundColor: selected ? "#6A8E4E" : "transparent",
          color: selected ? "white" : "#828282",
        }}
        onPress={() => setSelected(!selected)}
      >
        <FontAwesomeIcon
          size={30}
          color={selected ? "white" : "#828282"}
          icon={faBell}
        />
      </Pressable>
      <Pressable
        style={{
          backgroundColor: selected ? "#6A8E4E" : "transparent",
          color: selected ? "white" : "#828282",
        }}
        onPress={() => setSelected(!selected)}
      >
        <FontAwesomeIcon
          size={30}
          color={selected ? "white" : "#828282"}
          icon={faSquarePlus}
        />
      </Pressable>
      <Pressable
        style={{
          backgroundColor: selected ? "#6A8E4E" : "transparent",
          color: selected ? "white" : "#828282",
        }}
        onPress={() => setSelected(!selected)}
      >
        <FontAwesomeIcon
          size={30}
          color={selected ? "white" : "#828282"}
          icon={faMagnifyingGlass}
        />
      </Pressable>
      <Pressable
        style={{
          backgroundColor: selected ? "#6A8E4E" : "transparent",
          color: selected ? "white" : "#828282",
        }}
        onPress={() => setSelected(!selected)}
      >
        <FontAwesomeIcon
          size={30}
          color={selected ? "white" : "#828282"}
          icon={faUser}
        />
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "10%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  navbarItem: {},
  pressable: {
    width: 5,
    height: 5,
  },
  icon: {},
});
