import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from '../cache'


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

export default function RootLayout() {

  return (

          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>

  );
}

{/* <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
      </ClerkLoaded>
    </ClerkProvider> */}





// import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
// import { tokenCache } from '@/cache';
// import { Stack } from 'expo-router';
// import { Provider } from 'react-redux';
// import { store } from '../redux/store';
// import { Text, View } from 'react-native';

// function AppContent() {
//   const { isLoaded } = useAuth();

//   if (!isLoaded) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Loading Clerk...</Text>
//       </View>
//     );
//   }

//   return <Stack />;
// }

// export default function RootLayout() {
//   const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) {
//     throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env');
//   }

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <ClerkLoaded>
//         <Provider store={store}>
//           <AppContent />
//         </Provider>
//       </ClerkLoaded>
//     </ClerkProvider>
//   );
// }