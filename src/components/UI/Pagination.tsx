import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetStatus, setCurrentPage } from "../../features/posts/postsSlice";
import getPaginationNumber from "../../utils/getPaginationNumber";

export default function Pagination() {
  const totalPosts = useAppSelector((state) => state.posts.totalCount);
  const currentPage = useAppSelector((state) => state.posts.currentPage);

  const totalPage = getPaginationNumber(totalPosts, 10);
  const dispatch = useAppDispatch();

  const inactive = "bg-gradient-to-r from-gray-50 to-gray-100";
  const active = "bg-indigo-200";

  const onNumClick = (num: number) => {
    dispatch(resetStatus());
    dispatch(setCurrentPage(num));
  };

  return (
    <ul className="flex gap-6 justify-center mb-4">
      {totalPage.map((num, idx) => (
        <li
          className={`cursor-pointer ${
            num === currentPage ? active : inactive
          } p-1 w-8 text-center rounded-xl border border-gray-200 text-sm`}
          key={idx}
          onClick={() => onNumClick(num)}
        >
          {num}
        </li>
      ))}
    </ul>
  );
}
