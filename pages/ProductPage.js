import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProductCard from "../components/ProductCard";
import CategoryBar from "../components/CategoryBar.js";
import SearchBar from "../components/SearchBar";

export default function ProductPage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <SearchBar />
      </View>
      <CategoryBar />
      <View style={styles.top} />
      <Text
        style={{
          fontFamily: "MontserratSemiBold",
          fontSize: 30,
        }}
      >
        <ProductCard />
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: "1",
    backgroundColor: "FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
  product: {
    marginTop: 135,
  },
  text: { fontSize: "50" },
});
