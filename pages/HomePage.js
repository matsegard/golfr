import { width } from "@fortawesome/free-solid-svg-icons/faLocationDot.js";
import { View, Button } from "react-native";
import PrimaryButton from "../components/PrimaryButton.js";

export default function HomePage({ navigation }) {
  return (
    <View>
      <Button
        title="Gå till produktsidan"
        onPress={() => navigation.navigate("Products")}
      />
      <Button
        title="Gå till mina annonser"
        onPress={() => navigation.navigate("MyProducts")}
      />
      <PrimaryButton
        label="Lägg till produkt"
        btnWidth={{ width: 200 }}
        onPress={() => console.log("I am the third button")}
      />
    </View>
  );
}
