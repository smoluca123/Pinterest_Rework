import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import dialogSlice from './slices/dialogSlice';
import commentSlice from './slices/commentSlice';

const store = configureStore({
  reducer: combineReducers({
    auth: authSlice,
    dialog: dialogSlice,
    comment: commentSlice,
  }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
