import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import auth from "../../../../firebase/firebase.config";
import toast from "react-hot-toast";

const initialState = {
  user: {
    email: "",
    role: "",
  },
  isLoading: true,
  isError: false,
  error: "",
};
export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ name, email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    toast.success("User created successfully");
    console.log(data);
    return data.user.email;
  }
);
export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(`http://localhost:5000/user/${email}`);
  const data = await res.json();
  if (data.stock) {
    return data;
  }
  return email;
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Successfully login user");
    return data.user.email;
  }
);

export const googleSignIn = createAsyncThunk("auth/googleSignIn", async () => {
  const googleProvider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, googleProvider);
  toast.success("successfully created user with google");
  return data.user.email;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = { email: "", role: "" };
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
    },
    toggleLoading: (state) => {
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.user.email = payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user.email = "";
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.email = payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user.email = "";
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(googleSignIn.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleSignIn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.email = payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.user.email = "";
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.stock) {
          state.user = payload.data;
        } else {
          state.user.email = payload;
        }
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user.email = "";
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { logOut, setUser, toggleLoading } = authSlice.actions;

export default authSlice.reducer;
