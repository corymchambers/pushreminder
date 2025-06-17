import Galaxies from '@/modules/galaxies';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>{Galaxies.hello()}</Text>
      <Text>{Galaxies.PI}</Text>
    </View>
  );
}
