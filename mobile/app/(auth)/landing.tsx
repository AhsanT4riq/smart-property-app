// app/(auth)/landing.tsx
import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useGoogleSigin } from "@/hooks/useGoogleSigin";
import { useClerk } from "@clerk/clerk-expo";

// We'll use these images for our landing page
const IMAGES = [
  "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
];

export default function LandingScreen() {
  const insets = useSafeAreaInsets();
  const { onPress } = useGoogleSigin();

  return (
    <View className="flex-1">
      <ImageBackground
        source={{ uri: IMAGES[0] }}
        className="flex-1"
        resizeMode="cover"
      >
        {/* Solid overlay */}
        <View className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <Animated.View
          entering={FadeIn.duration(600)}
          className="flex-1 justify-between p-6"
          style={{ paddingBottom: insets.bottom + 20 }}
        >
          {/* Logo and App Name */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(600)}
            className="items-center mt-16"
          >
            <View className="w-24 h-24 rounded-xl bg-primary justify-center items-center mb-4">
              <Ionicons name="home" size={48} color="#FFFFFF" />
            </View>
            <Text className="text-4xl font-bold text-white text-center">
              Smart Property
            </Text>
            <Text className="text-xl text-white mt-2 text-center">
              Manage properties with ease
            </Text>
          </Animated.View>

          {/* Features */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(600)}
            className="mt-10"
          >
            <View className="flex-row items-center mb-8">
              <View className="w-14 h-14 rounded-full bg-primary justify-center items-center mr-4">
                <Ionicons name="home-outline" size={24} color="#FFFFFF" />
              </View>
              <Text className="text-white font-medium text-lg flex-1">
                Manage all your properties in one place
              </Text>
            </View>

            <View className="flex-row items-center mb-8">
              <View className="w-14 h-14 rounded-full bg-primary justify-center items-center mr-4">
                <Ionicons name="construct-outline" size={24} color="#FFFFFF" />
              </View>
              <Text className="text-white font-medium text-lg flex-1">
                Track maintenance requests effortlessly
              </Text>
            </View>

            <View className="flex-row items-center mb-8">
              <View className="w-14 h-14 rounded-full bg-primary justify-center items-center mr-4">
                <Ionicons name="cash-outline" size={24} color="#FFFFFF" />
              </View>
              <Text className="text-white font-medium text-lg flex-1">
                Monitor rental income and expenses
              </Text>
            </View>
          </Animated.View>

          {/* Login Button */}
          <Animated.View
            entering={FadeInDown.delay(600).duration(600)}
            className="mt-10"
          >
            <TouchableOpacity
              className="bg-primary rounded-xl py-4 flex-row justify-center items-center"
              onPress={async () => {
                await onPress();
              }}
              activeOpacity={0.8}
            >
              <Ionicons
                name="logo-google"
                size={24}
                color="#ffffff"
                style={{ marginRight: 12 }}
              />
              <Text className="text-white text-lg font-semibold">
                Continue with Google
              </Text>
            </TouchableOpacity>

            <Text className="text-white text-center mt-4 text-sm">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </Text>
          </Animated.View>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}
