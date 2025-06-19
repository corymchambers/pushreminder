import { usePush } from '@/hooks/usePush';
import Galaxies from '@/modules/galaxies';
import * as Notifications from 'expo-notifications';
import { Link, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { useRevenueCat } from '@/providers/RevenueCatProvider';

export default function Index() {
  const { registerForPushNotificationsAsync } = usePush();
  const [expoPushToken, setExpoPushToken] = useState('');

  const notificationListener = useRef<Notifications.EventSubscription>(null);
  const responseListener = useRef<Notifications.EventSubscription>(null);

  const router = useRouter();
  // const { goPro, isPro } = useRevenueCat();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log('Push notification token:', token);
        if (token) {
          setExpoPushToken(token);
        }
      })
      .catch((error) => {
        console.error('Error registering for push notifications:', error);
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log('Notification received:', notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification response received:', response);
        router.push(`/${response.notification.request.content.data.pageid}`);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{Galaxies.hello()}</Text>
      <Text>{Galaxies.PI}</Text>
      {/* <Text>{JSON.stringify(Galaxies.getDeviceInfo())}</Text> */}
      <Text>Token:{expoPushToken}</Text>
      <Link href="/42" asChild>
        <Text>Go to page 42</Text>
      </Link>
      {/* <Text>Is pro: {isPro ? 'Yes' : 'No'}</Text> */}
      {/* <Button title="Go Pro" onPress={() => goPro!()} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
});
