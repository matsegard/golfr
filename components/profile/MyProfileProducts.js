import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  Stack,
  Pressable,
} from "native-base";
import { Alert, View } from "react-native";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import EditProductModal from "../modals/EditProductModal";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";

const MyProfileProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  async function deleteProduct(product) {
    await deleteDoc(doc(db, "products", product.id));
    setUpdate(true);
    Alert.alert("Annons raderad");
  }

  async function getData() {
    const productsFromDb = [];
    if (user) {
      const q = query(
        collection(db, "products"),
        where("user", "==", user.displayName)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        productsFromDb.push({ data: doc.data(), id: doc.id });
      });
      setMyProducts(productsFromDb);
      return;
    } else {
      Alert.alert("Du måste logga in för att se dina annonser");
      navigation.navigate("Login");
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [update])
  );

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginBottom: 75,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} height="100%">
          <Text
            marginTop="5"
            fontSize="xl"
            marginBottom="5"
            fontFamily="MontserratBold"
            alignSelf={"center"}
          >
            Mina annonser
          </Text>
          {myProducts.length === 0 && (
            <Text
              style={{
                alignSelf: "center",
                alignItem: "center",
                fontFamily: "MontserratMedium",
              }}
            >
              Du har inte lagt ut några annoner
            </Text>
          )}
          {myProducts.map((product, i) => (
            <Box
              key={i}
              maxW="80"
              rounded="lg"
              marginBottom="5"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
            >
              <Box>
                <AspectRatio w="100%" ratio={16 / 10}>
                  <Image
                    source={{
                      uri: product.data.image,
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Stack p="4" space={2}>
                <Stack space={3}>
                  <Heading size="md" ml="-1">
                    {product.data.title}
                  </Heading>
                </Stack>
                <Text fontWeight="400">{product.data.description}</Text>
                <Text fontWeight="600" style={{ marginTop: 10 }}>
                  {product.data.price}kr
                  <Text fontWeight="400"> /dag</Text>
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                  }}
                >
                  <FontAwesomeIcon color="#6A994E" icon={faLocationDot} />
                  <Text
                    style={{ fontFamily: "MontserratMedium", marginLeft: 2 }}
                    fontWeight="400"
                  >
                    {product.data.location}
                  </Text>
                </View>
              </Stack>
              <Box flexDirection="row" justifyContent="flex-end">
                <Pressable onPress={() => deleteProduct(product)}>
                  <FontAwesomeIcon
                    style={{ marginRight: 20, marginBottom: 20 }}
                    color="#E46969"
                    size={25}
                    icon={faTrashCan}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Redigera", {
                      title: product.data.title,
                      image: product.data.image,
                      price: product.data.price,
                      category: product.data.category,
                      description: product.data.description,
                      location: product.data.location,
                      clubs: product.data.clubs,
                      difficulty: product.data.difficulty,
                      shaft: product.data.shaft,
                      hand: product.data.hand,
                      gender: product.data.gender,
                      user: product.data.user,
                      id: product.id,
                    });
                  }}
                >
                  <FontAwesomeIcon
                    style={{ marginRight: 15 }}
                    color="#6A8E4E"
                    size={25}
                    icon={faPen}
                  />
                </Pressable>
              </Box>
            </Box>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default MyProfileProducts;
