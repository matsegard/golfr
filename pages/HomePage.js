import { View, Button, Pressable, Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton.js";
import Navbar from "../components/Navbar";
import EditProductModal from "./EditProductModal.js";
import { useState } from "react";

export default function HomePage({ navigation }) {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(!open);
  };

  return (
    <View style={{ height: "100%" }}>
      <Button
        title="Gå till produktsidan"
        onPress={() => navigation.navigate("Products")}
      />
      <Button
        title="Gå till profilen"
        onPress={() => navigation.navigate("Profile")}
      />
      <PrimaryButton
        label="Lägg till produkt"
        btnWidth={{ width: 200 }}
        onPress={() => console.log("I am the third button")}
      />
      <Navbar />
      <Pressable title="Open" onPress={showModal}>
        <Text>Open</Text>
      </Pressable>
      {open && <EditProductModal open={open} setOpen={setOpen} />}
    </View>
  );
}
