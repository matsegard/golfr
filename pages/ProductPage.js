import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function ProductPage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <Text style={styles.text}>Produkter</Text>
      </View>
      <Button
        title="Gå till en produkt"
        onPress={() => navigation.navigate("ProductDetails")}
      />
      <View style={styles.top} />
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
