// import { useSignUp } from "@clerk/clerk-expo";
import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import images from "@/constants/images";
import { Link, router } from "expo-router";
import { useState } from "react";

import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ReactNativeModal } from "react-native-modal";
import * as ImagePicker from "expo-image-picker";

const SignUp = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    fathersName: "",
    mothersName: "",
    husbandsName: "",
    dateOfBirth: "",
    mobileNumberBD: "",
    permanentAddress: "",
    presentAddress: "",
    mobileNumberSA: "",
    bloodGroup: "",
    refererName: "",
    workAddress: "",
    religion: "",
    maritalStatus: "",
    nationalIDNo: "",
    password: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //image added
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        // allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImg(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image Picker Error:", error);
    }
  };
  const onSignUpPress = async () => {
    setIsLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (profileImg) {
      formData.append("profileImg", {
        uri: profileImg,
        name: "profile.jpg",
        type: "image/jpeg",
      });
    }
    try {
      const response = await fetch(
        "https://chattogram-somiti.makeupcoders.com/api/member",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        console.error("API Error:", result);
        Alert.alert("Error", result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Network Error:", error);
      Alert.alert("Error", "Unable to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <Image
        source={images.SignUpBanner}
        style={{ width: "100%", height: 300, resizeMode: "center" }}
        className="mb-8"
      />
      <View className="flex-1 bg-white">
        <Text className="text-2xl px-3 text-primary-100 font-rubik-semibold ">
          Create Your Account
        </Text>
        <View className="p-5">
          <InputField
            label="Full Name"
            placeholder="Enter full name"
            value={form.fullName}
            onChangeText={(value) => handleInputChange("fullName", value)}
          />
          <InputField
            label="Father's Name"
            placeholder="Enter father's name"
            value={form.fathersName}
            onChangeText={(value) => handleInputChange("fathersName", value)}
          />
          <InputField
            label="Mother's Name"
            placeholder="Enter mother's name"
            value={form.mothersName}
            onChangeText={(value) => handleInputChange("mothersName", value)}
          />
          <InputField
            label="Husband's Name"
            placeholder="Enter husband's name"
            value={form.husbandsName}
            onChangeText={(value) => handleInputChange("husbandsName", value)}
          />
          <InputField
            label="Date of Birth"
            placeholder="dd/mm/year"
            value={form.dateOfBirth}
            onChangeText={(value) => handleInputChange("dateOfBirth", value)}
          />
          <InputField
            label="BD Mobile Number"
            placeholder="Enter bangladeshi number"
            value={form.mobileNumberBD}
            onChangeText={(value) => handleInputChange("mobileNumberBD", value)}
          />
          <InputField
            label="KSA Mobile Number"
            placeholder="Enter Saudi number"
            value={form.mobileNumberSA}
            onChangeText={(value) => handleInputChange("mobileNumberSA", value)}
          />
          <InputField
            label="Permanent Address"
            placeholder="Enter permanent address"
            value={form.permanentAddress}
            onChangeText={(value) =>
              handleInputChange("permanentAddress", value)
            }
          />
          <InputField
            label="Present Address"
            placeholder="Enter present address"
            value={form.presentAddress}
            onChangeText={(value) => handleInputChange("presentAddress", value)}
          />

          <InputField
            label="Work Address"
            placeholder="Enter work address"
            value={form.workAddress}
            onChangeText={(value) => handleInputChange("workAddress", value)}
          />
          <InputField
            label="Religion"
            placeholder="Enter religion"
            value={form.religion}
            onChangeText={(value) => handleInputChange("religion", value)}
          />
          <View className="mb-4">
            <Text className="text-lg font-rubik-semibold mb-3">
              Marital Status
            </Text>
            <View className="flex-row gap-4">
              <TouchableOpacity
                className={`flex-row items-center gap-2 ${
                  form.maritalStatus === "Yes" ? "bg-blue-100 p-2 rounded" : ""
                }`}
                onPress={() => handleInputChange("maritalStatus", "Yes")}
              >
                <View
                  className={`w-4 h-4 rounded-full border ${
                    form.maritalStatus === "Yes"
                      ? "bg-blue-500"
                      : "border-gray-400"
                  }`}
                />
                <Text className="text-gray-800">Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-row items-center gap-2 ${
                  form.maritalStatus === "No" ? "bg-blue-100 p-2 rounded" : ""
                }`}
                onPress={() => handleInputChange("maritalStatus", "No")}
              >
                <View
                  className={`w-4 h-4 rounded-full border ${
                    form.maritalStatus === "No"
                      ? "bg-blue-500"
                      : "border-gray-400"
                  }`}
                />
                <Text className="text-gray-800">No</Text>
              </TouchableOpacity>
            </View>
          </View>
          <InputField
            label="National ID"
            placeholder="Enter id card number"
            value={form.nationalIDNo}
            onChangeText={(value) => handleInputChange("nationalIDNo", value)}
          />
          <InputField
            label="Blood Group"
            placeholder="Enter your blood group"
            value={form.bloodGroup}
            onChangeText={(value) => handleInputChange("bloodGroup", value)}
          />
          <InputField
            label="Referer Name"
            placeholder="Enter Refer Name"
            value={form.refererName}
            onChangeText={(value) => handleInputChange("refererName", value)}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />

          <Button
            title="Pick an image from camera roll"
            bgVariant={"secondary"}
            onPress={pickImage}
          />
          <View className=" p-4">
            {profileImg && (
              <Image
                source={{ uri: profileImg }}
                style={{ width: 300, height: 400 }}
              />
            )}
          </View>
          <Button
            title={isLoading ? "Signing up..." : "Sign up"}
            onPress={onSignUpPress}
            className="mt-6"
          />

          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            Already have an account?{" "}
            <Text className="text-primary-100 font-rubik-semibold">Log In</Text>
          </Link>
        </View>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Application Accepted
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              Member application taken. Wait for the confirmation.
            </Text>
            <Button
              title="Browse Home"
              onPress={() => router.push(`/(auth)/welcome`)}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};
export default SignUp;
