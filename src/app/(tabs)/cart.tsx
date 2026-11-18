import { useState } from "react";
import { Pressable, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Trash2 } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Image } from "expo-image";
import { carts } from "@/data";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function cart() {
  const insets = useSafeAreaInsets();

  const [cartItems, setCartItems] = useState(carts);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleClose = () => setShowAlertDialog(false);
  const [toDeleteCart, setToDeleteCart] = useState<{
    cartId: number;
    itemId: number;
  }>({
    cartId: 0,
    itemId: 0,
  });

  const handleQuantityChange = (
    cartId: number,
    itemId: number,
    amount: number,
  ) => {
    setCartItems((prev) =>
      prev.map((cart) =>
        cart.id === cartId
          ? {
              ...cart,
              items: cart.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      quantity: Math.max(1, item.quantity + amount),
                    }
                  : item,
              ),
            }
          : cart,
      ),
    );
  };

  const handleClearCartAlert = () =>
    Alert.alert(
      "Clear All",
      "Are you sure want to clear cart.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => handleClearCart(),
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog.",
          ),
      },
    );

  const handleDeleteCartItem = () => {
    setCartItems((prev) =>
      prev
        .map((cart) =>
          cart.id === toDeleteCart.cartId
            ? {
                ...cart,
                items: cart.items.filter(
                  (item) => item.id !== toDeleteCart.itemId,
                ),
              }
            : cart,
        )
        .filter((cart) => cart.items.length > 0),
    );
    setToDeleteCart({
      cartId: 0,
      itemId: 0,
    });
    setShowAlertDialog(false);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, cart) =>
      total +
      cart.items.reduce((sum, item) => sum + cart.price * item.quantity, 0),
    0,
  );

  const totalQuantity = cartItems.reduce(
    (total, cart) =>
      total + cart.items.reduce((sum, item) => sum + item.quantity, 0),
    0,
  );

  const handleConfirmOrder = () => {};

  return (
    <Box style={{ marginTop: insets.top }} className="flex-1 px-3 bg-white">
      <HStack className="items-center justify-between py-3">
        <Heading size="md">Shopping Cart</Heading>

        {cartItems.length > 0 && (
          <Pressable
            onPress={handleClearCartAlert}
            className="w-9 h-9 items-center justify-center"
          >
            <Trash2 size={19} color="#DC2626" />
          </Pressable>
        )}
      </HStack>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 12, flexGrow: 1 }}
      >
        {cartItems.length === 0 ? (
          <Center className="flex-1">
            <Text size="sm" className="text-gray-500">
              Your cart is empty
            </Text>
          </Center>
        ) : (
          <VStack space="sm">
            {cartItems.map((cart) =>
              cart.items.map((item) => (
                <HStack
                  key={`${cart.id}-${item.id}`}
                  className="w-full items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <Image
                    style={{ width: 65, height: 65 }}
                    source={cart.image}
                    contentFit="cover"
                    transition={200}
                    placeholder={blurhash}
                  />

                  <VStack className="flex-1 gap-2">
                    <Text size="sm" className="font-medium">
                      {cart.title}
                    </Text>

                    <VStack className="gap-1">
                      <Text size="xs" className="text-gray-500">
                        {item.color} - {item.size}
                      </Text>

                      <Text size="sm" className="font-semibold">
                        {cart.price.toFixed(2)} × {item.quantity} = $
                        {(cart.price * item.quantity).toFixed(2)}
                      </Text>
                    </VStack>
                  </VStack>

                  <HStack className="items-center gap-2">
                    <HStack className="items-center gap-2">
                      <Pressable
                        onPress={() =>
                          handleQuantityChange(cart.id, item.id, -1)
                        }
                        className="w-7 h-7 items-center justify-center"
                      >
                        <Text size="lg" className="text-gray-700">
                          −
                        </Text>
                      </Pressable>

                      <Text size="sm" className="font-semibold">
                        {item.quantity}
                      </Text>

                      <Pressable
                        onPress={() =>
                          handleQuantityChange(cart.id, item.id, 1)
                        }
                        className="w-7 h-7 items-center justify-center"
                      >
                        <Text size="lg" className="text-gray-700">
                          +
                        </Text>
                      </Pressable>
                    </HStack>

                    <Pressable
                      onPress={() => {
                        setShowAlertDialog(!showAlertDialog);
                        setToDeleteCart({ cartId: cart.id, itemId: item.id });
                      }}
                      className="items-center justify-center"
                    >
                      <Trash2 size={17} color="#DC2626" />
                    </Pressable>
                  </HStack>
                </HStack>
              )),
            )}
          </VStack>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <VStack
          className="border-t border-gray-200 pt-3 gap-2 px-1"
          style={{ paddingBottom: insets.bottom + 12 }}
        >
          <HStack className="justify-between items-center">
            <Text size="xs" className="text-gray-500">
              Total Items
            </Text>

            <Text size="sm" className="font-medium">
              {totalQuantity}
            </Text>
          </HStack>

          <HStack className="justify-between items-center">
            <Text size="sm" className="font-medium">
              Total Price
            </Text>

            <Text size="sm" className="font-bold">
              ${totalPrice.toFixed(2)}
            </Text>
          </HStack>

          <Pressable
            onPress={handleConfirmOrder}
            className="bg-green-600 rounded-lg py-2.5 items-center"
          >
            <Text size="sm" className="text-white font-semibold">
              Confirm
            </Text>
          </Pressable>
        </VStack>
      )}
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose}>
        <AlertDialogBackdrop />
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <Heading className="text-foreground font-semibold text-lg">
              Are you sure you want to delete this item?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text className="text-sm text-muted-foreground">
              Deleting the item will remove it permanently and cannot be undone.
              Please confirm if you want to proceed.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant="outline" onPress={handleClose}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              onPress={handleDeleteCartItem}
              variant="secondary"
              className="bg-sky-500"
            >
              <ButtonText className="text-white">Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
}
