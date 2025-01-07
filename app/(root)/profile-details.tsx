import { useMemberProfile } from "@/components/hooks/useProfile";
import React from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileDetails() {
  // const profile = {
  //   fullName: "John Doe",
  //   fathersName: "John SR",
  //   husbandsName: "",
  //   mothersName: "Jane Dain",
  //   dateOfBirth: "10/10/10",
  //   bloodGroup: "",
  //   mobileNumberBD: "01675654438",
  //   mobileNumberSA: "99125454546",
  //   permanentAddress: "Dhaka, Bangladesh",
  //   presentAddress: "Chattogram, Bangladesh",
  //   workAddress: "Riyad, Soudi Arabia",
  //   religion: "Islam",
  //   maritalStatus: "Married",
  //   nationalIDNo: "125446565689",
  //   refererName: "",
  //   isApproved: true,
  //   memberID: "BCSS-000002",
  // };
  const { profile, isLoading } = useMemberProfile();
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#007BFF" />
        <Text className="text-lg text-gray-700 mt-3">Loading profile...</Text>
      </View>
    );
  }
  if (!profile) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-red-500">
          Unable to load profile details. Please try again later.
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" bg-gray-100 p-5">
          <Text className="text-2xl font-bold text-primary-100 mb-5">
            {profile?.fullName}
          </Text>

          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">Father's Name</Text>
            <Text className="text-gray-900 font-bold">
              {profile?.fathersName}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">Mother's Name</Text>
            <Text className="text-gray-900 font-bold">
              {profile?.mothersName}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">Husband's Name</Text>
            <Text className="text-gray-900 font-bold">
              {profile?.husbandsName || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">Date of Birth</Text>
            <Text className="text-gray-900 font-bold">
              {profile?.dateOfBirth || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">Blood Group</Text>
            <Text className="text-gray-900 font-bold">
              {profile?.bloodGroup || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">
              Bangladeshi MobileNo
            </Text>
            <Text className="text-gray-900 font-bold">
              {profile?.mobileNumberBD || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">
              Saudi Mobile Number
            </Text>
            <Text className="text-gray-900 font-bold">
              {profile?.mobileNumberSA || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">Permanent Address</Text>
            <Text className="text-gray-900 font-bold">
              {profile?.permanentAddress || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">Present Address</Text>
            <Text className="text-gray-900 font-bold">
              {profile?.presentAddress || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">Work Address</Text>
            <Text className="text-gray-900 font-bold">
              {profile?.workAddress || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">Religion</Text>
            <Text className="text-gray-900 font-bold">
              {profile?.religion || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">Marital Status</Text>
            <Text className="text-gray-900 font-bold">
              {profile?.maritalStatus || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">National ID No</Text>
            <Text className="text-gray-900 font-bold">
              {profile?.nationalIDNo || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">Referer Name</Text>
            <Text className="text-gray-900 font-bold">
              {profile?.refererName || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <Text className="text-gray-700 font-medium">Approval Status</Text>
            <Text
              className={`font-bold ${
                profile?.isApproved === true ? "text-green-600" : "text-red-600"
              }`}
            >
              {profile?.isApproved === true ? "Approved" : "Not Approved"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
