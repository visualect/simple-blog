import { useState } from "react";
import { selectAllUsers } from "../users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNewPost } from "./postsSlice";

export default function AddPostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");
  const dispatch = useAppDispatch();

  const canSave =
    Boolean(title) &&
    Boolean(body) &&
    Boolean(userId) &&
    requestStatus === "idle";

  const users = useAppSelector(selectAllUsers);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      try {
        setRequestStatus("pending");
        await dispatch(addNewPost({ title, body, userId })).unwrap();
        setTitle("");
        setBody("");
        setUserId("");
      } catch (err) {
        // console.error(err.message);
        console.error("Error 🥵");
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value);

  const onChangeAuthor = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  return (
    <section className="bg-gradient-to-r from-gray-50 to-white">
      <div className="w-1/2 mx-auto my-0 py-10">
        <h1 className="text-2xl font-semibold mb-4">Add post</h1>
        <form className="flex flex-col" onSubmit={onSubmit}>
          <label className="mb-2">Title</label>
          <input
            className="mb-4 rounded-xl px-4 py-1 focus:outline-0 border border-gray-100"
            type="text"
            value={title}
            onChange={onChangeTitle}
          />
          <label className="mb-2">Body</label>
          <textarea
            className="mb-4 rounded-xl px-4 py-1 focus:outline-0 border border-gray-100"
            value={body}
            onChange={onChangeBody}
          />
          <label className="mb-2">Author</label>
          <select
            value={userId}
            onChange={onChangeAuthor}
            className="rounded-xl px-4 py-1 mb-4 focus:outline-0 border border-gray-100"
          >
            <option value="" disabled>
              Author
            </option>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          <button
            className="self-end p-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 font-semibold cursor-pointer"
            disabled={!canSave}
          >
            Add
          </button>
        </form>
      </div>
    </section>
  );
}
