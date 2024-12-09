import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';

type DialogItemType = {
  isOpen: boolean;
};

export type AuthDialogTypeString = 'signin' | 'signup' | 'verify-email';

interface DialogState {
  authDialog: DialogItemType & {
    dialogType: AuthDialogTypeString;
  };
}

const initialState: DialogState = {
  authDialog: { isOpen: false, dialogType: 'signup' },
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setAuthDialogOpen: (
      state,
      action: {
        payload: {
          isOpen?: boolean;
          dialogType?: AuthDialogTypeString;
        };
      }
    ) => ({
      ...state,
      authDialog: {
        ...state.authDialog,
        isOpen: action?.payload.isOpen ?? state.authDialog.isOpen,
        dialogType: action?.payload.dialogType || state.authDialog.dialogType,
      },
    }),
  },
});

export default dialogSlice.reducer;

export const { setAuthDialogOpen } = dialogSlice.actions;

export const selectDialog = (state: RootState) => state.dialog;
