import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUserById } from "../../features/users/usersSlice";

export default function Author({ userId }: { userId: number }) {
  let name;
  const user = useAppSelector((state) => selectUserById(state, userId));
  if (user) {
    name = (
      <Link
        to={`/users/${userId}`}
        className="font-ibmplexmono hover:text-indigo-500"
      >
        {user.name}
      </Link>
    );
  } else {
    name = <span>Unknown author</span>;
  }
  return name;
}
