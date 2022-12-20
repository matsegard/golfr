import HomePage from "./pages/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import ProductPage from "./pages/ProductPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetails from "./pages/ProductDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
