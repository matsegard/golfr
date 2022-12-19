import { StyleSheet, Text, View, Button } from "react-native";

export default function HomePage({ navigation }) {
  return (
    <View>
      <Button
        title="Gå till produktsidan"
        onPress={() => navigation.navigate("Products")}
      />
    </View>
  );
}
