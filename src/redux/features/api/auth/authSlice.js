// // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // import {
// //   GoogleAuthProvider,
// //   createUserWithEmailAndPassword,
// //   getAuth,
// //   signInWithEmailAndPassword,
// //   signInWithPopup,
// //   updateProfile,
// // } from "firebase/auth";
// // import app from "../../../../firebase/firebase.config";

// // const auth = getAuth(app);

// // const initialState = {
// //   user: null,
// //   loading: false,
// //   error: null,
// // };

// // export const createUser = createAsyncThunk(
// //   "auth/createUser",
// //   async ({ name, email, password }, { rejectWithValue }) => {
// //     try {
// //       const userCredential = await createUserWithEmailAndPassword(
// //         auth,
// //         email,
// //         password
// //       );
// //       const user = userCredential.user;
// //       await updateProfile(auth.currentUser, {
// //         displayName: name,
// //       });
// //       console.log(user);
// //       //  post user data to mongodb
// //       return user;
// //     } catch (error) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // export const getUser = createAsyncThunk("auth/getUser", async (email) => {
// //   const res = await fetch(` http://localhost:5173/api/v1/users/${email}`);
// //   const data = await res.json();
// //   if (data.status) {
// //     return data;
// //   }
// //   return email;
// // });

// // export const loginUser = createAsyncThunk(
// //   "auth/loginUser",
// //   async ({ email, password }) => {
// //     const data = await signInWithEmailAndPassword(auth, email, password);
// //     console.log(data);
// //     return data.user.email;
// //   }
// // );

// // export const signInWithGoogle = createAsyncThunk(
// //   "auth/signInWithGoogle",
// //   async () => {
// //     const googleProvider = new GoogleAuthProvider();
// //     const data = await signInWithPopup(auth, googleProvider);
// //     console.log(data);
// //     return data.user.email;
// //   }
// // );

// // export const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     logOUt: (state) => {
// //       state.loading = false;
// //       state.userInfo = null;
// //       state.userToken = null;
// //       state.error = null;
// //     },

// //     setCredentials: (state, { payload }) => {
// //       state.userInfo = payload;
// //     },
// //     toggleLoading: (state) => {
// //       state.loading = false;
// //     },
// //   },

// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(createUser.pending, (state) => {
// //         state.loading = true;
// //         state.error = false;
// //         state.error = "";
// //       })
// //       .addCase(createUser.fulfilled, (state, { payload }) => {
// //         console.log(payload);
// //         state.loading = false;
// //         state.user = payload;
// //         state.error = false;
// //         state.error = "";
// //       })
// //       .addCase(createUser.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = true;
// //         state.error = action.payload;
// //       })
// //       .addCase(loginUser.pending, (state) => {
// //         state.loading = true;
// //         state.error = false;
// //         state.error = "";
// //       })
// //       .addCase(loginUser.fulfilled, (state, { payload }) => {
// //         state.loading = false;
// //         state.user.email = payload;
// //         state.error = false;
// //         state.error = "";
// //       })
// //       .addCase(loginUser.rejected, (state, action) => {
// //         state.loading = false;
// //         state.user.email = "";
// //         state.error = true;
// //         state.error = action.error.message;
// //       })
// //       .addCase(signInWithGoogle.pending, (state) => {
// //         state.loading = true;
// //         state.error = false;
// //         state.error = "";
// //       })
// //       .addCase(signInWithGoogle.fulfilled, (state, { payload }) => {
// //         console.log(payload);
// //         state.loading = false;
// //         state.user.email = payload;
// //         state.error = false;
// //         state.error = "";
// //       })
// //       .addCase(signInWithGoogle.rejected, (state, action) => {
// //         state.loading = false;
// //         state.user.email = "";
// //         state.error = true;
// //         state.error = action.error.message;
// //       })
// //       .addCase(getUser.pending, (state) => {
// //         state.loading = true;
// //         state.error = false;
// //         state.error = "";
// //       })
// //       .addCase(getUser.fulfilled, (state, { payload }) => {
// //         state.loading = false;
// //         if (payload.status) {
// //           state.user = payload.data;
// //         } else {
// //           state.user.email = payload;
// //         }
// //         state.error = false;
// //         state.error = "";
// //       })
// //       .addCase(getUser.rejected, (state, action) => {
// //         state.loading = false;
// //         state.user.email = "";
// //         state.error = true;
// //         state.error = action.error.message;
// //       });
// //   },
// // });

// // export const { logOUt, setCredentials, toggleLoading } = authSlice.actions;
// // export default authSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   getAuth,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   updateProfile,
// } from "firebase/auth";
// import app from "../../../../firebase/firebase.config";
// import toast from "react-hot-toast";

// const auth = getAuth(app);

// const initialState = {
//   user: null,
//   isLoading: true,
//   isError: false,
//   error: null,
//   message: null,
// };

// export const createUser = createAsyncThunk(
//   "auth/createUser",
//   async ({ name, email, password }) => {
//     const data = await createUserWithEmailAndPassword(auth, email, password);

//     await updateProfile(auth.currentUser, {
//       displayName: name,
//     });
//     console.log(data);
//     toast.success("User created successfully");
//     return data;
//   }
// );

// export const getUser = createAsyncThunk("auth/getUser", async (email) => {
//   const res = await fetch(` http://localhost:5173/api/v1/users/${email}`);
//   const data = await res.json();
//   if (data.status) {
//     return data;
//   }
//   return data;
// });

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password }) => {
//     const data = await signInWithEmailAndPassword(auth, email, password);
//     console.log(data);
//     toast.success("User login successfully");
//     return data;
//   }
// );

// export const signInWithGoogle = createAsyncThunk(
//   "auth/signInWithGoogle",
//   async () => {
//     const googleProvider = new GoogleAuthProvider();
//     const data = await signInWithPopup(auth, googleProvider);
//     console.log(data);
//     return data;
//   }
// );

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logOUt: (state) => {
//       state.user = { email: "", role: "" };
//     },

//     setUser: (state, action) => {
//       // console.log(action.payload);
//       state.user = action.payload;

//       state.isLoading = false;
//     },
//     toggleLoading: (state) => {
//       state.isLoading = false;
//     },
//     setMessage: (state, action) => {
//       console.log(action.payload);
//       state.isLoading = false;
//       state.message = action.payload;
//       state.error = null;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//       state.message = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(createUser.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//         state.user = null;
//         state.error = null;
//         state.message = null;
//       })
//       .addCase(createUser.fulfilled, (state, { payload }) => {
//         console.log(payload);
//         state.isLoading = false;
//         state.isError = false;
//         state.user = payload;
//         state.message = payload.message;
//         state.error = null;
//       })
//       .addCase(createUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.user = null;
//         state.message = null;
//         state.error = action.error.message;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//         state.error = null;
//         state.message = null;
//       })
//       .addCase(loginUser.fulfilled, (state, { payload }) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.user = payload;
//         state.message = payload.message;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.user = null;
//         state.error = action.error.message;
//         state.message = null;
//       })
//       .addCase(signInWithGoogle.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//         state.message = null;
//         state.error = null;
//       })
//       .addCase(signInWithGoogle.fulfilled, (state, { payload }) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.user = payload;
//         state.message = payload.message;
//         state.error = null;
//       })
//       .addCase(signInWithGoogle.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.user = null;
//         state.message = null;
//         state.error = action.error.message;
//       })
//       .addCase(getUser.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//         state.error = null;
//         state.message = null;
//       })
//       .addCase(getUser.fulfilled, (state, { payload }) => {
//         state.isLoading = false;
//         if (payload.status) {
//           state.user = payload.data;
//         } else {
//           state.user = payload;
//         }
//         state.isError = false;
//         state.error = null;
//         state.message = payload.message;
//       })
//       .addCase(getUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isError = true;
//         state.error = action.error.message;
//         state.message = null;
//       });
//   },
// });

// export const { logOUt, setUser, toggleLoading } = authSlice.actions;
// export default authSlice.reducer;

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
  if (data.status) {
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
        if (payload.status) {
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
