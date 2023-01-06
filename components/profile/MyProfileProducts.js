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
import { Alert } from "react-native";
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

const MyProfileProducts = () => {
  const [open, setOpen] = useState(false);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  async function deleteProduct(product) {
    await deleteDoc(doc(db, "products", product.id));
    setLoading(true);
    Alert.alert("Annons raderad");
  }

  async function getData() {
    const productsFromDb = [];
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
    setLoading(false);
    return;
  }

  useEffect(() => {
    getData();
  }, [loading]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} height="auto">
        <Box alignItems="center" marginBottom="240">
          <Text
            marginTop="5"
            fontSize="xl"
            marginBottom="5"
            fontFamily="MontserratBold"
          >
            Mina annonser
          </Text>
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
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {product.data.title}
                  </Heading>
                </Stack>
                <Text numberOfLines={2} fontWeight="400">
                  {product.data.description}
                </Text>
              </Stack>
              <Box flexDirection="row" justifyContent="flex-end">
                <Pressable onPress={() => deleteProduct(product)}>
                  <FontAwesomeIcon
                    style={{ marginRight: 20, marginBottom: 10 }}
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
                {open && <EditProductModal />}
              </Box>
            </Box>
          ))}
        </Box>
      </ScrollView>
    </>
  );
};

export default MyProfileProducts;
