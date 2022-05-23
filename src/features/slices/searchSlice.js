import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    itemSearchStart: (state, action) => {
      state.loading = true;
    },
    itemSearchSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    itemSearchFailure: (state, action) => {
      state.data = [];
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { itemSearchStart, itemSearchSuccess, itemSearchFailure } =
  searchSlice.actions;

export default searchSlice.reducer;
