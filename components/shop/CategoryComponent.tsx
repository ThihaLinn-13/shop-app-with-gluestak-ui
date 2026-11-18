import { Category } from "@/types/category";
import { Image } from "expo-image";
import { Box } from "../ui/box";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import { memo } from "react";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface CategoryProps extends Category {
  selectedCategoryId: number;
  setSelectedCategoryId: (id: number) => void;
}

function CategoryComponent({
  id,
  image,
  name,
  selectedCategoryId,
  setSelectedCategoryId,
}: CategoryProps) {
  return (
    <Pressable onPress={() => setSelectedCategoryId(id)}>
      <VStack className="mr-4 items-center gap-2">
        <Box
          className={`h-16 w-16 rounded-4xl border-2 ${
            selectedCategoryId === id
              ? "border-amber-400"
              : "border-transparent"
          }`}
        >
          <Image
            source={image}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
            placeholder={blurhash}
            style={{ flex: 1 }}
          />
        </Box>
        <Text className="text-sm">{name}</Text>
      </VStack>
    </Pressable>
  );
}

export default memo(CategoryComponent);
