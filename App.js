import HomePage from "./pages/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import ProductPage from "./pages/ProductPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import { Fragment } from "react";
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
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
