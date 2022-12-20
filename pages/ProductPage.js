import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";

export default function ProductPage() {
  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <Text style={styles.text}>Produkter</Text>
      </View>
      <View style={styles.top} />
      <Text
        style={{
          fontFamily: "MontserratSemiBold",
          fontSize: 30,
        }}
      >
        Golf club title
      </Text>
      <FontAwesomeIcon icon={faMugSaucer} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: "1",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  product: {},
  text: { fontSize: "50" },
});
