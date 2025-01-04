// import { useSignUp } from "@clerk/clerk-expo";
import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import images from "@/constants/images";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import * as ImagePicker from "expo-image-picker";

const SignUp = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    fathersName: "",
    mothersName: "",
    dateOfBirth: "",
    mobileNumberBD: "",
    permanentAddress: "",
    presentAddress: "",
    mobileNumberSA: "",
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

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ["images", "videos"],
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };
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
        console.log("Sign-Up Success:", result);
      } else {
        console.error("API Error:", result);
        Alert.alert("Error", result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Network Error:", error);
      Alert.alert("Error", "Unable to sign up. Please try again.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <Text className="text-2xl px-3 text-primary-100 font-rubik-semibold  ">
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
            label="Fathers Name"
            placeholder="Enter fathers name"
            value={form.fathersName}
            onChangeText={(value) => handleInputChange("fathersName", value)}
          />
          <InputField
            label="Mothers Name"
            placeholder="Enter mothers name"
            value={form.mothersName}
            onChangeText={(value) => handleInputChange("mothersName", value)}
          />
          <InputField
            label="Date of Birth"
            placeholder="Enter birth date"
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
          <InputField
            label="Marital Status"
            placeholder="Enter marital status"
            value={form.maritalStatus}
            onChangeText={(value) => handleInputChange("maritalStatus", value)}
          />
          <InputField
            label="National ID Number"
            placeholder="Enter id card number"
            value={form.nationalIDNo}
            onChangeText={(value) => handleInputChange("nationalIDNo", value)}
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
          <Button title="Sign Up" onPress={onSignUpPress} className="mt-6" />
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            Already have an account?{" "}
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
        <ReactNativeModal>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code to sarnabrua@gmail.com.
              {/* We've sent a
              verification code to {form.email}. */}
            </Text>

            <Button
              title="Verify Email"
              // onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.map}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <Button
              title="Browse Home"
              onPress={() => router.push(`/(root)/(tabs)/home`)}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};
export default SignUp;
