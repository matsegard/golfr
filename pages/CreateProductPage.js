import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TextInput } from "react-native";
import { Select, Box, CheckIcon, Center } from "native-base";
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
      <View style={styles.form}>
        <Formik
          validationSchema={ProductValidationSchema}
          initialValues={{
            title: "",
            category: "",
            image: "",
            description: "",
            price: "",
            location: "",
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
              <Text style={styles.headerText}>Lägg ut en annons</Text>
              <Text style={styles.formLabel}>Titel</Text>
              <TextInput
                style={styles.input}
                placeholder="Skriv en titel"
                keyboardType="numeric"
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
              />
              {errors.title && (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errors.title}
                </Text>
              )}
              <Text style={styles.formLabel}>Kategori</Text>
              <Center>
                <Box maxW="300" style={{ marginBottom: 20 }}>
                  <Select
                    selectedValue={values.category}
                    value={values.category}
                    onChangeText={handleChange("category")}
                    onBlur={handleBlur("category")}
                    minWidth="100%"
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
                keyboardType="numeric"
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
              />
              <Text style={styles.formLabel}>Pris</Text>
              <TextInput
                style={styles.input}
                placeholder="Ange pris"
                keyboardType="numeric"
                value={values.price}
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
              />
              <Text style={styles.formLabel}>Plats</Text>
              <TextInput
                style={styles.input}
                placeholder="Ange plats"
                keyboardType="numeric"
                value={values.location}
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <PrimaryButton
                  label="Lägg till annons"
                  btnWidth={{ width: 200 }}
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              </View>
            </>
          )}
        </Formik>
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
  inputDescription: {
    height: 70,
    marginBottom: 20,
    padding: 10,
    width: "100%",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  form: {
    width: "70%",
    flex: 0.7,
  },
  formLabel: {
    fontFamily: "MontserratMedium",
    color: "#585858",
  },
});
