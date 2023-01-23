import { Input, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ setSearchString }) => {
  const filterProducts = (text) => {
    setSearchString(text);
  };

  return (
    <Input
      onChangeText={(text) => filterProducts(text)}
      backgroundColor="#E4E4E4"
      placeholder="Search"
      placeholderTextColor="#989898"
      variant="filled"
      width="77%"
      borderRadius="10"
      py="1"
      px="2"
      size="xl"
      marginTop="5"
      InputLeftElement={
        <Icon
          ml="2"
          size="4"
          color="#989898"
          as={<Ionicons name="ios-search" />}
        />
      }
    />
  );
};

export default SearchBar;
