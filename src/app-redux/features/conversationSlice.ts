import { Conversation } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  selectedConversation?: Conversation;
}

const initialState: InitialState = {
  selectedConversation: undefined,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: initialState,
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
});

export const { setSelectedConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
