import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import dialogSlice from "./slices/dialogSlice";
import commentSlice from "./slices/commentSlice";
import searchSlice from "@/redux/slices/searchSlice";

const store = configureStore({
  reducer: combineReducers({
    auth: authSlice,
    dialog: dialogSlice,
    comment: commentSlice,
    search: searchSlice,
  }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
