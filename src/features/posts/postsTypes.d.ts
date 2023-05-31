export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IPostsState {
  status: "idle" | "succeeded" | "pending" | "failed";
  error: null | string;
  totalCount: number;
  currentPage: number;
  allPosts: IPost[];
}
