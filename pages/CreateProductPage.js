import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import Navbar from "../components/Navbar";

export default function CreateProduct({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.greenBubble}>
        <Image
          style={[
            styles.greenBubble,
            {
              transform: [{ rotate: "180deg" }],
            },
          ]}
          source={require("../assets/Ellipse.png")}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.headerText}>Lägg ut en annons</Text>
        <Text style={styles.formLabel}>Titel</Text>
        <TextInput
          style={styles.input}
          placeholder="Skriv en titel"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Kategori</Text>
        <TextInput
          style={styles.input}
          placeholder="Skriv en titel"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Bild</Text>
        <TextInput
          style={styles.input}
          placeholder="Skriv en titel"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Beskrivning</Text>
        <TextInput
          style={styles.input}
          placeholder="Skriv en titel"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Pris</Text>
        <TextInput
          style={styles.input}
          placeholder="Skriv en titel"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Plats</Text>
        <TextInput
          style={styles.input}
          placeholder="Skriv en titel"
          keyboardType="numeric"
        />
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: "1",
    backgroundColor: "FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
  greenBubble: {
    width: "100%",
    height: 224,
    position: "absolute",
    top: -40,
  },
  headerText: {
    fontSize: "25",
    fontFamily: "MontserratSemiBold",
    marginBottom: 30,
    alignSelf: "center",
  },
  input: {
    height: 40,
    marginBottom: 20,
    padding: 10,
    width: "90%",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  form: {
    width: "70%",
    flex: 0.6,
  },
  formLabel: {
    fontFamily: "MontserratMedium",
    color: "gray",
  },
});
