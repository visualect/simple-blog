import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUserById } from "../../features/users/usersSlice";
import { IUser } from "../../features/users/usersTypes";

export default function Author({ userId }: { userId: number }) {
  const user = useAppSelector((state) =>
    selectUserById(state, userId)
  ) as IUser;
  return (
    <Link
      to={`/users/${userId}`}
      className="font-ibmplexmono hover:text-indigo-500"
    >
      {user.name}
    </Link>
  );
}
