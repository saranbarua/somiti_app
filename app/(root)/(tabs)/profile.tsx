import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Linking,
  ActivityIndicator,
} from "react-native";

import icons from "@/constants/icons";
import { router, useFocusEffect } from "expo-router";
import useAuthStore from "@/store/authStore";
import React, { useState } from "react";
import { useMemberProfile } from "@/components/hooks/useProfile";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { logout } = useAuthStore();
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state

  const onLogout = async () => {
    await logout();
    router.push("/sign-in"); // Redirect to sign-in page
  };

  const confirmLogout = () => {
    setIsModalVisible(false);
    onLogout();
  };

  const { profile, isLoading } = useMemberProfile();
  const profileImg = profile?.profileImg;

  //router for next page
  const handleSubscriptionsPress = () => {
    router.push("/home"); // Navigate to the Subscriptions page
  };
  const handleDetailsPress = () => {
    router.push("/(root)/profile-details");
  };
  const handleMembershipPress = () => {
    router.push("/(root)/membership");
  };
  const handleChangePassPress = () => {
    router.push("/(root)/change-password");
  };
  const handleWebPress = () => {
    const url = "https://ctgsomitidmm.com";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL", err)
    );
  };

  const { isAuthenticated } = useAuthStore();
  // Check if token exists and redirect to sign-in if not
  useFocusEffect(
    React.useCallback(() => {
      if (!isAuthenticated) {
        router.push(`/(auth)/sign-in`);
      }
    }, [isAuthenticated])
  );

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        {isLoading ? (
          <View className="flex-1 justify-center items-center mt-10">
            <ActivityIndicator size="large" className="text-primary-100" />
          </View>
        ) : (
          <View className="flex flex-row justify-center mt-5">
            <View className="flex flex-col items-center relative mt-5">
              <Image
                source={{
                  uri: `https://chattogram-somiti.makeupcoders.com${profileImg}`,
                }}
                className="size-44 relative rounded-full"
              />
              <Text className="text-2xl font-rubik-bold mt-2">
                {profile?.fullName}
              </Text>
            </View>
          </View>
        )}
        <View className="flex flex-col mt-10">
          <SettingsItem
            icon={icons.wallet}
            title="Subscriptions"
            onPress={handleSubscriptionsPress}
          />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            icon={icons.info}
            title="Profile Details"
            onPress={handleDetailsPress}
          />
          <SettingsItem
            icon={icons.shield}
            title="MemberShip Card"
            onPress={handleMembershipPress}
          />
          <SettingsItem
            icon={icons.google}
            title="Go to Website"
            onPress={handleWebPress}
          />
          <SettingsItem
            icon={icons.edit}
            title="Change Password"
            onPress={handleChangePassPress}
          />
        </View>

        <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={() => setIsModalVisible(true)} // Show modal on press
          />
        </View>
      </ScrollView>

      {/* Modal for logout confirmation */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black opacity-80">
          <View className="bg-white rounded-lg p-6 w-80">
            <Text className="text-lg font-rubik-semibold mb-4">
              Are you sure you want to logout?
            </Text>
            <View className="flex flex-row justify-between">
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="bg-gray-200 p-3 rounded-lg"
              >
                <Text className="text-lg font-rubik-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmLogout}
                className="bg-red-500 p-3 rounded-lg"
              >
                <Text className="text-lg font-rubik-medium text-white">
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
