// app/maintenance/[id].tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function MaintenanceDetailScreen() {
  const { id } = useLocalSearchParams();

  // In a real app, you would fetch maintenance details based on the id
  const request = {
    id: id,
    title: "Leaking Faucet in Kitchen",
    propertyId: "1",
    propertyName: "Modern Downtown Apartment",
    propertyAddress: "123 Collins St, Melbourne",
    status: "new",
    priority: "medium",
    createdAt: "2025-05-15T10:30:00Z",
    description:
      "The kitchen sink faucet has been leaking steadily for the past two days. Water is pooling under the sink and causing damage.",
  };

  const statusColors = {
    new: "bg-blue-100 text-blue-800",
    "in-progress": "bg-amber-100 text-amber-800",
    completed: "bg-green-100 text-green-800",
  };

  const statusText = {
    new: "New",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  const formattedDate = new Date(request.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: request.title,
          headerTintColor: "#007AF",
          headerBackTitle: "Back",
        }}
      />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          {/* Request Info Card */}
          <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-xl font-bold text-gray-800 flex-1">
                {request.title}
              </Text>
              <View
                className={`rounded-full px-2 py-1 ${
                  statusColors[request.status]
                }`}
              >
                <Text className="text-xs font-medium">
                  {statusText[request.status]}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-2">
              <Ionicons name="home-outline" size={16} color="#64748B" />
              <Text className="text-gray-700 ml-1">{request.propertyName}</Text>
            </View>

            <View className="flex-row items-center mb-2">
              <Ionicons name="location-outline" size={16} color="#64748B" />
              <Text className="text-gray-700 ml-1">
                {request.propertyAddress}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={16} color="#64748B" />
              <Text className="text-gray-600 text-sm ml-1">
                {formattedDate}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              Description
            </Text>
            <Text className="text-gray-700">{request.description}</Text>
          </View>

          {/* Status Actions */}
          <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              Update Status
            </Text>
            <View className="flex-row flex-wrap">
              <TouchableOpacity
                className={`px-4 py-2 rounded-lg mr-2 mb-2 ${
                  request.status === "new"
                    ? "bg-blue-100 border border-blue-300"
                    : "bg-gray-100 border border-gray-200"
                }`}
              >
                <Text
                  className={`font-medium ${
                    request.status === "new" ? "text-blue-800" : "text-gray-700"
                  }`}
                >
                  New
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`px-4 py-2 rounded-lg mr-2 mb-2 ${
                  request.status === "in-progress"
                    ? "bg-amber-100 border border-amber-300"
                    : "bg-gray-100 border border-gray-200"
                }`}
              >
                <Text
                  className={`font-medium ${
                    request.status === "in-progress"
                      ? "text-amber-800"
                      : "text-gray-700"
                  }`}
                >
                  In Progress
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`px-4 py-2 rounded-lg mr-2 mb-2 ${
                  request.status === "completed"
                    ? "bg-green-100 border border-green-300"
                    : "bg-gray-100 border border-gray-200"
                }`}
              >
                <Text
                  className={`font-medium ${
                    request.status === "completed"
                      ? "text-green-800"
                      : "text-gray-700"
                  }`}
                >
                  Completed
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="flex-1 mr-2 bg-white border border-primary p-3 rounded-lg flex-row items-center justify-center">
              <Ionicons name="create-outline" size={20} color="#0077B6" />
              <Text className="text-primary ml-2 font-medium">
                Edit Request
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 ml-2 bg-primary p-3 rounded-lg flex-row items-center justify-center">
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="#FFFFFF"
              />
              <Text className="text-white ml-2 font-medium">
                Mark Completed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
