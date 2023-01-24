import React from "react";
import { View } from "react-native";
import Profile from "../components/pageComponents/Profile";
import Navbar from "../components/bars/Navbar";

export default function ProfilePage() {
  return (
    <View style={{ flex: 1 }}>
      <Profile />
      <Navbar />
    </View>
  );
}
