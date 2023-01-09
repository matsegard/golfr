import React from "react";
import { View } from "react-native";
import Login from "../components/pageComponents/Login";
import Navbar from "../components/bars/Navbar";

export default function LoginPage() {
  return (
    <View>
      <Login />
      <Navbar />
    </View>
  );
}
