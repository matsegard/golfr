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
  // const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  let docId;

  const showModal = () => {
    setOpen(!open);
  };

  async function deleteProduct() {
    console.log("delete product");
    await deleteDoc(docRef);
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
      docId = doc.id;
      console.log(doc.id);
      // console.log(docId);
      productsFromDb.push(doc.data());
    });
    setMyProducts(productsFromDb);
    // setLoading(false);
    return;
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} height="auto">
        <Box alignItems="center" marginBottom="240">
          <Text
            marginTop="3"
            fontSize="xl"
            marginBottom="3"
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
                      uri: product.image,
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {product.title}
                  </Heading>
                </Stack>
                <Text numberOfLines={2} fontWeight="400">
                  {product.description}
                </Text>
              </Stack>
              <Box flexDirection="row" justifyContent="flex-end">
                <Pressable onPress={deleteProduct}>
                  <FontAwesomeIcon
                    style={{ marginRight: 20, marginBottom: 10 }}
                    color="#E46969"
                    size={30}
                    icon={faTrashCan}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Redigera", {
                      title: product.title,
                      image: product.image,
                      price: product.price,
                      category: product.category,
                      description: product.description,
                      location: product.location,
                      clubs: product.clubs,
                      difficulty: product.difficulty,
                      shaft: product.shaft,
                      hand: product.hand,
                      gender: product.gender,
                      user: product.user,
                    });
                  }}
                >
                  <FontAwesomeIcon
                    style={{ marginRight: 15 }}
                    color="#6A8E4E"
                    size={30}
                    icon={faPen}
                  />
                </Pressable>
                {open && (
                  <EditProductModal
                    open={open}
                    setOpen={setOpen}
                    product={product}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </ScrollView>
    </>
  );
};

export default MyProfileProducts;
