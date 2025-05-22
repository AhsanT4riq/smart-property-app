// app/(tabs)/index.tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp, FadeInRight } from "react-native-reanimated";

// Mock data for recent activities
const recentActivities = [
  {
    id: "1",
    type: "payment",
    title: "Rent payment received",
    description: "Downtown Apartment - $2,500",
    time: "2 hours ago",
    icon: "cash-outline",
    iconBg: "#d1fae5",
    iconColor: "#10b981",
  },
  {
    id: "2",
    type: "maintenance",
    title: "New maintenance request",
    description: "Leaking faucet - Beachside Studio",
    time: "Yesterday",
    icon: "construct-outline",
    iconBg: "#dbeafe",
    iconColor: "#3b82f6",
  },
  {
    id: "3",
    type: "lease",
    title: "Lease expiring soon",
    description: "City View Loft - 15 days remaining",
    time: "2 days ago",
    icon: "calendar-outline",
    iconBg: "#fee2e2",
    iconColor: "#ef4444",
  },
];

// Mock data for properties
const properties = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    address: "123 Collins St, Melbourne",
    imageUrl:
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
    occupied: true,
  },
  {
    id: "2",
    title: "Beachside Studio",
    address: "78 Esplanade, St Kilda",
    imageUrl:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    occupied: true,
  },
  {
    id: "3",
    title: "City View Loft",
    address: "90 Elizabeth St, Melbourne",
    imageUrl:
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
    occupied: false,
  },
];

export default function DashboardScreen() {
  // Calculate summary statistics
  const totalProperties = properties.length;
  const occupiedProperties = properties.filter((p) => p.occupied).length;
  const occupancyRate =
    totalProperties > 0 ? (occupiedProperties / totalProperties) * 100 : 0;
  const monthlyIncome = 2500 + 1800; // Mock calculation based on occupied properties

  return (
    <SafeAreaView edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-2 pb-4">
          <Animated.View
            entering={FadeInUp.delay(100).duration(600)}
            className="flex-row justify-between items-center"
          >
            <View>
              <Text className="text-2xl font-bold text-gray-800">
                Dashboard
              </Text>
              <Text className="text-gray-500">Monday, May 19, 2025</Text>
            </View>
            <TouchableOpacity
              className="w-10 h-10 bg-white rounded-full shadow-sm items-center justify-center"
              onPress={() => router.push("/+not-found")}
            >
              <View className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#0077B6"
              />
            </TouchableOpacity>
          </Animated.View>

          {/* Summary Statistics Cards */}
          <View className="mt-6">
            <Animated.View
              entering={FadeInUp.delay(150).duration(600)}
              className="bg-white rounded-xl shadow-sm p-4 mb-4"
            >
              <Text className="text-gray-500 mb-1">Total Monthly Income</Text>
              <Text className="text-3xl font-bold text-blue-500">
                ${monthlyIncome}
              </Text>
              <View className="w-full h-1 bg-gray-100 rounded-full mt-3">
                <View
                  className="h-1 bg-blue-500 rounded-full"
                  style={{ width: `${occupancyRate}%` }}
                />
              </View>
              <Text className="text-gray-500 text-xs mt-1">
                {occupancyRate.toFixed(0)}% occupancy rate
              </Text>
            </Animated.View>

            <View className="flex-row justify-between">
              <Animated.View
                entering={FadeInUp.delay(200).duration(600)}
                className="bg-white rounded-xl shadow-sm p-4 w-[48%]"
              >
                <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mb-2">
                  <Ionicons name="home-outline" size={18} color="#0077B6" />
                </View>
                <Text className="text-gray-500 mb-1">Properties</Text>
                <Text className="text-2xl font-bold text-gray-800">
                  {totalProperties}
                </Text>
                <Text className="text-gray-500 text-xs">
                  {occupiedProperties} occupied
                </Text>
              </Animated.View>

              <Animated.View
                entering={FadeInUp.delay(250).duration(600)}
                className="bg-white rounded-xl shadow-sm p-4 w-[48%]"
              >
                <View className="w-10 h-10 bg-amber-50 rounded-full items-center justify-center mb-2">
                  <Ionicons
                    name="construct-outline"
                    size={18}
                    color="#F59E0B"
                  />
                </View>
                <Text className="text-gray-500 mb-1">Maintenance</Text>
                <Text className="text-2xl font-bold text-gray-800">2</Text>
                <Text className="text-gray-500 text-xs">1 urgent</Text>
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Recent Activity Section */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(600)}
          className="mt-2 px-6"
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">
              Recent Activity
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>

          {recentActivities.map((activity, index) => (
            <Animated.View
              key={activity.id}
              entering={FadeInRight.delay(350 + index * 50).duration(600)}
              className="bg-white rounded-xl shadow-sm p-4 mb-3"
            >
              <View className="flex-row">
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: activity.iconBg }}
                >
                  <Ionicons
                    name={activity.icon}
                    size={20}
                    color={activity.iconColor}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-gray-800">
                    {activity.title}
                  </Text>
                  <Text className="text-gray-500">{activity.description}</Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    {activity.time}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
              </View>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Properties Section */}
        <Animated.View
          entering={FadeInUp.delay(600).duration(600)}
          className="mt-4 pb-12"
        >
          <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className="text-lg font-bold text-gray-800">
              Your Properties
            </Text>
            <TouchableOpacity onPress={() => router.push("/properties")}>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 24 }}
            className="pb-2"
          >
            {properties.map((property, index) => (
              <Animated.View
                key={property.id}
                entering={FadeInRight.delay(650 + index * 50).duration(600)}
                className="mr-4"
              >
                <TouchableOpacity
                  className="bg-white rounded-xl shadow-sm overflow-hidden w-60"
                  onPress={() => router.push(`/property/${property.id}`)}
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: property.imageUrl }}
                    className="w-full h-32"
                    resizeMode="cover"
                  />
                  <View className="absolute top-2 right-2 bg-white rounded-full px-2 py-1">
                    <Text
                      className={
                        property.occupied
                          ? "text-green-600 text-xs font-medium"
                          : "text-blue-600 text-xs font-medium"
                      }
                    >
                      {property.occupied ? "Occupied" : "Available"}
                    </Text>
                  </View>
                  <View className="p-3">
                    <Text
                      className="text-base font-bold text-gray-800"
                      numberOfLines={1}
                    >
                      {property.title}
                    </Text>
                    <Text className="text-gray-500 text-sm" numberOfLines={1}>
                      {property.address}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}

            <Animated.View
              entering={FadeInRight.delay(800).duration(600)}
              className="mr-4"
            >
              <TouchableOpacity
                className="bg-blue-50 rounded-xl shadow-sm overflow-hidden w-60 h-32 justify-center items-center mt-16"
                onPress={() => router.push("/property/add")}
                activeOpacity={0.7}
              >
                <View className="w-14 h-14 bg-blue-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="add" size={30} color="#0077B6" />
                </View>
                <Text className="text-blue-500 font-medium">Add Property</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
