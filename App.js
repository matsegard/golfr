import HomePage from "./pages/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import ProductPage from "./pages/ProductPage";
import DatePicker from "./components/modals/DatePickerModal";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductDetails from "./pages/ProductDetailsPage";
import CreateProductPage from "./pages/CreateProductPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import MyProductsPage from "./pages/MyProductsPage";
import EditProductModal from "./components/modals/EditProductModal";
// import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
    MontserratBold: require("./assets/Montserrat-Bold.ttf"),
    MontserratRegular: require("./assets/Montserrat-Regular.ttf"),
    MontserratMedium: require("./assets/Montserrat-Medium.ttf"),
    MontserratLight: require("./assets/Montserrat-Light.ttf"),
    MontserratSemiBold: require("./assets/Montserrat-SemiBold.ttf"),
  });

  // SplashScreen.preventAutoHideAsync();

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Products" component={ProductPage} />
          <Stack.Screen name="MyProducts" component={MyProductsPage} />
          <Stack.Screen
            name="AddProduct"
            component={CreateProductPage}
            options={{
              title: "AddProduct",
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
              title: "Login",
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
              title: "Registrera",
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
          <Stack.Screen name="DatePicker" component={DatePicker} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
