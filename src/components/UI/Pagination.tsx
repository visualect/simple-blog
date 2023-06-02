import { useAppSelector } from "../../app/hooks";
import { selectAllPosts } from "../../features/posts/postsSlice";

interface IPaginationProps {
  currentPage: number;
  setCurrentPage: (arg: number) => void;
}

export default function Pagination({
  currentPage,
  setCurrentPage,
}: IPaginationProps) {
  const posts = useAppSelector(selectAllPosts);

  const totalPages: number[] = [];

  for (let i = 1; i <= Math.ceil(posts.length / 10); i++) {
    totalPages.push(i);
  }

  const inactive = "bg-gradient-to-r from-gray-50 to-gray-100";
  const active = "bg-indigo-200";

  return (
    <ul className="flex gap-6 justify-center mb-4">
      {totalPages.map((num, idx) => (
        <li
          className={`cursor-pointer ${
            num === currentPage ? active : inactive
          } p-1 w-8 text-center rounded-xl border border-gray-200 text-sm`}
          key={idx}
          onClick={() => setCurrentPage(num)}
        >
          {num}
        </li>
      ))}
    </ul>
  );
}
