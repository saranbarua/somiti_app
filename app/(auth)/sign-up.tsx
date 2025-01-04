// import { useSignUp } from "@clerk/clerk-expo";
import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

// import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  // const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // const [form, setForm] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });
  // const [verification, setVerification] = useState({
  //   state: "default",
  //   error: "",
  //   code: "",
  // });

  // const onSignUpPress = async () => {
  //   if (!isLoaded) return;
  //   try {
  //     await signUp.create({
  //       emailAddress: form.email,
  //       password: form.password,
  //     });
  //     await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
  //     setVerification({
  //       ...verification,
  //       state: "pending",
  //     });
  //   } catch (err: any) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     console.log(JSON.stringify(err, null, 2));
  //     Alert.alert("Error", err.errors[0].longMessage);
  //   }
  // };
  // const onPressVerify = async () => {
  //   if (!isLoaded) return;
  //   try {
  //     const completeSignUp = await signUp.attemptEmailAddressVerification({
  //       code: verification.code,
  //     });
  //     if (completeSignUp.status === "complete") {
  //       await fetchAPI("/(api)/user", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           name: form.name,
  //           email: form.email,
  //           clerkId: completeSignUp.createdUserId,
  //         }),
  //       });
  //       await setActive({ session: completeSignUp.createdSessionId });
  //       setVerification({
  //         ...verification,
  //         state: "success",
  //       });
  //     } else {
  //       setVerification({
  //         ...verification,
  //         error: "Verification failed. Please try again.",
  //         state: "failed",
  //       });
  //     }
  //   } catch (err: any) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     setVerification({
  //       ...verification,
  //       error: err.errors[0].longMessage,
  //       state: "failed",
  //     });
  //   }
  // };
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
            // value={form.name}
            // onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField label="Fathers Name" placeholder="Enter fathes name" />
          <InputField label="Mothers Name" placeholder="Enter mothers name" />
          <InputField label="Date of Birth" placeholder="Enter birth date" />
          <InputField
            label="BD Mobile Number"
            placeholder="Enter bangladeshi number"
            // value={form.name}
            // onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="KSA Mobile Number"
            placeholder="Enter Saudi number"
          />
          <InputField
            label="Permanent Address"
            placeholder="Enter permanent address"
          />
          <InputField
            label="Present Address"
            placeholder="Enter present address"
          />
          <InputField
            label="Work Address"
            placeholder="Enter work address"
            // value={form.name}
            // onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField label="Religion" placeholder="Enter religion" />
          <InputField
            label="Marital Status"
            placeholder="Enter marital status"
            // textContentType="emailAddress"
            // value={form.email}
            // onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="National ID Number"
            placeholder="Enter id card number"
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            secureTextEntry={true}
            textContentType="password"
            // value={form.password}
            // onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <Button
            title="Sign Up"
            // onPress={onSignUpPress}
            className="mt-6"
          />
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            Already have an account?{" "}
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
        <ReactNativeModal
        // isVisible={verification.state === "pending"}
        // onBackdropPress={() =>
        //   setVerification({ ...verification, state: "default" })
        // }
        // onModalHide={() => {
        //   if (verification.state === "success") {
        //     setShowSuccessModal(true);
        //   }
        // }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code to sarnabrua@gmail.com.
              {/* We've sent a
              verification code to {form.email}. */}
            </Text>
            <InputField
              label={"Code"}
              placeholder={"12345"}
              // value={verification.code}
              keyboardType="numeric"
              // onChangeText={(code) =>
              //   setVerification({ ...verification, code })
              // }
            />
            {/* {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )} */}
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
