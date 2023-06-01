import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "./usersTypes";
import { RootState } from "../../app/store";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data as IUser[];
});

interface IUsersState {
  status: "idle" | "succeeded" | "pending" | "failed";
  error: null | string;
}

const usersAdapter = createEntityAdapter<IUser>();

const initialState = usersAdapter.getInitialState({
  status: "idle",
  error: null,
} as IUsersState);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        usersAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
        // TODO: Put error message into state.error
      });
  },
});

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state: RootState) => state.users);

export const selectStatus = (state: RootState) => state.users.status;

export default usersSlice.reducer;
