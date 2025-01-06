import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

import { InputFieldProps } from "@/types/type";
import icons from "@/constants/icons";

const PasswordInput = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-rubik-semibold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-between items-center bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-100 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 font-rubik-semibold text-[15px] flex-1 ${inputStyle}`}
              secureTextEntry={!isPasswordVisible}
              {...props}
            />
            {secureTextEntry && (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                className="mr-4 flex justify-center items-center"
                style={{ paddingHorizontal: 10 }} // Ensures consistent space
              >
                <Image
                  source={isPasswordVisible ? icons.eye : icons.eyeclose}
                  className="w-6 h-4"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PasswordInput;
