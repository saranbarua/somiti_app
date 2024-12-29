import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-white h-screen">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-6">
          <Text className="text-xl text-center uppercase font-rubik text-black-200">
            বৃহত্তর চট্টগ্রাম সমিতিতে আপনাকে স্বাগতম
          </Text>

          <Text className="text-2xl font-rubik-bold text-black-300 text-center mt-2">
            আঁরা বেয়াগ্গুন চাটগাঁইয়া ভাই ভাই {"\n"}
          </Text>

          <TouchableOpacity className="bg-primary-100 shadow-md shadow-zinc-300 rounded-full w-full py-4 my-5">
            <Text className="text-lg font-rubik-medium text-center text-white">
              Continue with Mobile Number
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
