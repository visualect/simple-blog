import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectPostById } from "./postsSlice";
import { IPost } from "./postsTypes";
import { selectUserById } from "../users/usersSlice";
import { IUser } from "../users/usersTypes";

export default function PostPage() {
  const params = useParams();
  const postId = Number(params.id);
  const post = useAppSelector((state) =>
    selectPostById(state, postId)
  ) as IPost;
  const user = useAppSelector((state) =>
    selectUserById(state, post.userId)
  ) as IUser;

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-50 to-white">
      <div className="flex flex-col w-1/2 mx-auto my-0 py-10">
        <h2 className="text-2xl font-semibold mb-10">{post.title}</h2>
        <p className="mb-10">{post.body}</p>
        <div className="flex gap-2 self-end">
          <span>by</span>
          <Link
            className="font-ibmplexmono hover:text-indigo-500"
            to={`/users/${user.id}`}
          >
            {user.name}
          </Link>
        </div>
      </div>
    </section>
  );
}
