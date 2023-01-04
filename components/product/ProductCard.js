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
  Button,
} from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

function ProductCard() {
  const [products, setProducts] = useState([]);

  async function getData() {
    const productsData = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      productsData.push(doc.data());
    });
    return setProducts(productsData);
  }

  useEffect(() => {
    getData();
  }, []);

  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false} height="auto">
      <Box alignItems="center" marginBottom="240">
        {products.map((item, i) => (
          <Pressable
            key={i}
            onPress={() => navigation.navigate("ProductDetails")}
          >
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
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                    }}
                    alt="image"
                  />
                </AspectRatio>
                <Center
                  bg="#6A994E"
                  _dark={{
                    bg: "tertiary.500",
                  }}
                  _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs",
                  }}
                  position="absolute"
                  bottom="0"
                  px="3"
                  py="1.5"
                >
                  {item.price} kr/dag
                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {item.title}
                  </Heading>
                  <Text
                    fontSize="xs"
                    _light={{
                      color: "#6A994E",
                    }}
                    _dark={{
                      color: "tertiary.500",
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                    mr="5"
                  >
                    {item.location}{" "}
                    <FontAwesomeIcon color="#B6B6B6" icon={faLocationDot} />
                  </Text>
                </Stack>
                <Text fontWeight="400">{item.description}</Text>
              </Stack>
            </Box>
          </Pressable>
        ))}
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  margin: {
    marginTop: 20,
  },
});

export default ProductCard;
