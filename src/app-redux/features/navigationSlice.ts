import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  isMessageOptionsOpen: boolean;
}

const initialState: InitialState = {
  isMessageOptionsOpen: true,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    setSelectedMessageOptions: (state, action) => {
      state.isMessageOptionsOpen = action.payload;
    },
  },
});

export const { setSelectedMessageOptions } = navigationSlice.actions;

export default navigationSlice.reducer;
