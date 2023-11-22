import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../Redux/Slice";

export const store = configureStore({
  reducer: counterSlice,
});
