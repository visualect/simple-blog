import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editPost, selectPostById } from "./postsSlice";
import { IPost } from "./postsTypes";
import { useState } from "react";

export default function EditPost() {
  const params = useParams();
  const navigate = useNavigate();
  const postId = Number(params.id);
  const post = useAppSelector((state) =>
    selectPostById(state, postId)
  ) as IPost;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const dispatch = useAppDispatch();
  const [requestStatus, setRequestStatus] = useState<"idle" | "pending">(
    "idle"
  );

  const canSave = [title, body].every(Boolean) && requestStatus === "idle";

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      setRequestStatus("pending");
      dispatch(editPost({ title, body, id: postId, userId: post.userId }));
      setRequestStatus("idle");
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 to-white">
      <div className="flex flex-col w-1/2 mx-auto my-0 py-10">
        <h1 className="text-2xl font-semibold mb-10">Edit post</h1>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col mb-4">
            <label className="mb-2">Title</label>
            <input
              className="mb-4 rounded-xl px-4 py-1 focus:outline-0 border border-gray-100"
              type="text"
              value={title}
              onChange={onChangeTitle}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2">Body</label>
            <textarea
              className="mb-4 rounded-xl px-4 py-1 focus:outline-0 border border-gray-100"
              value={body}
              onChange={onChangeBody}
            ></textarea>
          </div>
          <button
            disabled={!canSave}
            className="self-end p-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 font-semibold cursor-pointer"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
}
