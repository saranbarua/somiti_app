import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { ReactNativeModal } from "react-native-modal";

import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import PasswordInput from "@/components/InputField/PasswordInput";
import images from "@/constants/images";
import useAuthStore from "@/store/authStore";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    mobileNumber: "",
    password: "",
  });
  const { login, isAuthenticated } = useAuthStore();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isAuthenticated) {
        router.push(`/(root)/(tabs)/home`);
      }
    }, [isAuthenticated])
  );

  const onSignInPress = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://chattogram-somiti.makeupcoders.com/api/member/login",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      if (response.status === 200 && result.success) {
        login(result.token); // Update the auth state
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          router.push(`/(root)/(tabs)/home`);
        }, 1000);
      } else {
        Alert.alert("Error", result.message || "Invalid credentials");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Error",
          error.response?.data?.message ||
            "Unable to sign in. Please try again."
        );
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-3xl text-primary-100 font-rubik-Bangla text-center mb-8">
        চট্টগ্রাম সমিতি পূর্বাঞ্চল
      </Text>
      <Image
        source={images.SignInBanner}
        style={{ width: "100%", height: 200, resizeMode: "contain" }}
        className="mb-8"
      />

      <InputField
        label="Mobile Number"
        placeholder="Enter your mobile number"
        value={form.mobileNumber}
        onChangeText={(value: string) =>
          handleInputChange("mobileNumber", value)
        }
        keyboardType="phone-pad"
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={true}
        value={form.password}
        onChangeText={(value: string) => handleInputChange("password", value)}
      />
      <Button
        title={isLoading ? "Signing In..." : "Sign In"}
        onPress={onSignInPress}
        className="mt-6"
      />
      <TouchableOpacity
        onPress={() => setShowForgetPasswordModal(true)}
        className="mt-4"
      >
        <Text className="text-lg text-center text-danger font-rubik-semibold">
          Forget Password?
        </Text>
      </TouchableOpacity>
      <Link
        href="/sign-up"
        className="text-lg text-center text-general-200 mt-5"
      >
        Don’t have an account?{" "}
        <Text className="text-primary-100 font-rubik-semibold">Sign Up</Text>
      </Link>
      {/* Forget Password Modal */}
      <ReactNativeModal
        isVisible={showForgetPasswordModal}
        onBackdropPress={() => setShowForgetPasswordModal(false)}
      >
        <View className="bg-white px-7 py-9 rounded-2xl">
          <Text className="text-2xl font-JakartaBold text-center mb-4">
            Forgot Your Password?
          </Text>
          <Text className="text-base text-gray-500 font-Jakarta text-center mb-6">
            Please contact the admin to reset your password.
          </Text>
          <Button
            title="Contact Admin"
            onPress={() => {
              Alert.alert("Contact Admin", "admin@ctgsomitidmm.com");
              setShowForgetPasswordModal(false);
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>

      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-JakartaBold text-center">
            Welcome Back!
          </Text>
          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            You have successfully signed in.
          </Text>
          <Button
            title="Go to Dashboard"
            onPress={() => router.push(`/(root)/(tabs)/home`)}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default SignIn;
