import { View, Button, Pressable, Text } from "react-native";
import PrimaryButton from "../components/inputs/PrimaryButton";
import Navbar from "../components/bars/Navbar";
import EditProductModal from "../components/modals/EditProductModal";
import { useState } from "react";
import ImageUpload from "../components/inputs/ImageUpload";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function HomePage({ navigation }) {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(!open);
  };

  function databaseTest() {
    setDoc(doc(db, "cities", "uid"), {
      name: "hedemora",
      state: "CA",
      country: "USA",
    });
  }

  return (
    <View style={{ height: "100%" }}>
      <Button title="Database test" onPress={() => databaseTest()}></Button>
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
      <Navbar />
    </View>
  );
}
