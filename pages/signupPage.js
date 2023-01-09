import React from "react";
import { View } from "react-native";
import Signup from "../components/pageComponents/Signup";
import Navbar from "../components/bars/Navbar";

export default function SignupPage() {
  return (
    <View>
      <Signup />
      <Navbar />
    </View>
  );
}
