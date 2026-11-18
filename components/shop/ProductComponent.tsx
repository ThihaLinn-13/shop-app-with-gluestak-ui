import { ProductType } from "@/types/product";
import { Image } from "expo-image";
import { Text } from "../ui/text";

import { useRouter } from "expo-router";
import { Star } from "lucide-react-native";
import { HStack } from "../ui/hstack";
import { FavouriteIcon, Icon } from "../ui/icon";
import { Pressable } from "../ui/pressable";
import { VStack } from "../ui/vstack";
import { memo } from "react";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

function ProductComponent({
  image,
  users,
  id,
  brand,
  star,
  quantity,
  price,
  discount,
  title,
}: ProductType) {
  const router = useRouter();

  return (
    <VStack className="gap-0.5">
      <Pressable
        className="aspect-3/5 w-full rounded-full"
        onPress={() => {
          router.navigate({ pathname: "/detail", params: { id: id } });
        }}
      >
        <Image
          source={image}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
          placeholder={blurhash}
          style={{ flex: 1 }}
        />
      </Pressable>
      <Pressable className="absolute top-4 right-4 rounded-full bg-gray-200 p-2">
        <Icon
          as={FavouriteIcon}
          size={"md"}
          className={`${users.find((user) => user.id === id) ? "fill-red-600" : ""} text-red-600`}
        />
      </Pressable>
      <HStack className="items-center" space="sm">
        <Text className="font-bold text-gray-500">{brand}</Text>
        <Icon as={Star} color="orange" size="sm" />
        <Text className="text-gray-500">{star}</Text>
        <Text className="text-gray-400">({quantity})</Text>
      </HStack>
      <Text numberOfLines={1}>{title}</Text>
      <HStack space="md">
        <Text className="text-green-500">${price}</Text>
        <Text className="line-through">{discount ? `$${discount}` : ""}</Text>
      </HStack>
    </VStack>
  );
}

export default memo(ProductComponent);
