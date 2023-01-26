import { View } from "react-native";
import Navbar from "../components/bars/Navbar";
import Notifications from "../components/notification/Notifications";

const NotificationPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <Notifications />
      <Navbar />
    </View>
  );
};

export default NotificationPage;
