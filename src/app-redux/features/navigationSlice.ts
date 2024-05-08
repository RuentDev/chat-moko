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

type SelectedConversation = {
  id: string;
  title: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  participants: Participant[];
};

export interface InitialState {
  selectedIcon: string;
  selectedConversation?: SelectedConversation;
}

const initialState: InitialState = {
  selectedConversation: undefined,
  selectedIcon: "Home",
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    setSelectedIcon: (state, action) => {
      state.selectedIcon = action.payload;
    },
  },
});

export const { setSelectedIcon } = navigationSlice.actions;

export default navigationSlice.reducer;
