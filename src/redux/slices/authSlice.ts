import { signInAPI } from '@/apis/userApis';
import { UserDataWithTokenType } from '@/lib/types';
import { SignInValues } from '@/lib/validations';
import { RootState } from '@/redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: UserDataWithTokenType | null;
  isLoading: boolean;
  error: {
    message?: string | null;
  };
}

const isAuthenticated = JSON.parse(
  localStorage.getItem('isAuthenticated') || 'false'
);
const currentUser = JSON.parse(
  localStorage.getItem('currentUser') || 'null'
) as UserDataWithTokenType | null;

const initialState: AuthState = {
  isAuthenticated,
  user: currentUser,
  isLoading: false,
  error: {
    message: null,
  },
};

export const signIn = createAsyncThunk(
  'signIn',
  async (credentials: SignInValues) => {
    try {
      const data = await signInAPI(credentials);
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: {
          message: null,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => ({
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: null,
        error: {
          message: null,
        },
      }))
      .addCase(
        signIn.fulfilled,
        (
          state,
          {
            payload,
          }: {
            payload: UserDataWithTokenType;
          }
        ) => {
          // set item localstorage
          localStorage.setItem('isAuthenticated', JSON.stringify(true));
          localStorage.setItem('currentUser', JSON.stringify(payload));

          return {
            ...state,
            isAuthenticated: true,
            user: payload,
            error: { message: null },
            isLoading: false,
          };
        }
      )
      .addCase(signIn.rejected, (state, { error }) => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        return {
          ...state,
          isLoading: false,
          isAuthenticated: false,
          user: null,
          error: { message: error.message },
        };
      });
  },
});

export default authSlice.reducer;

export const { logOut } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
