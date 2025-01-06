import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import images from "@/constants/images";
import useAuthStore from "@/store/authStore";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import axios from "axios";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    mobileNumber: "",
    password: "",
  });
  const { login } = useAuthStore();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSignInPress = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://chattogram-somiti.makeupcoders.com/api/member/login",
        form, // Axios automatically stringifies the body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      if (response.status === 200) {
        setShowSuccessModal(true);
        if (result.success) {
          login(result.token);
        }
      } else {
        console.error("API Error:", result);
        Alert.alert("Error", result.message || "Invalid credentials");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Specific Axios error handling
        console.error("Axios Error:", error.response?.data || error.message);
        Alert.alert(
          "Error",
          error.response?.data?.message ||
            "Unable to sign in. Please try again."
        );
      } else {
        // General error handling
        console.error("Unexpected Error:", error);
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
        onChangeText={(value) => handleInputChange("mobileNumber", value)}
        keyboardType="phone-pad"
      />
      <InputField
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={true}
        value={form.password}
        onChangeText={(value) => handleInputChange("password", value)}
      />

      <Button
        title={isLoading ? "Signing In..." : "Sign In"}
        onPress={onSignInPress}
        className="mt-6"
      />

      <Link
        href="/sign-up"
        className="text-lg text-center text-general-200 mt-5"
      >
        Don’t have an account?{" "}
        <Text className="text-primary-100 font-rubik-semibold">Sign Up</Text>
      </Link>

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
