import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="profilePage" options={{ headerShown: false }} />
      <Stack.Screen name="admin" options={{ presentation: 'card', animation: 'slide_from_right', headerShown: false }} />
    </Stack>
  );
}