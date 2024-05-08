import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./features/navigationSlice";
import conversationReducer from "./features/conversationSlice";
export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    conversation: conversationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
