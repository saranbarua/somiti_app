import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For secure storage

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const saveTokenToDatabase = async (token: string) => {
    // console.log("Saving token:", token);

    try {
      const bearerToken = await AsyncStorage.getItem("auth-storage"); // Replace with your storage key

      if (!bearerToken) {
        console.error("No bearer token found in storage");
        return;
      }

      const parsedState = JSON.parse(bearerToken);

      if (!parsedState?.state?.token) {
        console.error("Bearer token is missing in parsed storage state");
        return;
      }

      const response = await fetch(
        "https://chattogram-somiti.makeupcoders.com/api/notification/save-token", // Replace with your server's IP/domain
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedState.state.token}`, // Add Bearer token
          },
          body: JSON.stringify({ expoToken: token }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Failed to save token to database:", responseData);
        return;
      }

      console.log("Token successfully saved to database:", responseData);
    } catch (error) {
      console.error("Error saving token to database:", error);
    }
  };

  const registerForPushNotificationsAsync = async () => {
    try {
      let token: Notifications.ExpoPushToken | undefined;

      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notifications");
          return;
        }

        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas.projectId,
        });

        if (token) {
          setExpoPushToken(token);
          await saveTokenToDatabase(token.data); // Save token to the database
        }
      } else {
        alert("Must be using a physical device for Push notifications");
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      return token;
    } catch (error) {
      console.error("Error registering for push notifications:", error);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};
