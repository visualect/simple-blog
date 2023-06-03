import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { IPost, IPostsState } from "./postsTypes";
import axios from "axios";
import { RootState } from "../../app/store";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  return response.data as IPost[];
});

const postsAdapter = createEntityAdapter<IPost>({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
} as IPostsState);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPost(state, action) {
      const newId = ++Object.values(state.entities).length;
      postsAdapter.addOne(state, {
        title: action.payload.title,
        body: action.payload.body,
        id: newId,
        userId: action.payload.userId,
      });
    },
    editPost(state, action) {
      postsAdapter.upsertOne(state, action.payload);
    },
    deletePost(state, action) {
      postsAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  },
});

export const { addNewPost, editPost, deletePost } = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);

export const selectPostsError = (state: RootState) => state.posts.error;
export const selectPostsStatus = (state: RootState) => state.posts.status;

export const selectPostsByUserId = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => {
    return posts.filter((post) => post.userId === userId);
  }
);

export default postsSlice.reducer;
