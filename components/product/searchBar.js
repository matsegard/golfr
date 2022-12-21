import { VStack, Input, Icon,Box, Divider, Heading } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
const SearchBar = () => {
    return (
       
        <VStack my="4" space={5} w="100%" maxW="300px"  divider={<Box px="2">
            <Divider />
           </Box>}>
          <VStack w="100%" space={5} alignSelf="center">
          <Input backgroundColor="gray.300" placeholder="Search" placeholderTextColor="black" variant="filled"  width="100%" borderRadius="10" py="1" px="2" InputLeftElement={<Icon ml="2" size="4" color="black" as={<Ionicons name="ios-search" />} />} />
       </VStack>
       </VStack>
    )
}

export default SearchBar;

