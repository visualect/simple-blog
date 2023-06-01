import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUserById } from "./usersSlice";
import { IUser } from "./usersTypes";

export default function UserItem() {
  const location = useLocation();
  const userId = location.pathname.at(-1) as string;

  const user = useAppSelector((state) =>
    selectUserById(state, userId)
  ) as IUser;

  return (
    <section className="min-h-screen bg-gradient-to-r from-gray-50 to-white">
      <div className="flex flex-col w-1/2 mx-auto my-0 py-10">
        <h1 className="text-2xl font-semibold mb-4">{user.name}</h1>
      </div>
    </section>
  );
}
