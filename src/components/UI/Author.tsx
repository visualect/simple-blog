import { useAppSelector } from "../../app/hooks";
import { selectUserById } from "../../features/users/usersSlice";
import { IUser } from "../../features/users/usersTypes";

export default function Author({ userId }: { userId: number }) {
  const user = useAppSelector((state) =>
    selectUserById(state, userId)
  ) as IUser;
  return <span className="font-ibmplexmono">{user.name}</span>;
}
