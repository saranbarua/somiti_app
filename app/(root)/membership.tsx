import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useMemberProfile } from "@/components/hooks/useProfile";
import * as MediaLibrary from "expo-media-library";

export default function MembershipCard() {
  const { profile, isLoading } = useMemberProfile();

  // Handle image download
  const handleDownload = async () => {
    if (!profile?.memberCard) {
      Alert.alert("Error", "Membership card image not available for download.");
      return;
    }

    try {
      const imageUrl = `https://chattogram-somiti.makeupcoders.com${profile?.memberCard}`;
      const fileUri = `${FileSystem.cacheDirectory}membership-card.jpg`;

      // Download the image to the file system
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

      // Request media library permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Media library access is required to save images."
        );
        return;
      }

      // Save the downloaded file to the device's media library
      await MediaLibrary.saveToLibraryAsync(uri);

      Alert.alert(
        "Success",
        "Membership card has been downloaded to your gallery."
      );
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "Failed to download the membership card.");
    }
  };

  // Show loader while data is fetching
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loaderText}>Loading membership details...</Text>
      </View>
    );
  }

  // Handle cases where profile data is unavailable
  if (!profile) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Unable to fetch profile details. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: `https://chattogram-somiti.makeupcoders.com${profile?.memberCard}`,
          }}
          className="w-[250px] h-[400px]"
          resizeMode="cover"
        />
        <Text className="text-lg font-rubik-semibold">
          Member ID: {profile.memberID || "N/A"}
        </Text>

        <TouchableOpacity
          className="bg-primary-100 p-2"
          onPress={handleDownload}
        >
          <Text className="text-white font-rubik-semibold">Download Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF0000",
    textAlign: "center",
  },
});
