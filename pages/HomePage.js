import { View, Button } from "react-native";
import PrimaryButton from "../components/PrimaryButton.js";
import Navbar from "../components/Navbar";

export default function HomePage({ navigation }) {
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
    </View>
  );
}
