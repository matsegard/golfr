import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TextInput } from "react-native";
import { Select, Box, CheckIcon, Center } from "native-base";
import Navbar from "../components/Navbar";

export default function CreateProduct() {
  const [service, setService] = useState("");

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
        <Center>
          <Box maxW="300" style={{ marginBottom: 20 }}>
            <Select
              selectedValue={service}
              minWidth="100%"
              accessibilityLabel="Välj kategori"
              placeholder="Välj kategori"
              _selectedItem={{
                bg: "#6A8E4E",
                endIcon: <CheckIcon size="4" />,
              }}
              mt={3}
              onValueChange={(itemValue) => setService(itemValue)}
            >
              <Select.Item label="Golfset" value="Golfset" />
              <Select.Item label="Vagn/bag" value="Vagn/bag" />
              <Select.Item label="Golfklubba" value="Golfklubba" />
              <Select.Item label="Golfbil" value="Golfbil" />
              <Select.Item label="Övrigt" value="Övrigt" />
            </Select>
          </Box>
        </Center>
        <Text style={styles.formLabel}>Bild</Text>
        <TextInput
          style={styles.input}
          placeholder="Välj bild"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Beskrivning</Text>
        <TextInput
          multiline
          numberOfLines={10}
          style={styles.input}
          placeholder="Beskrivning"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Pris</Text>
        <TextInput
          style={styles.input}
          placeholder="Ange pris"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Plats</Text>
        <TextInput
          style={styles.input}
          placeholder="Ange plats"
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
    width: "100%",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  form: {
    width: "70%",
    flex: 0.6,
  },
  formLabel: {
    fontFamily: "MontserratMedium",
    color: "#585858",
  },
});
