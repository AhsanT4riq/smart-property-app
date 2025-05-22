// app/(auth)/_layout.tsx
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function AuthLayout() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return <Redirect href="/(main)/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
        animation: "slide_from_right",
      }}
    />
  );
}
