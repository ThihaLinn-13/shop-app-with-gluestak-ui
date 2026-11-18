import { ShoppingCart } from "lucide-react-native";
import { Badge, BadgeText } from "../ui/badge";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Pressable } from "../ui/pressable";

export default function CartComponent() {
  const notiCount = 22;
  return (
    <Pressable className="relative mr-1">
      <Badge className="absolute top-0 right-1 z-10 h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1">
        <BadgeText className="text-xs font-bold text-white">
          {notiCount > 99 ? "99+" : notiCount}
        </BadgeText>
      </Badge>

      <Button>
        <Icon as={ShoppingCart} size="lg" />
      </Button>
    </Pressable>
  );
}
