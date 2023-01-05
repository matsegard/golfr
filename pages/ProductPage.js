import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import ProductCard from "../components/product/ProductCard";
import CategoryBar from "../components/bars/CategoryBar";
import SearchBar from "../components/inputs/SearchBar";

export default function ProductPage({ navigation }) {
  const route = useRoute();
  // const { user } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <SearchBar />
        {/* <Text>{user.displayName}</Text>
        <Text>{user.email}</Text> */}
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
