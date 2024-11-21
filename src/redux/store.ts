import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import dialogSlice from './slices/dialogSlice';

const store = configureStore({
  reducer: combineReducers({
    auth: authSlice,
    dialog: dialogSlice,
  }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
