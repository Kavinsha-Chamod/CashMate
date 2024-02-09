import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice"
import loaderSlice from "./loaderSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    loading: loaderSlice,
  }
})

export default store;