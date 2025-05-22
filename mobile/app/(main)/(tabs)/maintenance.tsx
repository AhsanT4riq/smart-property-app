// app/(tabs)/maintenance.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Mock data for testing
const mockRequests = [
  {
    id: "1",
    title: "Leaking Faucet",
    property: "Downtown Apartment",
    status: "new",
  },
  {
    id: "2",
    title: "AC Not Working",
    property: "Beach House",
    status: "in-progress",
  },
];

export default function MaintenanceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-gray-800">Maintenance</Text>
          <TouchableOpacity
            className="bg-primary p-2 rounded-full"
            onPress={() => router.push("/(auth)/login")}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerClassName="h-full"
          data={mockRequests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white p-4 rounded-lg shadow-sm mb-3"
              onPress={() => router.push(`/maintenance/${item.id}`)}
            >
              <Text className="text-lg font-bold text-gray-800">
                {item.title}
              </Text>
              <Text className="text-gray-500">{item.property}</Text>
              <View className="bg-blue-100 self-start rounded-full px-2 py-1 mt-2">
                <Text className="text-blue-800 text-xs">
                  {item.status === "new" ? "New" : "In Progress"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
