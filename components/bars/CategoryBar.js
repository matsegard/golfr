import { View, Pressable, Text } from "native-base";
import { StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CategoryBar = ({ selectedCategory, setSelectedCategory }) => {
  const categories = useMemo(() => {
    return [
      { id: 1, title: "Golfklubba" },
      { id: 2, title: "Golfset" },
      { id: 3, title: "Vagn/bag" },
      { id: 4, title: "Golfbil" },
      { id: 5, title: "Övrigt" },
    ];
  }, []);

  function selectCategory(item) {
    if (item == selectedCategory) {
      setSelectedCategory("");
    } else setSelectedCategory(item);
  }

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: selectedCategory === `${category.title}` ? 5 : null,
            paddingRight: selectedCategory === `${category.title}` ? 5 : null,
            backgroundColor:
              selectedCategory === `${category.title}` ? "#F0F8E4" : null,
            borderRadius:
              selectedCategory === `${category.title}` ? "10px" : null,
          }}
          key={category.id}
          onPress={() => selectCategory(`${category.title}`)}
        >
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              fontSize: 13,
              paddingRight: 3,
              color:
                selectedCategory === `${category.title}`
                  ? "#94C949"
                  : "#9B9B9B",
            }}
            fontSize="xl"
          >
            {category.title}
          </Text>
          {selectedCategory === `${category.title}` && (
            <FontAwesomeIcon icon={faXmark} size={12} color="#91C746" />
          )}
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
    marginBottom: 20,
  },
  categoryText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 13,
    color: "#9B9B9B",
    marginBottom: 15,
  },
});

export default CategoryBar;
