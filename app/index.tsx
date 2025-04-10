import Calculator from "@/Components/Calculator";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "Calculator" }} />
      <Calculator />
    </>
  );
}
