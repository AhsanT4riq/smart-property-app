// app/(tabs)/properties.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Mock data for testing
const mockProperties = [
  { id: "1", title: "Downtown Apartment", address: "123 Main St, Melbourne" },
  { id: "2", title: "Beach House", address: "456 Ocean Ave, St Kilda" },
  { id: "3", title: "Modern Loft", address: "789 Smith St, Fitzroy" },
];
export default function PropertiesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-gray-800">Properties</Text>
          <TouchableOpacity
            className="bg-primary p-2 rounded-full"
            onPress={() => router.push("/property/add")}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerClassName="h-full"
          data={mockProperties}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white p-4 rounded-lg shadow-sm mb-3"
              onPress={() => router.push(`/property/${item.id}`)}
            >
              <Text className="text-lg font-bold text-gray-800">
                {item.title}
              </Text>
              <Text className="text-gray-500">{item.address}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
