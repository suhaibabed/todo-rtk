import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./Slices/TodoSlice";

export const store = configureStore({
  reducer: {
    todos: TodoReducer,
  },
});
