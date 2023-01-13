import { View } from "native-base";
import MyProfileProducts from "../components/profile/MyProfileProducts";
import Navbar from "../components/bars/Navbar";

const MyProductsPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <MyProfileProducts />
      <Navbar />
    </View>
  );
};

export default MyProductsPage;
