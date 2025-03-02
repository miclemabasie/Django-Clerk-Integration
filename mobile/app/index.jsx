import { Text, View } from "react-native";
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import AuthScreen from './screens/AuthScreen';
import MainApp from './screens/MainApp';

export default function Index() {
  console.log('cleark', SignedIn)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      >
      <Text>Content</Text>
      {/* <SignedIn>
        <Text>Logged in</Text>
        <MainApp />
      </SignedIn>
      <SignedOut>
        <Text>Logged Out</Text>
        <AuthScreen />
      </SignedOut> */}

    </View>
  );
}
