import { useAppSelector } from "../../app/hooks";
import {
  selectPostsError,
  selectPostsIds,
  selectPostsStatus,
} from "./postsSlice";
import PostItem from "./PostItem";
import Pagination from "../../components/UI/Pagination";
import Spinner from "../../components/UI/Spinner";
import { useState } from "react";
import AddPostForm from "./AddPostForm";

export default function PostsList() {
  const currentStatus = useAppSelector(selectPostsStatus);
  const error = useAppSelector(selectPostsError);
  const postsIds = useAppSelector(selectPostsIds);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [formVisible, setFormVisible] = useState(false);

  let content;
  let form;

  if (formVisible) {
    form = <AddPostForm setFormVisible={setFormVisible} />;
  } else {
    form = (
      <button
        className="self-end mb-8 p-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 font-semibold cursor-pointer"
        onClick={() => setFormVisible(true)}
      >
        Add Post
      </button>
    );
  }

  if (currentStatus === "pending") {
    content = <Spinner />;
  } else if (currentStatus === "succeeded") {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = currentPage * postsPerPage;
    content = postsIds.slice(startIndex, endIndex).map((postId) => {
      return <PostItem key={postId} postId={postId} />;
    });
  } else if (currentStatus === "failed") {
    content = error;
  }

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 to-white">
      <div className="flex flex-col w-1/2 mx-auto my-0 py-10">
        <h1 className="text-2xl font-semibold mb-4">Posts</h1>
        {form}
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <ul className="flex flex-col gap-6 items-center">{content}</ul>
      </div>
    </section>
  );
}
