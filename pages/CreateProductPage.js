import React from "react";
import { View, KeyboardAvoidingView } from "react-native";
import CreateProduct from "../components/pageComponents/CreateProduct";

export default function CreateProductPage() {
  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <CreateProduct />
      </KeyboardAvoidingView>
    </View>
  );
}
