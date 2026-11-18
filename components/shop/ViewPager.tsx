import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Image } from "expo-image";
import { useRef } from "react";
import { Animated, View } from "react-native";
import PagerView, {
  type PagerViewOnPageScrollEventData,
} from "react-native-pager-view";

const IMAGES = [
  require("@/data/shop/pager1.png"),
  require("@/data/shop/pager2.png"),
  require("@/data/shop/pager3.png"),
  require("@/data/shop/pager4.png"),
];

const SLOT = 24; // width of each dot's slot
const DOT = 8; // small dot
const RING = 16; // moving indicator

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

function Pagination({ progress }: { progress: Animated.AnimatedAddition }) {
  // progress = position + offset  ->  slide the ring by one slot per page
  const translateX = Animated.multiply(progress, SLOT);

  return (
    <Box className="absolute bottom-3 w-full items-center">
      <HStack style={{ height: SLOT }}>
        <Animated.View
          style={{
            position: "absolute",
            top: (SLOT - RING) / 2,
            left: (SLOT - RING) / 2,
            width: RING,
            height: RING,
            borderRadius: RING / 2,
            borderWidth: 1,
            borderColor: "#fff",
            transform: [{ translateX }],
          }}
        />
        {IMAGES.map((_, i) => (
          <Box
            key={i}
            className="items-center justify-center"
            style={{ width: SLOT }}
          >
            <Box
              className="bg-sky-300"
              style={{ width: DOT, height: DOT, borderRadius: DOT / 2 }}
            />
          </Box>
        ))}
      </HStack>
    </Box>
  );
}

export default function ViewPager() {
  const position = useRef(new Animated.Value(0)).current;
  const offset = useRef(new Animated.Value(0)).current;
  const progress = useRef(Animated.add(position, offset)).current;

  const onPageScroll = useRef(
    Animated.event<PagerViewOnPageScrollEventData>(
      [{ nativeEvent: { position, offset } }],
      { useNativeDriver: true },
    ),
  ).current;

  return (
    <Box style={{ width: "100%", aspectRatio: 16 / 9 }}>
      <AnimatedPagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageScroll={onPageScroll}
      >
        {IMAGES.map((source, i) => (
          <View key={i} collapsable={false} style={{ flex: 1 }}>
            <Image
              source={source}
              alt={`Slide ${i + 1}`}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        ))}
      </AnimatedPagerView>
      <Pagination progress={progress} />
    </Box>
  );
}
