import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  EntityId,
} from "@reduxjs/toolkit";
import { IPost } from "./postsTypes";
import axios from "axios";
import { RootState } from "../../app/store";

interface IPostsState {
  status: "idle" | "succeeded" | "pending" | "failed";
  error: null | string;
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data as IPost[];
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (
    newItem: { title: string; body: string; userId: string },
    { getState }
  ) => {
    const ids: EntityId[] = selectPostsIds(getState() as RootState);
    const { title, body, userId } = newItem;
    const newId = Object.values(ids).length++;
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        userId,
        id: newId,
        title,
        body,
      }
    );
    return response.data as IPost;
  }
);

const postsAdapter = createEntityAdapter<IPost>({
  sortComparer: (a, b) => a.userId - b.userId,
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
} as IPostsState);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went worng, please try again 😔!";
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);

export const selectPostsError = (state: RootState) => state.posts.error;
export const selectPostsStatus = (state: RootState) => state.posts.status;

export default postsSlice.reducer;
