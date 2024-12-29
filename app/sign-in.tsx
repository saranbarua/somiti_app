import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";

const SignIn = () => {
  return (
    <View className="bg-white h-full flex-1">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-6">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            বৃহত্তর চট্টগ্রাম সমিতিতে আপনাকে স্বাগতম
          </Text>

          <Text className="text-2xl font-rubik-bold text-black-300 text-center mt-2">
            আঁরা বেয়াগ্গুন চাটগাঁইয়া ভাই ভাই {"\n"}
            <Text className="text-primary-300">
              চট্টগ্রাম সমিতি পূর্বাঞ্চল সৌদি আরব{" "}
            </Text>
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to চট্টগ্রাম সমিতি পূর্বাঞ্চল সৌদি আরব
          </Text>

          <TouchableOpacity className="bg-white  shadow-md shadow-zinc-300 rounded-full w-full py-4 my-5">
            <View className="flex flex-row items-center justify-center">
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Mobile Number
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
