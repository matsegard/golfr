import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProductCard from "../components/product/ProductCard";
import CategoryBar from "../components/bars/CategoryBar";
import SearchBar from "../components/inputs/SearchBar";
import React, { useState } from "react";
import Navbar from "../components/bars/Navbar";

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.product}>
        <SearchBar />
      </View>
      <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <View style={styles.top} />
      <Text
        style={{
          fontFamily: "MontserratSemiBold",
          fontSize: 30,
        }}
      >
        <ProductCard selectedCategory={selectedCategory} />
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
