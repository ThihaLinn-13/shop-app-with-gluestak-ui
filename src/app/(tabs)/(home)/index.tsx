import CartComponent from "@/components/shop/CartComponent";
import CategoryComponent from "@/components/shop/CategoryComponent";
import ProductComponent from "@/components/shop/ProductComponent";
import Title from "@/components/shop/TitleComponent";
import { Box } from "@/components/ui/box";
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { categories, products } from "@/data";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { MoveUpRight } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Home() {
  const insets = useSafeAreaInsets();
  const count = 22;

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  const screenWidth = Dimensions.get("screen").width;
  const numOfColumns =
    screenWidth < 600 ? 2 : screenWidth < 768 ? 3 : screenWidth < 1024 ? 4 : 5;
  const GAP = 8;
  return (
    <Box
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <VStack space="md" className="flex-1">
        {/* Header */}
        <HStack className="mt-2 -mb-2 items-center justify-between px-2">
          <Image
            source={require("@/assets/images/icon.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
            style={{ height: 32, width: 32 }}
          />
          <CartComponent></CartComponent>
        </HStack>
        {/* Scoll Section */}
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <VStack space="sm">
            <Box className="aspect-20/9 w-full flex-1">
              <Image
                source={require("@/data/shop/banner6.png")}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                style={{ flex: 1 }}
              />
            </Box>
            <VStack className="flex-1 px-5" space="lg">
              <VStack space="md">
                <Title title="Sort By Categoy" btnText="See All"></Title>
                <Box>
                  <FlashList
                    data={categories}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <Box>
                        <CategoryComponent
                          selectedCategoryId={selectedCategoryId}
                          setSelectedCategoryId={setSelectedCategoryId}
                          {...item}
                        ></CategoryComponent>
                      </Box>
                    )}
                  ></FlashList>
                </Box>
              </VStack>
              <VStack className="flex-1" space="md">
                <Title title="Recommended for you" btnText="See All"></Title>
                <Box className="flex-1">
                  <FlashList
                    numColumns={numOfColumns}
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      const col = index % numOfColumns;
                      const isFirst = col === 0;
                      const isLast = col === numOfColumns - 1;
                      return (
                        <Box
                          className={` ${isFirst ? "pr-2" : ""} ${isLast ? "pl-2" : ""} ${!isFirst && !isLast ? "px-2" : ""} pb-2`}
                        >
                          <ProductComponent {...item} />
                        </Box>
                      );
                    }}
                  ></FlashList>
                </Box>
              </VStack>
            </VStack>
            <ButtonGroup className="mb-4 flex justify-center">
              <Button variant="link" className="bg-green-400">
                <ButtonText className="font-bold text-white">
                  Expore more
                </ButtonText>
                <ButtonIcon
                  className="font-bold text-white"
                  as={MoveUpRight}
                ></ButtonIcon>
              </Button>
            </ButtonGroup>
          </VStack>
        </ScrollView>
      </VStack>
    </Box>
  );
}
