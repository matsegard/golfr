import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Modal, Center, Select, ScrollView } from "native-base";
import PrimaryButton from "../inputs/PrimaryButton";
import { ProductValidationSchema } from "../schemas/ProductValidationSchema";
import { Formik } from "formik";
import { Box, CheckIcon } from "native-base";
import { useRoute } from "@react-navigation/native";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import * as ImagePicker from "expo-image-picker";
import Navbar from "../bars/Navbar";

export default function EditProductModal() {
  const [newImage, setNewImage] = useState(image);
  const [newImageUrl, setNewImageUrl] = useState(null);
  const navigation = useNavigation();

  const route = useRoute();
  const {
    title,
    price,
    location,
    description,
    category,
    shaft,
    clubs,
    difficulty,
    hand,
    gender,
    image,
    user,
    id,
  } = route.params;

  async function updateProduct({
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
    const updateRef = doc(db, "products", id);
    updateDoc(updateRef, {
      title: title,
      category: category,
      description: description,
      price: price,
      location: location,
      clubs: clubs,
      difficulty: difficulty,
      gender: gender,
      hand: hand,
      shaft: shaft,
      image: newImageUrl || image,
    })
      .then((updateRef) => {
        console.log("Uppdaterad");
        Alert.alert("Annons uppdaterad");
        navigation.navigate("MyProducts");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    addNewImageDatabase();
  }, [newImage]);

  console.log(newImageUrl);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0]);
    }
  };

  const addNewImageDatabase = async () => {
    const storage = getStorage();
    let filename = newImage.uri.substring(newImage.uri.lastIndexOf("/") + 1);
    const storageRef = ref(storage, "images");
    const imageRef = ref(storageRef, filename);
    const response = await fetch(newImage.uri);
    const blob = await response.blob();
    await uploadBytes(imageRef, blob);
    await getDownloadURL(imageRef).then((downloadURL) => {
      setNewImageUrl(downloadURL);
    });
  };
  console.log("gammal bild", image);
  console.log("ny bild", newImage);
  console.log("ny bild url", newImageUrl);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView vertical showsVerticalScrollIndicator={false} height="100%">
        <View style={styles.container}>
          <View style={styles.form}>
            <Formik
              validationSchema={ProductValidationSchema}
              initialValues={{
                title: title,
                category: category,
                image: image,
                description: description,
                price: price,
                location: location,
                clubs: clubs,
                difficulty: difficulty,
                gender: gender,
                hand: hand,
                shaft: shaft,
              }}
              onSubmit={(values, actions) => {
                updateProduct(values);
                actions.setSubmitting(false);
                actions.resetForm({
                  values: {
                    title: "",
                    category: "",
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
                      <Box maxW="300" style={{ marginBottom: 20 }}>
                        <Select
                          variant="underlined"
                          selectedValue={values.difficulty}
                          value={values.difficulty}
                          onChangeText={handleChange("difficulty")}
                          onBlur={handleBlur("difficulty")}
                          minWidth="100%"
                          label="Välj svårighetsgrad"
                          accessibilityLabel="Välj svårighetsgrad "
                          placeholder="Välj svårighetsgrad"
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
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 15,
                    }}
                  >
                    <FontAwesomeIcon
                      size={30}
                      color="#828282"
                      icon={faCamera}
                    />
                    <Button title="Ladda upp en bild" onPress={pickImage} />
                    {newImage ? (
                      <Image
                        source={{
                          uri: newImage.uri,
                        }}
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                      />
                    ) : (
                      <Image
                        source={{
                          uri: image,
                        }}
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                      />
                    )}
                    {!newImage ||
                      (newImageUrl == null && (
                        <Text
                          style={{
                            fontFamily: "MontserratMedium",
                            alignSelf: "center",
                            marginTop: 10,
                          }}
                        >
                          Bilden laddas upp...
                        </Text>
                      ))}
                  </View>

                  <Text style={styles.formLabel}>Beskrivning</Text>
                  <TextInput
                    multiline
                    numberOfLines={3}
                    style={styles.inputDescription}
                    placeholder="Beskrivning"
                    value={values.description}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                  />
                  {errors.description && (
                    <Text style={styles.errorMessage}>
                      {errors.description}
                    </Text>
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
                      label="Spara"
                      btnWidth={{ width: 200, marginTop: 25 }}
                      onPress={handleSubmit}
                      disabled={!isValid}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: "1",
    height: "100%",
    backgroundColor: "FAFAFA",
    justifyContent: "center",
    alignItems: "center",
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
    borderBottomColor: "#B6B6B6",
  },
  form: {
    width: "70%",
    flex: 0.9,
    marginBottom: 80,
    marginTop: 30,
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
