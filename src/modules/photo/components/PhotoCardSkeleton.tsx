

import { useThemeColor } from "@/shared/hooks/useThemeColor";
import { View } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming 
} from "react-native-reanimated";



// export const PhotoCardSkeleton = () => {
//   const animatedStyle = useAnimatedStyle(() => ({
//     opacity: withRepeat(
//       withSequence(
//         withTiming(0.5, { duration: 1000 }),
//         withTiming(1, { duration: 1000 })
//       ),
//       -1,
//       true
//     ),
//   }));

//   return (
//     <Animated.View style={animatedStyle}>
//       <View className="m-4 p-4 bg-white rounded-lg shadow-md">
//         {/* Скелетон для изображения */}
//         <View className="w-full h-40 rounded-lg bg-gray-200" />
        
//         {/* Скелетон для текста */}
//         <View className="mt-4 space-y-2">
//           <View className="h-4 bg-gray-200 rounded w-3/4" />
//           <View className="h-4 bg-gray-200 rounded w-1/2" />
//           <View className="h-4 bg-gray-200 rounded w-2/3" />
//         </View>
//       </View>
//     </Animated.View>
//   );
// };

export const PhotoCardSkeleton = () => {
  const backgroundColor = useThemeColor({}, 'cardBackground');
  const skeletonColor = useThemeColor({}, 'skeletonBackground');

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withTiming(0.5, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    ),
  }));

  return (
    <Animated.View style={[animatedStyle]}>
      <View className="m-4 p-4 rounded-lg shadow-md" style={{ backgroundColor }}>
        <View className="w-full h-40 rounded-lg" style={{ backgroundColor: skeletonColor }} />
        <View className="mt-4 space-y-2">
          <View className="h-4 rounded w-3/4" style={{ backgroundColor: skeletonColor }} />
          <View className="h-4 rounded w-1/2" style={{ backgroundColor: skeletonColor }} />
        </View>
      </View>
    </Animated.View>
  );
};