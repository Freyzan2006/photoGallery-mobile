import { View, Text, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withRepeat, 
  withSequence,
  withTiming,
  useSharedValue,
  withDelay
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColor } from '@/shared/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export const Logo = () => {
  const textColor = useThemeColor({}, 'text');
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSequence(
      withSpring(0.9),
      withSpring(1.1),
      withSpring(1)
    );
    rotation.value = withSequence(
      withTiming(-10, { duration: 100 }),
      withDelay(100, withTiming(10, { duration: 100 })),
      withTiming(0, { duration: 100 })
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    ),
  }));

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[animatedStyle]}>
        <BlurView intensity={20} tint="light" className="overflow-hidden rounded-2xl">
          <LinearGradient
            colors={['#11326C', '#2563eb', '#11326C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-4 rounded-2xl"
          >
            <View className="flex-row items-center">
              <Animated.View style={[glowStyle]} className="mr-3">
                <View className="bg-white/20 p-2 rounded-xl">
                  <Ionicons name="images" size={32} color="#fff" />
                </View>
              </Animated.View>
              <View>
                <Text className="text-white text-xl font-bold tracking-wide">
                  PhotoGallery
                </Text>
                <Text className="text-white/70 text-xs mt-1">
                  Discover amazing photos
                </Text>
              </View>
            </View>
          </LinearGradient>
        </BlurView>
      </Animated.View>
    </Pressable>
  );
};