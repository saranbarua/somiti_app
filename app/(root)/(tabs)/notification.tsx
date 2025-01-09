import { usePushNotifications } from "@/components/hooks/usePushNotification";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";

export default function Notification() {
  const { expoPushToken } = usePushNotifications();
  const [apiResponse, setApiResponse] = useState<null | object>(null);
  const [error, setError] = useState<null | string>(null);
  const [notifications, setNotifications] = useState([]);
  const { token, checkAuth } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const postTokenToAPI = async () => {
      await checkAuth();

      if (!expoPushToken?.data) {
        return;
      }
      try {
        const response = await fetch(
          "https://chattogram-somiti.makeupcoders.com/api/notification/save-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token
            },
            body: JSON.stringify({ expoToken: expoPushToken.data }), // Pass the token
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setApiResponse(data); // Save the API response
      } catch (error) {
        console.error("Error posting token to API:", error);
        setError("Failed to post token to API.");
      }
    };

    postTokenToAPI();
  }, [checkAuth, expoPushToken?.data, token]);

  const fetchNotifications = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        "https://chattogram-somiti.makeupcoders.com/api/notification",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setNotifications(data.data); // Save the notification data
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to fetch notifications.");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [apiResponse, token]);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.details}>{item.details}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text className="text-2xl font-bold text-primary-100">Notifications</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchNotifications}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },

  error: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },
  notificationCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
});
