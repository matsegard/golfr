import React from "react";
import { View, KeyboardAvoidingView } from "react-native";
import Navbar from "../components/bars/Navbar";
import CreateProduct from "../components/pageComponents/CreateProduct";

export default function CreateProductPage() {
  return (
    <View>
      <CreateProduct />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <CreateProduct />
        <Navbar />
      </KeyboardAvoidingView>
    </View>
  );
}
