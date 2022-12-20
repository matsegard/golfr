import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

export default function ProductDetails() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 3,
          backgroundColor: "powderblue",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={require("../assets/test.jpg")} />
        <Text>ProductDetails</Text>
      </View>
      <View
        style={{
          flex: 2.5,
          backgroundColor: "white",
          borderTopLeftRadius: "20",
          borderTopRightRadius: "20",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: "1",
    backgroundColor: "white",
  },
});
