import { Link, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link
        href={"/login"}
      >
      <Text>Go to login screen</Text>
      </Link>
    </View>
  );
}
