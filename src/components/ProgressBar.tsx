import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  BounceIn,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

import { styles } from '../styles/global';

const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity);

interface ProgressBarProps {
  value: number;
  onMoveTop: () => void;
}

export function ProgressBar({ value, onMoveTop }: ProgressBarProps) {
  const widthContainer = useSharedValue(200);

  const endReached = value >= 95;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: widthContainer.value
    }
  });

  useEffect(() => {
    widthContainer.value = withSpring(endReached ? 56 : 200, { mass: 0.4 });
  }, [value]);

  return (
    <Animated.View style={[styles.progressBarContainer, animatedStyle]}>
      {
        endReached ?
        <TouchableOpacityAnimated
          entering={BounceIn}
          exiting={FadeOut}
          onPress={onMoveTop}
        >
          <Feather name="arrow-up" size={24} color="#C4C4CC" />
        </TouchableOpacityAnimated>
        :
        <Animated.View
          style={styles.progressContent}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Text style={styles.value}>
            {value.toFixed(0)}%
          </Text>

          <View style={styles.tracker}>
            <View style={[styles.progressBar, {width: `${value}%` }]} />
          </View>
        </Animated.View>
      }
    </Animated.View>
  );
}