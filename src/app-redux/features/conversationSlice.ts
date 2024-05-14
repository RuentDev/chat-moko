import { Conversation } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";
type Participant = {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  verification_code: string;
  is_active: string;
  is_reported: string;
  is_blocked: string;
  createAt: string;
  updatedAt: string;
  role: string;
};



export interface InitialState {
  selectedConversation?: Conversation;
  participants?: Participant[];
}

const initialState: InitialState = {
  selectedConversation: undefined,
  participants: undefined,
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
