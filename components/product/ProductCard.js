import React, { useMemo, useState } from "react";
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
  View,
} from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function ProductCard({ selectedCategory, searchString }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const filteredList = useMemo(() => {
    if (selectedCategory) {
      return products.filter((item) => item.data.category === selectedCategory);
    } else if (searchString) {
      return products.filter((item) =>
        String(item.data.title).includes(searchString)
      );
    } else if (!selectedCategory && !searchString) return products;
  });

  async function getData() {
    const productsData = [];
    const q = query(
      collection(db, "products"),
      where("accepted", "==", false),
      where("pendingBooking", "==", false)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      productsData.push({ data: doc.data(), id: doc.id });
    });
    setProducts(productsData);
    setLoading(false);
    return;
  }

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} height="auto">
      <Box alignItems="center" marginBottom="240">
        {!loading ? (
          filteredList.map((item, i) => (
            <Pressable
              key={i}
              onPress={() => {
                navigation.navigate("ProductDetails", {
                  tilte: item.data.title,
                  image: item.data.image,
                  price: item.data.price,
                  description: item.data.description,
                  category: item.data.category,
                  location: item.data.location,
                  clubs: item.data.clubs,
                  difficulty: item.data.difficulty,
                  shaft: item.data.shaft,
                  hand: item.data.hand,
                  gender: item.data.gender,
                  user: item.data.user,
                  id: item.id,
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
                        uri: item.data.image,
                      }}
                      alt={item.data.title}
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
                    {item.data.price} kr/dag
                  </Center>
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1">
                      {item.data.title}
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
                      {item.data.location}
                      <FontAwesomeIcon color="#B6B6B6" icon={faLocationDot} />
                    </Text>
                    <Text fontSize="xs">
                      {item.data.user}{" "}
                      <FontAwesomeIcon color="#B6B6B6" icon={faUser} />
                    </Text>
                  </Stack>
                  <Text fontWeight="400">{item.data.description}</Text>
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
          <Text paddingTop={60}>Tyvärr, inga matchande annonser...</Text>
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
