import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";
import images from "@/constants/images";
import { router } from "expo-router";
import useAuthStore from "@/store/authStore";
import { useState } from "react";

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

        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              // source={{ uri: user?.avatar }}
              source={images.avatar}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">Saran Barua</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
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
