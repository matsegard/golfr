import { View } from "native-base";
import MyProfileProducts from "../components/profile/MyProfileProducts";
import Navbar from "../components/bars/Navbar";

const MyProductsPage = () => {
  return (
    <View>
      <MyProfileProducts />
      <Navbar />
    </View>
  );
};

export default MyProductsPage;
