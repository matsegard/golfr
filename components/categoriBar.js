import { View, Pressable, Text } from "native-base";
import { StyleSheet } from "react-native";

const CategoriBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("Klubbor kategori")}>
        <Text style={styles.categoryText} fontSize="xl">
          Klubbor
        </Text>
      </Pressable>

      <Pressable onPress={() => console.log("Golfset kategori")}>
        <Text style={styles.categoryText} fontSize="xl">
          Golfset
        </Text>
      </Pressable>

      <Pressable onPress={() => console.log("Golfset Vagn")}>
        <Text style={styles.categoryText} fontSize="xl">
          Vagn
        </Text>
      </Pressable>

      <Pressable onPress={() => console.log("Golfset Golfbil")}>
        <Text style={styles.categoryText} fontSize="xl">
          Golfbil
        </Text>
      </Pressable>

      <Pressable onPress={() => console.log("Golfset Övrigt")}>
        <Text style={styles.categoryText} fontSize="xl">
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
  },
  categoryText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 13,
    color: "#9B9B9B",
    marginBottom: 15,
  },
});

export default CategoriBar;
