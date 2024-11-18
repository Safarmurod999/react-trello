import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./kanbanSlice";
export const store = configureStore({
  reducer: {
    board: boardSlice,
  },
});
