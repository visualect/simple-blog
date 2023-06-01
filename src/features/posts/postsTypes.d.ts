import { EntityState } from "@reduxjs/toolkit";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IPostsState {
  allPosts: EntityState<IPost> & IAllPostsState;
  postsByPage: EntityState<IPost> & IPostsByPage;
}

interface IAllPostsState {
  status: "idle" | "succeeded" | "pending" | "failed";
  error: null | string;
}

interface IPostsByPage {
  status: "idle" | "succeeded" | "pending" | "failed";
  error: null | string;
  totalCount: number;
  currentPage: number;
}
