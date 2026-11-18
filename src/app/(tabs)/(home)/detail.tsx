import ViewPager from "@/components/shop/ViewPager";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { HStack } from "@/components/ui/hstack";
import { CheckIcon, FavouriteIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Toast, ToastDescription, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { products } from "@/data";
import { useLocalSearchParams } from "expo-router";
import { Star, Plus, CircleX, ShoppingCartPlus } from "lucide-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";

type CartSize = {
  sizeId: number;
  sizeName: string;
  quantity: number;
};

type CartItem = {
  cartId: string;
  colorId: number;
  colorName: string;
  sizes: CartSize[];
};
export default function Detail() {
  const { id } = useLocalSearchParams();
  const [seeMore, setSeeMore] = useState(false);
  const [color, setColor] = useState<number[]>([]);
  const [size, setSize] = useState<number[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const product = products.find((p) => p.id === Number(id));
  const toast = useToast();
  const [toastId, setToastId] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleToast = () => {
    if (!toast.isActive(toastId.toString())) {
      showNewToast();
    }
  };

  const showNewToast = () => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: newId.toString(),
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast
            nativeID={uniqueToastId}
            className="bg-card shadow-hard-2 w-full max-w-96.5 flex-row gap-3 bg-white p-4 sm:min-w-96.5"
          >
            {/* <ToastTitle>Hello!</ToastTitle> */}
            <ToastDescription>
              {color.length === 0 &&
                `Please select color.${size.length === 0 && "\n"}`}
              {size.length === 0 && "Please select size."}
            </ToastDescription>
          </Toast>
        );
      },
    });
  };

  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);

  const handleConfirm = () => {
    const newItems: CartItem[] = selectedColors.map((color) => ({
      cartId: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      colorId: color.id,
      colorName: color.name,
      sizes: selectedSizes.map((size) => ({
        sizeId: size.id,
        sizeName: size.name,
        quantity,
      })),
    }));

    setCartItems((prev) => {
      const updated = [...prev];

      newItems.forEach((newItem) => {
        const existingColor = updated.find(
          (item) => item.colorId === newItem.colorId,
        );

        if (existingColor) {
          const updatedSizes = [...existingColor.sizes];

          newItem.sizes.forEach((newSize) => {
            const existingSize = updatedSizes.find(
              (item) => item.sizeId === newSize.sizeId,
            );

            if (existingSize) {
              existingSize.quantity += newSize.quantity;
            } else {
              updatedSizes.push(newSize);
            }
          });

          existingColor.sizes = updatedSizes;
        } else {
          updated.push(newItem);
        }
      });

      return updated;
    });

    setShowActionsheet(false);
    setColor([]);
    setSize([]);
    setQuantity(1);
  };

  const handleDeleteCartItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const selectedColors =
    product?.colors.filter((item) => color.includes(item.id)) ?? [];

  const selectedSizes =
    product?.sizes.filter((item) => size.includes(item.id)) ?? [];

  return (
    <VStack className="flex-1 bg-white pb-3" space="sm">
      <ViewPager />
      <ScrollView>
        <VStack space="sm" className="px-4">
          <HStack className="items-center justify-between">
            <HStack className="items-center" space="sm">
              <Text className="font-bold text-gray-500">{product?.brand}</Text>
              <Icon as={Star} color="orange" size="sm" />
              <Text className="text-gray-500">{product?.star}</Text>
              <Text className="text-gray-400">({product?.quantity})</Text>
            </HStack>
            <Icon
              as={FavouriteIcon}
              className={`${product?.users.find((item) => item.id === product.id) ? "fill-red-500" : ""} text-red-500`}
            />
          </HStack>
          <Text numberOfLines={1}>{product?.title}</Text>
          <HStack space="md">
            <Text className="text-green-500">${product?.price}</Text>
            <Text className="line-through">
              {product?.discount ? `$${product?.discount}` : ""}
            </Text>
          </HStack>
          <Box>
            <Text numberOfLines={seeMore ? undefined : 3}>
              {product?.description}
            </Text>
            <Pressable onPress={() => setSeeMore(!seeMore)}>
              <Text italic>{`${seeMore ? "See less" : "See more"}`}</Text>
            </Pressable>
          </Box>
          <VStack space="md">
            <Box>
              <Text size="sm" className="mb-3">
                Choose Color
              </Text>
              <HStack space="md">
                {product?.colors
                  .filter((item) => item.stock)
                  .map((item) => (
                    <Checkbox
                      key={item.id}
                      isDisabled={!item.stock}
                      value={item.id.toString()}
                      isChecked={color.includes(item.id)}
                      onChange={(checked) => {
                        setColor((prev) =>
                          checked
                            ? [...prev, item.id]
                            : prev.filter((id) => id !== item.id),
                        );
                      }}
                    >
                      <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel>{item.name}</CheckboxLabel>
                    </Checkbox>
                  ))}
              </HStack>
            </Box>
            <Box>
              <Text size="sm" className="mb-3">
                Choose Size
              </Text>
              <HStack space="md">
                {product?.sizes
                  .filter((item) => item.stock)
                  .map((item) => (
                    <Checkbox
                      key={item.id}
                      isDisabled={!item.stock}
                      value={item.id.toString()}
                      isChecked={size.includes(item.id)}
                      onChange={(checked) => {
                        setSize((prev) =>
                          checked
                            ? [...prev, item.id]
                            : prev.filter((id) => id !== item.id),
                        );
                      }}
                    >
                      <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel>{item.name}</CheckboxLabel>
                    </Checkbox>
                  ))}
              </HStack>
            </Box>
          </VStack>
          <Button
            variant="default"
            size="default"
            className="my-2 w-2/5 bg-sky-500"
            onPress={() => {
              if (color.length === 0 || size.length === 0) {
                handleToast();
              } else {
                setShowActionsheet(true);
              }
            }}
          >
            <ButtonText className="text-white ">Set quantity</ButtonText>
          </Button>
          {cartItems.flatMap((item) =>
            item.sizes.map((size) => (
              <HStack
                key={`${item.cartId}-${size.sizeId}`}
                className="bg-blue-50 py-2 px-3 justify-between items-center rounded-sm"
              >
                <HStack space="lg" className="items-center">
                  <Icon as={Plus} className="text-gray-500" />
                  <Text className="text-gray-500">
                    {item.colorName} - {size.sizeName} ({size.quantity})
                  </Text>
                </HStack>
                <Pressable
                  onPress={() => {
                    setCartItems((prev) =>
                      prev
                        .map((cart) =>
                          cart.cartId === item.cartId
                            ? {
                                ...cart,
                                sizes: cart.sizes.filter(
                                  (s) => s.sizeId !== size.sizeId,
                                ),
                              }
                            : cart,
                        )
                        .filter((cart) => cart.sizes.length > 0),
                    );
                  }}
                >
                  <Icon as={CircleX} className="text-gray-500" />
                </Pressable>
              </HStack>
            )),
          )}
        </VStack>
      </ScrollView>
      <Fab
        size="sm"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={() => router.navigate("/cart")}
        className="bg-green-500"
      >
        <FabIcon as={ShoppingCartPlus} className=" text-white" />
        <FabLabel className=" text-white">Add to cart</FabLabel>
      </Fab>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop className="bg-black/50" />

        <ActionsheetContent className="bg-white ">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator className="bg-gray-400 w-2/15 mb-3 h-2" />
          </ActionsheetDragIndicatorWrapper>

          <VStack space="md" className="w-full ">
            <VStack space="lg">
              <Box>
                <Text size="sm" className="text-center">
                  Your chose colors and sizes
                </Text>
                <Text size="sm" className="text-center">
                  {selectedColors.map((item) => item.name).join(", ")}
                  {" - "}
                  {selectedSizes.map((item) => item.name).join(", ")}
                </Text>
              </Box>
              <Box>
                <Text size="sm" className="text-center">
                  Please set quantity
                </Text>
                <Text
                  size="2xl"
                  className="text-center font-bold text-gray-600"
                >
                  {quantity}
                </Text>
              </Box>
            </VStack>
            <HStack space="md">
              <Button
                className="bg-sky-500 flex-1"
                onPress={() => setQuantity((prev) => prev + 1)}
              >
                <ButtonText className="text-white">Increase +</ButtonText>
              </Button>

              <Button
                className="bg-sky-500 flex-1"
                onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <ButtonText className="text-white">Decrease -</ButtonText>
              </Button>
            </HStack>
            <VStack space="sm">
              <Button className="bg-green-500" onPress={() => handleConfirm()}>
                <ButtonText className=" text-white">Confirm</ButtonText>
              </Button>
              <Button className="bg-gray-700 " onPress={handleClose}>
                <ButtonText className=" text-white">Cancel</ButtonText>
              </Button>
            </VStack>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </VStack>
  );
}
