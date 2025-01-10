import Button from "@/components/Button/Button";
import { useMemberProfile } from "@/components/hooks/useProfile";
import useAuthStore from "@/store/authStore";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileDetails() {
  const { token, checkAuth, logout, isAuthenticated } = useAuthStore();
  const { profile, isLoading } = useMemberProfile();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStepTwo, setIsStepTwo] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (!isAuthenticated) {
        router.push(`/(auth)/sign-in`);
      }
    }, [isAuthenticated])
  );

  //handle delete
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    await checkAuth();
    try {
      const response = await fetch(
        "https://chattogram-somiti.makeupcoders.com/api/member/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        Alert.alert(
          "Account Deleted",
          "Your account has been successfully deleted."
        );
        logout();
        router.push(`/(auth)/sign-in`);
      } else {
        Alert.alert("Error", "Failed to delete the account. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while deleting the account.");
    } finally {
      setIsDeleting(false);
      setIsModalVisible(false);
      setIsStepTwo(false);
    }
  };

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
          <Button
            title={"Delete Account"}
            className="mt-6"
            bgVariant="danger"
            onPress={() => setIsModalVisible(true)}
          />
        </View>
      </ScrollView>
      {/* Modal */}
      {isModalVisible && (
        <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white rounded-lg p-6 w-4/5">
            {isStepTwo ? (
              <>
                <Text className="text-lg font-bold mb-4 text-red-600">
                  Final Confirmation
                </Text>
                <Text className="text-gray-600 mb-6">
                  This action is irreversible. Are you absolutely sure you want
                  to delete your account?
                </Text>
                <View className="grid gap-2 justify-end">
                  <Button
                    title="Cancel"
                    bgVariant="secondary"
                    className="mr-3"
                    onPress={() => {
                      setIsModalVisible(false);
                      setIsStepTwo(false);
                    }}
                  />
                  <Button
                    title={isDeleting ? "Deleting..." : "Delete"}
                    bgVariant="danger"
                    onPress={handleDeleteAccount}
                    disabled={isDeleting}
                  />
                </View>
              </>
            ) : (
              <>
                <Text className="text-lg font-bold mb-4">
                  Are you sure you want to delete your account?
                </Text>
                <Text className="text-gray-600 mb-6">
                  You cannot retrieve or recover your data after deletion.
                </Text>
                <View className="grid gap-2 justify-end">
                  <Button
                    title="Cancel"
                    bgVariant="primary"
                    className="mr-3"
                    onPress={() => setIsModalVisible(false)}
                  />
                  <Button
                    title="Proceed"
                    bgVariant="success"
                    onPress={() => setIsStepTwo(true)}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
