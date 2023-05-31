import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  EntityId,
} from "@reduxjs/toolkit";
import { IPost, IPostsState } from "./postsTypes";
import axios from "axios";
import { RootState } from "../../app/store";

interface IReturnedFetchPosts {
  data: IPost[];
  totalCount: string;
}

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    return response.data as IPost[];
  }
);

export const fetchPostsByPage = createAsyncThunk(
  `posts/fetchPostsByPage`,
  async (pageNum: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}`
    );
    return {
      data: response.data,
      totalCount: response.headers["x-total-count"],
    } as IReturnedFetchPosts;
  }
);

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
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
  totalCount: 0,
  currentPage: 1,
  allPosts: [],
} as IPostsState);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPostsByPage.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPostsByPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalCount = Number(action.payload.totalCount);
        postsAdapter.setAll(state, action.payload.data);
      })
      .addCase(fetchPostsByPage.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong, please try again 😔!";
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.allPosts = action.payload;
      });
  },
});

export const { resetStatus, setCurrentPage } = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);

export const selectPostsError = (state: RootState) => state.posts.error;
export const selectPostsStatus = (state: RootState) => state.posts.status;

export default postsSlice.reducer;
