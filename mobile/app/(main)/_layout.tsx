// app/(auth)/_layout.tsx
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function MainAppLayout() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/landing" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
