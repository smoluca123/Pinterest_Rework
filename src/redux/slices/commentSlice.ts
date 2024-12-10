import { CommentDataType } from '@/lib/types';
import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';

type CommentState = {
  isEdit: boolean;
  editingCommentData: CommentDataType | null;
};

const initialState: CommentState = {
  isEdit: false,
  editingCommentData: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setIsEdit: (state, action: { payload: boolean }) => {
      state.isEdit = action.payload;
    },
    setEditingComment: (state, action: { payload: CommentDataType | null }) => {
      return {
        ...state,
        isEdit: true,
        editingCommentData: action.payload,
      };
    },
    resetEditComment: () => {
      return {
        isEdit: false,
        editingCommentData: null,
      };
    },
  },
});

export const { resetEditComment, setEditingComment, setIsEdit } =
  commentSlice.actions;

export default commentSlice.reducer;

export const selectComment = (state: RootState) => state.comment;
