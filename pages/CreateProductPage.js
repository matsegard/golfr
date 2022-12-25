import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TextInput } from "react-native";
import { Select, Box, CheckIcon, Center, ScrollView } from "native-base";
import Navbar from "../components/Navbar";
import { Formik } from "formik";
import PrimaryButton from "../components/PrimaryButton.js";
import { ProductValidationSchema } from "../components/ProductValidationSchema";

export default function CreateProduct() {
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
      <Text style={styles.headerText}>Skapa en annons</Text>
      <View style={styles.form}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={ProductValidationSchema}
            initialValues={{
              title: "",
              category: "",
              image: "",
              description: "",
              price: "",
              location: "",
              clubs: "",
              difficulty: "",
              gender: "",
              hand: "",
              shaft: "",
            }}
            onSubmit={(values) => console.log(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isValid,
              errors,
            }) => (
              <>
                <Text style={styles.formLabel}>Titel</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Skriv en titel"
                  value={values.title}
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  validateOnChange={false}
                  validateOnBlur={false}
                />
                {errors.title && (
                  <Text style={styles.errorMessage}>{errors.title}</Text>
                )}
                <Text style={styles.formLabel}>Kategori</Text>
                <Center>
                  <Box maxW="300" style={{ marginBottom: 20 }}>
                    <Select
                      variant="underlined"
                      selectedValue={values.category}
                      value={values.category}
                      onChangeText={handleChange("category")}
                      onBlur={handleBlur("category")}
                      minWidth="100%"
                      label="Välj kategori"
                      accessibilityLabel="Välj kategori"
                      placeholder="Välj kategori"
                      _selectedItem={{
                        bg: "#6A8E4E",
                        endIcon: <CheckIcon size="4" />,
                      }}
                      mt={3}
                      onValueChange={handleChange("category")}
                    >
                      <Select.Item label="Golfset" value="Golfset" />
                      <Select.Item label="Vagn/bag" value="Vagn/bag" />
                      <Select.Item label="Golfklubba" value="Golfklubba" />
                      <Select.Item label="Golfbil" value="Golfbil" />
                      <Select.Item label="Övrigt" value="Övrigt" />
                    </Select>
                  </Box>
                </Center>
                {errors.category && (
                  <Text style={styles.errorMessage}>{errors.category}</Text>
                )}
                {values.category == "Golfset" && (
                  <>
                    <Text style={styles.formLabel}>Klubbor</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="5 - 6 - 7 - 8 - 9 - PW - Driver - Putter.."
                      keyboardType="numeric"
                      value={values.clubs}
                      onChangeText={handleChange("clubs")}
                      onBlur={handleBlur("clubs")}
                    />
                    {errors.clubs && (
                      <Text style={styles.errorMessage}>{errors.clubs}</Text>
                    )}
                    <Text style={styles.formLabel}>Svårighetsgrad</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Ange klubbornas svårighetsgrad"
                      keyboardType="numeric"
                      value={values.klubbor}
                      onChangeText={handleChange("difficulty")}
                      onBlur={handleBlur("difficulty")}
                    />
                    {errors.difficulty && (
                      <Text style={styles.errorMessage}>
                        {errors.difficulty}
                      </Text>
                    )}
                    <Text style={styles.formLabel}>Kön</Text>
                    <Center>
                      <Box maxW="300" style={{ marginBottom: 20 }}>
                        <Select
                          variant="underlined"
                          selectedValue={values.gender}
                          value={values.gender}
                          onChangeText={handleChange("gender")}
                          onBlur={handleBlur("gender")}
                          minWidth="100%"
                          label="Välj kön"
                          accessibilityLabel="Välj kön"
                          placeholder="Välj kön"
                          _selectedItem={{
                            bg: "#6A8E4E",
                            endIcon: <CheckIcon size="4" />,
                          }}
                          mt={3}
                          onValueChange={handleChange("gender")}
                        >
                          <Select.Item label="Herr" value="Herr" />
                          <Select.Item label="Dam" value="Dam" />
                          <Select.Item label="Unisex" value="Unisex" />
                        </Select>
                      </Box>
                    </Center>
                    {errors.gender && (
                      <Text style={styles.errorMessage}>{errors.gender}</Text>
                    )}
                    <Text style={styles.formLabel}>Fattning</Text>
                    <Center>
                      <Box maxW="300" style={{ marginBottom: 20 }}>
                        <Select
                          variant="underlined"
                          selectedValue={values.hand}
                          value={values.hand}
                          onChangeText={handleChange("hand")}
                          onBlur={handleBlur("hand")}
                          minWidth="100%"
                          label="Välj kön"
                          accessibilityLabel="Välj fattning"
                          placeholder="Välj fattning"
                          _selectedItem={{
                            bg: "#6A8E4E",
                            endIcon: <CheckIcon size="4" />,
                          }}
                          mt={3}
                          onValueChange={handleChange("hand")}
                        >
                          <Select.Item label="Höger" value="Höger" />
                          <Select.Item label="Vänster" value="Vänster" />
                        </Select>
                      </Box>
                    </Center>
                    {errors.hand && (
                      <Text style={styles.errorMessage}>{errors.hand}</Text>
                    )}
                    <Text style={styles.formLabel}>Skaftstyvhet</Text>
                    <Center>
                      <Box maxW="300" style={{ marginBottom: 20 }}>
                        <Select
                          variant="underlined"
                          selectedValue={values.shaft}
                          value={values.shaft}
                          onChangeText={handleChange("shaft")}
                          onBlur={handleBlur("shaft")}
                          minWidth="100%"
                          label="Välj skaftstyvhet"
                          accessibilityLabel="Välj skaftstyvhet"
                          placeholder="Välj skaftstyvhet"
                          _selectedItem={{
                            bg: "#6A8E4E",
                            endIcon: <CheckIcon size="4" />,
                          }}
                          mt={3}
                          onValueChange={handleChange("shaft")}
                        >
                          <Select.Item label="Lady" value="Lady" />
                          <Select.Item label="Senior" value="Senior" />
                          <Select.Item label="Regular" value="Regular" />
                          <Select.Item label="Stiff" value="Stiff" />
                          <Select.Item label="X-Stiff" value="X-Stiff" />
                        </Select>
                      </Box>
                    </Center>
                  </>
                )}

                <Text style={styles.formLabel}>Bild</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Välj bild"
                  keyboardType="numeric"
                  value={values.image}
                  onChangeText={handleChange("image")}
                  onBlur={handleBlur("image")}
                />
                <Text style={styles.formLabel}>Beskrivning</Text>
                <TextInput
                  multiline
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  style={styles.inputDescription}
                  placeholder="Beskrivning"
                  value={values.description}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                />
                {errors.description && (
                  <Text style={styles.errorMessage}>{errors.description}</Text>
                )}
                <Text style={styles.formLabel}>Pris</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ange pris"
                  keyboardType="numeric"
                  value={values.price}
                  onChangeText={handleChange("price")}
                  onBlur={handleBlur("price")}
                />
                {errors.price && (
                  <Text style={styles.errorMessage}>{errors.price}</Text>
                )}
                <Text style={styles.formLabel}>Plats</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ange plats"
                  value={values.location}
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                />
                {errors.location && (
                  <Text style={styles.errorMessage}>{errors.location}</Text>
                )}
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <PrimaryButton
                    label="Lägg till annons"
                    btnWidth={{ width: 200, marginTop: 10 }}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
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
    top: -55,
  },
  headerText: {
    fontSize: "25",
    fontFamily: "MontserratSemiBold",
    marginBottom: 60,
    alignSelf: "center",
    color: "white",
  },
  input: {
    height: 40,
    marginBottom: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#B6B6B6",
  },
  inputDescription: {
    height: 70,
    marginBottom: 20,
    marginLeft: -10,
    padding: 10,
    width: "100%",
    borderBottomWidth: 1,
  },
  form: {
    width: "70%",
    flex: 0.9,
    marginBottom: 80,
  },
  formLabel: {
    fontFamily: "MontserratMedium",
    color: "#878787",
    marginTop: 10,
  },
  errorMessage: {
    fontSize: 13,
    color: "red",
    marginTop: -13,
    marginBottom: 10,
  },
});
