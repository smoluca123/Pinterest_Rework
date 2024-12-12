import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type SearchState = {
  pinFilters: {
    keywords: string;
  };
};

const initialState: SearchState = {
  pinFilters: {
    keywords: "",
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setPinFilters: (state, action: { payload: SearchState["pinFilters"] }) => {
      state.pinFilters = { ...state.pinFilters, ...action.payload };
    },
  },
});

export default searchSlice.reducer;

export const { setPinFilters } = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;
