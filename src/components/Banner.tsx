import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from '../styles/global';

export function Banner() {
  return (

    <LinearGradient colors={['#2c0303', '#770808', '#cc0104']}>
      <View style={styles.banner} />
    </LinearGradient>
  );
}