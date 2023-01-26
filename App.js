import HomePage from "./pages/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import ProductPage from "./pages/ProductPage";
import DatePicker from "./components/modals/DatePickerModal";
import ProfilePage from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/signupPage";
import ProductDetails from "./pages/ProductDetailsPage";
import CreateProductPage from "./pages/CreateProductPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import MyProductsPage from "./pages/MyProductsPage";
import EditProductModal from "./components/modals/EditProductModal";
import HelpPage from "./pages/HelpPage";
import SettingsPage from "./pages/SettingsPage";


export default function App() {
  const Stack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
    MontserratBold: require("./assets/Montserrat-Bold.ttf"),
    MontserratRegular: require("./assets/Montserrat-Regular.ttf"),
    MontserratMedium: require("./assets/Montserrat-Medium.ttf"),
    MontserratLight: require("./assets/Montserrat-Light.ttf"),
    MontserratSemiBold: require("./assets/Montserrat-SemiBold.ttf"),
  });



  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName="Products">
        
          <Stack.Screen
            name="Products"
            component={ProductPage}
            options={{
              headerBackTitleVisible: false,
              headerBackVisible: false,
              title: "Annonser",
              headerStyle: {
                backgroundColor: "#6A8E4E",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationPage}
            options={{
              headerBackTitleVisible: false,
              headerBackVisible: false,
              title: "Notiser",
              headerStyle: {
                backgroundColor: "#6A8E4E",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="MyProducts"
            component={MyProductsPage}
            options={{
              headerBackTitleVisible: false,
              headerBackVisible: false,
              title: "Mina annonser",
              headerStyle: {
                backgroundColor: "#6A8E4E",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="AddProduct"
            component={CreateProductPage}
            options={{
              title: "Skapa annons",
              headerBackTitleVisible: false,
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: "#6A8E4E",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfilePage}
            options={{
              title: "Profil",
              headerBackTitleVisible: false,
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: "#6A8E4E",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{
              title: "",
              headerBackTitleVisible: false,
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: "#6A8E4E",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupPage}
            options={{
              title: "",
              headerBackTitleVisible: false,
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: "#6A8E4E",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Redigera"
            component={EditProductModal}
            options={{
              title: "Redigera produkt",
              headerStyle: {
                backgroundColor: "#6A8E4E",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{
              title: "Produkt",
              headerStyle: {
                backgroundColor: "#6A8E4E",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="HelpPage"
            component={HelpPage}
            options={{
              title: "Hjälp",
              headerStyle: {
                backgroundColor: "#6A8E4E",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsPage}
            options={{
              title: "Inställningar",
              headerStyle: {
                backgroundColor: "#6A8E4E",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen name="DatePicker" component={DatePicker} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
