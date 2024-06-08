import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  selectedIcon: string;
  isMessageOptionsOpen: boolean;
}

const initialState: InitialState = {
  selectedIcon: "Home",
  isMessageOptionsOpen: false,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    setSelectedIcon: (state, action) => {
      state.selectedIcon = action.payload;
    },
    setSelectedMessageOptions: (state, action) => {
      state.isMessageOptionsOpen = action.payload;
    },
  },
});

export const { setSelectedIcon, setSelectedMessageOptions } = navigationSlice.actions;

export default navigationSlice.reducer;
