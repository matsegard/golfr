import React from "react";
import { View } from "react-native";
import Navbar from "../components/bars/Navbar";
import CreateProduct from "../components/pageComponents/CreateProduct";

export default function CreateProductPage() {
  return (
    <View>
      <CreateProduct />
      <Navbar />
    </View>
  );
}
