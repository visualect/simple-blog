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

interface INewItemTypes {
  title: string;
  body: string;
  userId: string;
}

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newItem: INewItemTypes, { getState }) => {
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

const postsByPageAdapter = createEntityAdapter<IPost>({
  sortComparer: (a, b) => b.id - a.id,
});

const allPostsAdapter = createEntityAdapter<IPost>({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState: IPostsState = {
  allPosts: allPostsAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  postsByPage: postsByPageAdapter.getInitialState({
    status: "idle",
    error: null,
    totalCount: 0,
    currentPage: 1,
  }),
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetStatus(state) {
      state.postsByPage.status = "idle";
    },
    setCurrentPage(state, action) {
      state.postsByPage.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPostsByPage.pending, (state) => {
        state.postsByPage.status = "pending";
      })
      .addCase(fetchPostsByPage.fulfilled, (state, action) => {
        state.postsByPage.status = "succeeded";
        state.postsByPage.totalCount = Number(action.payload.totalCount);
        postsByPageAdapter.setAll(state.postsByPage, action.payload.data);
      })
      .addCase(fetchPostsByPage.rejected, (state) => {
        state.postsByPage.status = "failed";
        state.postsByPage.error = "Something went wrong, please try again 😔!";
        // TODO: Get error message form error object
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        postsByPageAdapter.addOne(state.postsByPage, action.payload);
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.allPosts.status = "pending";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.allPosts.status = "succeeded";
        allPostsAdapter.setAll(state.allPosts, action.payload);
      })
      .addCase(fetchAllPosts.rejected, (state) => {
        state.allPosts.status = "failed";
        state.allPosts.error = "Something went wrong, please try again 😔!";
        // TODO: Get error message form error object
      });
  },
});

export const { resetStatus, setCurrentPage } = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = allPostsAdapter.getSelectors((state: RootState) => state.posts.allPosts);

export const {
  selectAll: selectAllPostsByPage,
  selectById: selectPostByPageById,
  selectIds: selectPostsByPageIds,
} = postsByPageAdapter.getSelectors(
  (state: RootState) => state.posts.postsByPage
);

export const selectAllPostsError = (state: RootState) =>
  state.posts.allPosts.error;
export const selectAllPostsStatus = (state: RootState) =>
  state.posts.allPosts.status;

export const selectPostsByPageError = (state: RootState) =>
  state.posts.postsByPage.error;
export const selectPostsByPageStatus = (state: RootState) =>
  state.posts.postsByPage.status;

export default postsSlice.reducer;
