import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import useAuthStore from "@/store/authStore";
import React, { useState } from "react";
import { Text, StyleSheet, Alert, SafeAreaView } from "react-native";

export default function ChangePassword() {
  const { token, checkAuth } = useAuthStore();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async () => {
    await checkAuth();

    // Validate fields
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://chattogram-somiti.makeupcoders.com/api/member/change-pass",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password.");
      }

      const data = await response.json();
      Alert.alert("Success", data.message || "Password changed successfully!");

      // Clear fields after successful submission
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to change password.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <InputField
        label="Old Password"
        placeholder="Enter your old password"
        secureTextEntry={true}
        value={oldPassword}
        onChangeText={(value) => setOldPassword(value)}
      />
      <InputField
        label="New Password"
        placeholder="Enter your new password"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={(value) => setNewPassword(value)}
      />
      <InputField
        label="Confirm New Password"
        placeholder="Confirm your new password"
        secureTextEntry={true}
        value={confirmNewPassword}
        onChangeText={(value) => setConfirmNewPassword(value)}
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
