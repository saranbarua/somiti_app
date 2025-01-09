import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import React, { useState } from "react";
import { Text, StyleSheet, Alert, SafeAreaView } from "react-native";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match!");
      return;
    }

    Alert.alert("Success", "Password changed successfully!");
    // Add your API call for changing the password here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <InputField
        label="Old Password"
        placeholder="Enter your old password"
        secureTextEntry={true}
        // value={form.password}
        // onChangeText={(value: string) => handleInputChange("password", value)}
      />
      <InputField
        label="New Password"
        placeholder="Enter your password"
        secureTextEntry={true}
        // value={form.password}
        // onChangeText={(value: string) => handleInputChange("password", value)}
      />
      <InputField
        label="Confirm New Password"
        placeholder="Enter your password"
        secureTextEntry={true}
        // value={form.password}
        // onChangeText={(value: string) => handleInputChange("password", value)}
      />

      <Button title="Submit" onPress={handleChangePassword} className="mt-5" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
});
