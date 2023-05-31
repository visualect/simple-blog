import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchPostsByPage,
  selectPostsError,
  selectPostsIds,
  selectPostsStatus,
} from "./postsSlice";
import PostItem from "./PostItem";
import Pagination from "../../components/UI/Pagination";
import Spinner from "../../components/UI/Spinner";

export default function PostsList() {
  const dispatch = useAppDispatch();
  const currentStatus = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);
  const postsIds = useAppSelector(selectPostsIds);
  const currentPage = useAppSelector((state) => state.posts.currentPage);

  let content;

  if (currentStatus === "pending") {
    content = <Spinner />;
  } else if (currentStatus === "succeeded") {
    content = postsIds.map((postId) => {
      return <PostItem key={postId} postId={postId} />;
    });
  } else if (currentStatus === "failed") {
    content = error;
  }

  useEffect(() => {
    if (currentStatus === "idle") {
      dispatch(fetchPostsByPage(currentPage));
    }
  }, [dispatch, currentPage, currentStatus]);

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 to-white">
      <div className="w-1/2 mx-auto my-0 py-10">
        <h1 className="text-2xl font-semibold mb-4">Posts</h1>
        <Pagination />
        <ul className="flex flex-col gap-6 items-center">{content}</ul>
      </div>
    </section>
  );
}
