import { Stack } from "expo-router";
import { useFonts, useFronts } from "expo-font"

export default function RootLayout() {

  const [loaded] = useFonts({
    "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf")
  })
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="login/index" />
      <Stack.Screen name="home/index" />
    </Stack>
  );
}
