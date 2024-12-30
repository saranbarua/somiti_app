import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create an async thunk to fetch the token
export const fetchToken = createAsyncThunk("login/fetchToken", async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    return false;
  }
});

const initialState = {
  mobileNumber: "",
  password: "",
  loading: false,
  error: null,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setMobileNumber(state, action) {
      state.mobileNumber = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setAccountType(state, action) {
      state.accountType = action.payload;
    },
    resetLogin(state) {
      state.mobileNumber = "";
      state.password = "";
      state.loading = false;
      state.error = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        // Handle the pending state if needed
        state.loading = true;
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        // Handle the fulfilled state when the token is fetched
        state.loading = false;
        state.isLoggedIn = action.payload;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setMobileNumber,
  setLoginNo,
  setPassword,
  setLoading,
  setError,
  resetLogin,
} = loginSlice.actions;

export default loginSlice.reducer;
