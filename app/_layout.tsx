import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold : require('../assets/fonts/Poppins-Bold.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName='HomeScreen'>
        <Stack.Screen name='index' options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='GameScreen' options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='HomeScreen' options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='GameOver' options={{headerShown:false}}></Stack.Screen>
      </Stack>
    </ThemeProvider>
  );
}
