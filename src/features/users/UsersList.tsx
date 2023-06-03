import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAllUsers } from "./usersSlice";
import Spinner from "../../components/UI/Spinner";

export default function UsersList() {
  const users = useAppSelector(selectAllUsers);
  const error = useAppSelector((state) => state.users.error);
  const status = useAppSelector((state) => state.users.status);
  let content;

  if (status === "pending") {
    content = <Spinner />;
  } else if (status === "succeeded") {
    content = users.map((user) => (
      <Link
        to={`${user.id}`}
        key={user.id}
        className="font-ibmplexmono hover:text-indigo-500"
      >
        {user.name}
      </Link>
    ));
  } else if (status === "failed") {
    if (error) {
      content = error;
    } else {
      content = "Error";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white">
      <div className="w-1/2 mx-auto my-0 py-10">
        <h1 className="text-2xl font-semibold mb-4">Users</h1>
        <ul className="flex flex-col items-center gap-8">{content}</ul>
      </div>
    </div>
  );
}
