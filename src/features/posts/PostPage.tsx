import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectPostById } from "./postsSlice";
import { IPost } from "./postsTypes";
import { selectUserById } from "../users/usersSlice";
import { IUser } from "../users/usersTypes";
import { selectCommentsByPostId } from "../comments/commentsSlice";

export default function PostPage() {
  const params = useParams();
  const postId = Number(params.id);
  const post = useAppSelector((state) =>
    selectPostById(state, postId)
  ) as IPost;
  const user = useAppSelector((state) =>
    selectUserById(state, post.userId)
  ) as IUser;
  const comments = useAppSelector((state) =>
    selectCommentsByPostId(state, postId)
  );
  console.log(comments);

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 to-white">
      <div className="flex flex-col w-1/2 mx-auto my-0 py-10">
        <h2 className="text-2xl font-semibold mb-10">{post.title}</h2>
        <p className="mb-10">{post.body}</p>
        <div className="flex gap-2 self-end mb-4">
          <span>by</span>
          {user ? (
            <Link
              className="font-ibmplexmono hover:text-indigo-500"
              to={`/users/${user.id}`}
            >
              {user.name}
            </Link>
          ) : (
            "Unknown author"
          )}
        </div>
        <div className="flex items-center cursor-pointer self-end mb-[100px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-1 text-indigo-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          <Link
            to={`/edit/${postId}`}
            className="text-indigo-500 font-ibmplexmono text-sm"
          >
            Edit
          </Link>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-10">Comments</h2>
          <ul className="flex flex-col gap-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="flex flex-col p-4 bg-white rounded-xl"
              >
                <p className="mb-8 text-sm">{comment.body}</p>
                <span className="self-end font-ibmplexmono text-sm">
                  {comment.email}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
