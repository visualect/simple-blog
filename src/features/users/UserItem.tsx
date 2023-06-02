import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUserById } from "./usersSlice";
import { IUser } from "./usersTypes";
import { selectAllPosts } from "../posts/postsSlice";

export default function UserItem() {
  const params = useParams();

  const userId = Number(params.id);
  const allPosts = useAppSelector(selectAllPosts);

  const postsByCurrentUser = allPosts.filter((post) => post.userId === userId);

  const user = useAppSelector((state) =>
    selectUserById(state, userId)
  ) as IUser;

  return (
    <section className="min-h-screen bg-gradient-to-r from-gray-50 to-white">
      <div className="flex flex-col w-1/2 mx-auto my-0 py-10">
        <h1 className="text-2xl font-semibold mb-4">{user.name}</h1>
        <div className="flex flex-col  mb-8">
          <p className="font-ibmplexmono">Username: {user.username}</p>
          <p className="font-ibmplexmono">E-mail: {user.email}</p>
          <p className="font-ibmplexmono">Phone: {user.phone}</p>
          <p className="font-ibmplexmono">Website: {user.website}</p>
          <p className="font-ibmplexmono">Company: {user.company.name}</p>
          <p className="font-ibmplexmono">City: {user.address.city}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">
            All posts by this author
          </h2>
          <ul className="flex flex-col gap-2">
            {postsByCurrentUser.map((post) => (
              <Link
                to={`/posts/${post.id}`}
                className="font-ibmplexmono hover:text-indigo-500 cursor-pointer"
                key={post.id}
              >
                {post.title}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
