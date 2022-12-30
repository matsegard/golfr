import { View, Button, Pressable, Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton.js";
import Navbar from "../components/Navbar";
import ImageUpload from "../components/ImageUpload";
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
      <Button
        title="Gå till redigera produkt"
        onPress={() => navigation.navigate("Redigera")}
      />
      <Button
        title="Gå till mina annonser"
        onPress={() => navigation.navigate("MyProducts")}
      />
      <Button
        title="Gå till login"
        onPress={() => navigation.navigate("Login")}
        main
      />
      <PrimaryButton
        label="Lägg till produkt"
        btnWidth={{ width: 200 }}
        onPress={() => console.log("I am the third button")}
      />
      <Pressable title="Open" onPress={showModal}>
        <Text>Open</Text>
      </Pressable>
      {open && <EditProductModal open={open} setOpen={setOpen} />}
      <ImageUpload />
      <Navbar />
    </View>
  );
}
