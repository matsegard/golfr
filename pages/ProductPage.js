import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import Navbar from "../components/Navbar"
import ProductCard from "../components/product/productCard";
import CategoriBar from "../components/product/categoriBar";
import SearchBar from "../components/product/searchBar";
export default function ProductPage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <SearchBar />
      </View>
      <CategoriBar />
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
      <Navbar />
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
