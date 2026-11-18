import { HStack } from "../ui/hstack";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";

type TitleProp = {
  title: string;
  btnText: string;
};

export default function Title({ title, btnText }: TitleProp) {
  return (
    <HStack className="justify-between">
      <Text size="sm" className="font-bold">
        {title}
      </Text>
      <Pressable>
        <Text size="xs" className="color-gray-400 font-bold">
          {btnText}
        </Text>
      </Pressable>
    </HStack>
  );
}
