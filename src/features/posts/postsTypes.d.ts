export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IPostsState {
  status: "idle" | "succeeded" | "pending" | "failed";
  error: null | string;
}
