import { View, Pressable, Text } from "native-base";
import { StyleSheet } from "react-native";
import React, { useState } from "react";

const CategoryBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { id: 1, title: "Klubbor" },
    { id: 2, title: "Golfset" },
    { id: 3, title: "Vagn" },
    { id: 4, title: "Golfbil" },
    { id: 5, title: "Övrigt" },
  ];

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <Pressable
          key={category.id}
          onPress={() => setSelectedCategory(`${category.title}`)}
        >
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              fontSize: 13,
              marginBottom: 15,
              color:
                selectedCategory === `${category.title}`
                  ? "#A4CB6D"
                  : "#9B9B9B",
            }}
            fontSize="xl"
          >
            {category.title}
          </Text>
        </Pressable>
      ))}
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
