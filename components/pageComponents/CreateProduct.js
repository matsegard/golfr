import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Alert,
  Button,
} from "react-native";
import { Select, Box, CheckIcon, Center, ScrollView } from "native-base";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import PrimaryButton from "../inputs/PrimaryButton.js";
import { ProductValidationSchema } from "../schemas/ProductValidationSchema";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { boolean } from "yup";

export default function CreateProduct() {
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  useEffect(() => {
    addImageDatabase();
  }, [image]);

  const addImageDatabase = async () => {
    const storage = getStorage();
    let filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    const storageRef = ref(storage, "images");
    const imageRef = ref(storageRef, filename);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    await uploadBytes(imageRef, blob);
    await getDownloadURL(imageRef).then((downloadURL) => {
      setImgUrl(downloadURL);
    });
  };

  async function AddProducts({
    title,
    category,
    description,
    price,
    location,
    clubs,
    difficulty,
    gender,
    hand,
    shaft,
  }) {
    const docRef = await addDoc(collection(db, "products"), {
      title: title,
      category: category,
      image: imgUrl,
      description: description,
      price: price,
      location: location,
      clubs: clubs,
      difficulty: difficulty,
      gender: gender,
      hand: hand,
      shaft: shaft,
      user: user.displayName,
      booking: {
        booked: false,
        startDate: null,
        endDate: null,
        accepted: false,
        denied: false,
        renter: null,
      },
    });
    submitAlert();
  }

  const submitAlert = () => {
    Alert.alert("Annons skapad");
  };

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
          source={require("../../assets/Ellipse.png")}
        />
      </View>
      <Text style={styles.headerText}>Skapa en annons</Text>
      <View style={styles.form}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
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
            onSubmit={(values, actions) => {
              AddProducts(values);
              actions.setSubmitting(false);
              actions.resetForm({
                values: {
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
                },
              });
            }}
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
                    <Center>
                      <Box maxW="300" style={{ marginBottom: 20 }}>
                        <Select
                          variant="underlined"
                          selectedValue={values.difficulty}
                          value={values.difficulty}
                          onChangeText={handleChange("difficulty")}
                          onBlur={handleBlur("difficulty")}
                          minWidth="100%"
                          label="Ange klubbornas svårighetsgrad"
                          accessibilityLabel="Ange klubbornas svårighetsgrad"
                          placeholder="Ange klubbornas svårighetsgrad"
                          _selectedItem={{
                            bg: "#6A8E4E",
                            endIcon: <CheckIcon size="4" />,
                          }}
                          mt={3}
                          onValueChange={handleChange("difficulty")}
                        >
                          <Select.Item label="Avancerad" value="Avancerad" />
                          <Select.Item label="Medel" value="Medel" />
                          <Select.Item label="Nybörjare" value="Nybörjare" />
                        </Select>
                      </Box>
                    </Center>
                    {errors.gender && (
                      <Text style={styles.errorMessage}>{errors.gender}</Text>
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
                {/* <ImageUpload setImage={setImage} image={image} /> */}
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon size={30} color="#828282" icon={faCamera} />
                  <Button title="Ladda upp en bild" onPress={pickImage} />
                  {image && (
                    <Image
                      source={{ uri: image.uri }}
                      style={{ width: 200, height: 200 }}
                    />
                  )}
                </View>
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
                    btnWidth={{ width: 200, marginTop: 25 }}
                    onPress={handleSubmit}
                    disabled={
                      !isValid ||
                      (values.title == "" &&
                        values.category == "" &&
                        values.image == "" &&
                        values.description == "" &&
                        values.price == "" &&
                        values.location == "" &&
                        values.clubs == "" &&
                        values.difficulty == "" &&
                        values.gender == "" &&
                        values.hand == "" &&
                        values.shaft == "")
                    }
                  />
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
