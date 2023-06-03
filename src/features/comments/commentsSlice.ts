import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { IComment } from "./commentsTypes";
import { RootState } from "../../app/store";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    return response.data;
  }
);

const commentsAdapter = createEntityAdapter<IComment>();

interface IAdditionalState {
  status: "idle" | "succeeded" | "pending" | "failed";
  error: null | string;
}

const initialState = commentsAdapter.getInitialState({
  status: "idle",
  error: null,
} as IAdditionalState);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchComments.fulfilled, commentsAdapter.upsertMany)
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  },
});

export const { selectAll: selectAllComments, selectIds: selectCommentsIds } =
  commentsAdapter.getSelectors((state: RootState) => state.comments);

export const selectCommentsByPostId = createSelector(
  [selectAllComments, (_, postId: number) => postId],
  (comments, postId) => {
    return comments.filter((comment) => comment.postId === postId);
  }
);

export default commentsSlice.reducer;
