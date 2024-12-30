// loginActions.js
import axios from "axios";
import { setLoading, setError, setLoggedIn, resetLogin } from "./loginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.post(
      `${apiurl.mainUrl}/member/login`,
      credentials
    );
    if (response.data.success === true) {
      Cookies.set("token", response.data.token, {
        expires: 7,
      });
      dispatch(setType(response?.data?.accountType));
      Cookies.set("accountType", response?.data?.accountType);
      Cookies.set("username", response?.data?.username);
      dispatch(setLoggedIn(true));
      dispatch(setUsername(response?.data?.username));
      dispatch(setError(null)); // Clear any previous errors
      Alert.alert(response.data.message);
    } else {
      dispatch(setError(response.data.message)); // Dispatch error message from server
      Alert.alert(response.data.message || "Login failed");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(setError(errorMessage)); // Dispatch network error message
    Alert.alert(errorMessage || "An unexpected error occurred");
  } finally {
    dispatch(setLoading(false)); // Stop loading regardless of success or failure
  }
};

const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};

export const logoutUser = () => (dispatch) => {
  dispatch(resetLogin());
  removeToken();
};
