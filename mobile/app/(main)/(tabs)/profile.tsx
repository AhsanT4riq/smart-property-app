// app/(tabs)/profile.tsx
import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useClerk } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { signOut } = useClerk();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
    } catch (error) {
      console.error("Failed to sign out", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {isLoggingOut ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0077B6" />
          <Text className="text-gray-600 font-medium mt-4">Signing out...</Text>
        </View>
      ) : (
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-6">Profile</Text>

          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center">
              <Ionicons name="person" size={40} color="#64748B" />
            </View>
            <Text className="text-xl font-bold mt-2">Ahsan Tariq</Text>
            <Text className="text-gray-500">ahsan_work@outlook.com</Text>
          </View>

          <View className="bg-white rounded-lg shadow-sm">
            <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center">
              <Ionicons
                name="person-circle-outline"
                size={24}
                color="#0077B6"
              />
              <Text className="text-gray-800 ml-3">Profile Settings</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#64748B"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>

            <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center">
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#0077B6"
              />
              <Text className="text-gray-800 ml-3">Notifications</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#64748B"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>

            <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center">
              <Ionicons name="shield-outline" size={24} color="#0077B6" />
              <Text className="text-gray-800 ml-3">Security</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#64748B"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>

            <TouchableOpacity className="p-4 flex-row items-center">
              <Ionicons name="help-circle-outline" size={24} color="#0077B6" />
              <Text className="text-gray-800 ml-3">Help & Support</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#64748B"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-white p-4 rounded-lg shadow-sm mt-4 flex-row items-center "
          >
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
            <Text className="text-red-500 ml-3 font-medium">Log Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
