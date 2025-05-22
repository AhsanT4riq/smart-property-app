// app/property/[id].tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();

  // In a real app, you would fetch property details based on the id
  const property = {
    id: id,
    title: "Modern Downtown Apartment",
    address: "123 Collins St, Melbourne",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    area: 950,
    status: "available",
    description:
      "Luxurious apartment in the heart of Melbourne CBD with breathtaking views. Features modern amenities, spacious living areas, and is conveniently located near public transportation, restaurants, and shopping centers.",
    imageUrl:
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        {/* Property Image - Using a fallback gray box if image fails to load */}
        <View className="w-full h-64 bg-gray-200 justify-center items-center">
          {property.imageUrl ? (
            <Image
              source={{ uri: property.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="image-outline" size={64} color="#9CA3AF" />
          )}
        </View>

        {/* Property Details */}
        <View className="p-6">
          {/* Title and Status - Now as separate elements instead of row */}
          <Text className="text-3xl font-bold text-gray-800 mb-1">
            {property.title}
          </Text>

          {/* Address and Status in same row */}
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg text-gray-500">{property.address}</Text>
            <View className="bg-green-100 rounded-full px-3 py-1">
              <Text className="text-green-700 font-medium">Available</Text>
            </View>
          </View>

          <Text className="text-3xl font-bold text-blue-500 mb-6">
            ${property.price}/month
          </Text>

          {/* Property Specs */}
          <View className="flex-row justify-between mb-8">
            <View className="items-center">
              <View className="w-20 h-20 rounded-full bg-blue-50 items-center justify-center mb-2">
                <Ionicons name="bed-outline" size={28} color="#0077B6" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">
                {property.bedrooms}
              </Text>
              <Text className="text-gray-500">Bedrooms</Text>
            </View>

            <View className="items-center">
              <View className="w-20 h-20 rounded-full bg-blue-50 items-center justify-center mb-2">
                <Ionicons name="water-outline" size={28} color="#0077B6" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">
                {property.bathrooms}
              </Text>
              <Text className="text-gray-500">Bathrooms</Text>
            </View>

            <View className="items-center">
              <View className="w-20 h-20 rounded-full bg-blue-50 items-center justify-center mb-2">
                <Ionicons name="resize-outline" size={28} color="#0077B6" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">
                {property.area}
              </Text>
              <Text className="text-gray-500">Sq Ft</Text>
            </View>

            <View className="items-center">
              <View className="w-20 h-20 rounded-full bg-blue-50 items-center justify-center mb-2">
                <Ionicons name="calendar-outline" size={28} color="#0077B6" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">N/A</Text>
              <Text className="text-gray-500">Lease</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between mb-8">
            <TouchableOpacity
              className="flex-1 mr-2 border border-blue-500 rounded-lg py-3 px-4 flex-row items-center justify-center"
              onPress={() => router.push(`/property/${id}/edit`)}
            >
              <Ionicons
                name="create-outline"
                size={22}
                color="#0077B6"
                style={{ marginRight: 8 }}
              />
              <Text className="text-blue-500 font-medium text-lg">
                Edit Property
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 ml-2 bg-blue-500 rounded-lg py-3 px-4 flex-row items-center justify-center"
              onPress={() => router.push(`/property/${id}/add-tenant`)}
            >
              <Ionicons
                name="person-add-outline"
                size={22}
                color="#FFFFFF"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-medium text-lg">Add Tenant</Text>
            </TouchableOpacity>
          </View>

          {/* Description Section */}
          <View className="mb-8">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Description
            </Text>
            <Text className="text-gray-600 text-base leading-6">
              {property.description}
            </Text>
          </View>

          {/* Maintenance Request Button */}
          <TouchableOpacity
            className="bg-white border border-blue-500 rounded-lg py-3 px-4 flex-row items-center justify-center mb-10"
            onPress={() => router.push(`/maintenance/add?propertyId=${id}`)}
          >
            <Ionicons
              name="construct-outline"
              size={22}
              color="#0077B6"
              style={{ marginRight: 8 }}
            />
            <Text className="text-blue-500 font-medium text-lg">
              Create Maintenance Request
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
