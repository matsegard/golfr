import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  Stack,
  HStack,
} from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

function ProductCard({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const filteredList = useMemo(getFilteredList, [selectedCategory, products]);

  async function getData() {
    const productsData = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      productsData.push(doc.data());
    });
    setProducts(productsData);
    setLoading(false);
    return;
  }

  function getFilteredList() {
    if (!selectedCategory) {
      return products;
    }
    return products.filter((item) => item.category === selectedCategory);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} height="auto">
      <Box alignItems="center" marginBottom="240">
        {!loading ? (
          filteredList.map((item) => (
            <Pressable
              key={item.uri}
              onPress={() => {
                navigation.navigate("ProductDetails", {
                  title: item.title,
                  image: item.image,
                  price: item.price,
                  description: item.description,
                  location: item.location,
                  clubs: item.clubs,
                  difficulty: item.difficulty,
                  shaft: item.shaft,
                  hand: item.hand,
                  gender: item.gender,
                  user: item.user,
                });
              }}
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
                        uri: item.image,
                      }}
                      alt={item.title}
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
                    <Text fontSize="xs">{item.user}</Text>
                  </Stack>
                  <Text fontWeight="400">{item.description}</Text>
                </Stack>
              </Box>
            </Pressable>
          ))
        ) : (
          <HStack justifyContent="center" alignItems="center">
            <ActivityIndicator
              style={styles.spinner}
              size="large"
              color="#6A8E4E"
            />
          </HStack>
        )}
        {filteredList.length === 0 && (
          <Text paddingTop={60}>No Result</Text>
        )}
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  margin: {
    marginTop: 20,
  },
  spinner: {
    margin: "auto",
    marginTop: 60,
  },
});

export default ProductCard;
