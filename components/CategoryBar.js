import { View, Pressable, Text } from "native-base";
import { StyleSheet } from "react-native";
import React, { useState } from "react";

const CategoryBar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setSelectedCategory(0)}>
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 13,
            marginBottom: 15,
            color: selectedCategory === 0 ? "#A4CB6D" : "#9B9B9B",
          }}
          fontSize="xl"
        >
          Klubbor
        </Text>
      </Pressable>

      <Pressable onPress={() => setSelectedCategory(1)}>
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 13,
            marginBottom: 15,
            color: selectedCategory === 1 ? "#A4CB6D" : "#9B9B9B",
          }}
          fontSize="xl"
        >
          Golfset
        </Text>
      </Pressable>

      <Pressable onPress={() => setSelectedCategory(2)}>
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 13,
            marginBottom: 15,
            color: selectedCategory === 2 ? "#A4CB6D" : "#9B9B9B",
          }}
          fontSize="xl"
        >
          Vagn
        </Text>
      </Pressable>

      <Pressable onPress={() => setSelectedCategory(3)}>
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 13,
            marginBottom: 15,
            color: selectedCategory === 3 ? "#A4CB6D" : "#9B9B9B",
          }}
          fontSize="xl"
        >
          Golfbil
        </Text>
      </Pressable>

      <Pressable onPress={() => setSelectedCategory(4)}>
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 13,
            marginBottom: 15,
            color: selectedCategory === 4 ? "#A4CB6D" : "#9B9B9B",
          }}
          fontSize="xl"
        >
          Övrigt
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    margin: 5,
    marginTop: 15,
  },
  categoryText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 13,
    color: "#9B9B9B",
    marginBottom: 15,
  },
});

export default CategoryBar;
