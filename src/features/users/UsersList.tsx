import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAllUsers } from "./usersSlice";

export default function UsersList() {
  const users = useAppSelector(selectAllUsers);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white">
      <div className="w-1/2 mx-auto my-0 py-10">
        <h1 className="text-2xl font-semibold mb-4">Users</h1>
        <ul className="flex flex-col items-center gap-8">
          {users.map((user) => (
            <Link to={`${user.id}`} key={user.id}>
              {user.name}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
