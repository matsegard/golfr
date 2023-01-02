import {
  ScrollView,
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  Stack,
} from "native-base";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const MyProfileProducts = () => {
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
            Annonser
          </Text>
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
                  Title på produkterna
                </Heading>
              </Stack>
              <Text numberOfLines={2} fontWeight="400">
                Här kommer vi kunna skriva vad vi vill få ut för information om
                och här skriver vi för att få fram olika prudkter
              </Text>
            </Stack>
            <Box flexDirection="row" justifyContent="flex-end">
              <FontAwesomeIcon
                style={{ marginRight: 20, marginBottom: 10 }}
                color="#E46969"
                size={30}
                icon={faTrashCan}
              />
              <FontAwesomeIcon
                style={{ marginRight: 15 }}
                color="#6A8E4E"
                size={30}
                icon={faPen}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};

export default MyProfileProducts;
