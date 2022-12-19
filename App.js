import HomePage from "./pages/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import ProductPage from "./pages/ProductPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Products" component={ProductPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
