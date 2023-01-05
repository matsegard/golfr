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
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import EditProductModal from "../modals/EditProductModal";

const MyProfileProducts = () => {
  const [open, setOpen] = useState(false);
  const [myProducts, setMyProducts] = useState([]);
  // const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  const showModal = () => {
    setOpen(!open);
  };

  async function deleteProduct() {
    console.log("delete");
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
          {myProducts.map((product) => (
            <Box
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
                <AspectRatio w="100%" ratio={16 / 5}>
                  <Image
                    source={{
                      uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
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
                <Pressable onPress={showModal}>
                  <FontAwesomeIcon
                    style={{ marginRight: 15 }}
                    color="#6A8E4E"
                    size={30}
                    icon={faPen}
                    onPress={showModal}
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
