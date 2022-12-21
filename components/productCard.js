import {ScrollView, Box, Heading, AspectRatio, Image, Text, Center, Stack, View,} from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { StyleSheet } from "react-native";

export default function ProductCard(){
     
      const Products = [{
        Title:"Titlest t100",
        Price: 299,
        Description:"Ett toppen golf sett som kommer göra att din tur i det gröna kommer att förvlandlas till en sago stund. Glöma sne och kortaslag, mot stjärnorna och vidare",
        Place:"Majorna Göteborg"
      },{
        Title:"Titlest t300",
        Price: 2999,
        Description:"Ett toppen golf sett som kommer göra att din tur i det gröna kommer att förvlandlas till en sago stund. Glöma sne och kortaslag, mot stjärnorna och vidare",
        Place:"Lunden Göteborg"
      }, {
        Title:"Titlest t300",
        Price: 2999,
        Description:"Ett toppen golf sett som kommer göra att din tur i det gröna kommer att förvlandlas till en sago stund. Glöma sne och kortaslag, mot stjärnorna och vidare",
        Place:"Lunden Göteborg"
      }
    ];
      
      return (     
      
        <ScrollView>
        <Box alignItems="center" marginBottom="20" >
        {Products.map((item) => (
          <Box maxW="80" rounded="lg" marginBottom="10" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
          }} _web={{
            shadow: 2,
            borderWidth: 0
          }} _light={{
            backgroundColor: "gray.50"
          }}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image source={{
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
              }} alt="image" />
            </AspectRatio>
            <Center bg="tertiary.500" _dark={{
              bg: "tertiary.500"
            }} _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs"
            }} position="absolute" bottom="0" px="3" py="1.5">
              {item.Price} kr/dag
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
               {item.Title}
              </Heading>
              <Text fontSize="xs" _light={{
                color: "tertiary.500"
              }} _dark={{
                color: "tertiary.500"
              }} fontWeight="500" ml="-0.5" mt="-1">
                 {item.Place} <FontAwesomeIcon icon={faLocationDot} />
              </Text>
            </Stack>
            <Text fontWeight="400">
              {item.Description}
            </Text>
          </Stack>
        </Box>
      ))}
      </Box>
      </ScrollView>
     
    )
  }
  
  const styles = StyleSheet.create({
    margin: {
        marginTop: 20,
    },
  });
 
  

