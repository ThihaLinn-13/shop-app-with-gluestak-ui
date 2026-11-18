import CartComponent from "@/components/shop/CartComponent";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="detail"
        options={{
          title: "Product Detail",
          headerBackTitle: "Home",
          headerTitleAlign: "center",
          headerRight: () => <CartComponent></CartComponent>,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
