import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchPosts,
  selectPostsError,
  selectPostsIds,
  selectPostsStatus,
} from "./postsSlice";
import PostItem from "./PostItem";

export default function PostsList() {
  const dispatch = useAppDispatch();
  const currentStatus = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);
  const postsIds = useAppSelector(selectPostsIds);

  let content;

  if (currentStatus === "pending") {
    content = <div>Loading...</div>;
  } else if (currentStatus === "succeeded") {
    content = postsIds.map((postId) => {
      return <PostItem key={postId} postId={postId} />;
    });
  } else if (currentStatus === "failed") {
    content = error;
  }

  useEffect(() => {
    if (currentStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, currentStatus]);

  return (
    <section className="bg-gradient-to-r from-indigo-50 to-white">
      <div className="w-1/2 mx-auto my-0 py-10">
        <h1 className="text-2xl font-semibold mb-4">Posts</h1>
        <ul className="flex flex-col gap-6">{content}</ul>
      </div>
    </section>
  );
}
