import Link from "next/link";
import { format, parseISO } from "date-fns";

export default function BlogPostPreviewCard({
  id,
  title,
  category,
  createdAt,
  updatedAt,
}) {
  var createdAt = format(parseISO(createdAt), "MMMM uuu");
  var updatedAt = format(parseISO(updatedAt), "MMMM uuu");
  return (
    <Link href={`blog/${id}`}>
      <li className="cursor-pointer w-2/3 mx-2 my-3">
        <div>
          <a className="text-l font-medium">{title}</a>
          <br />
          <span className="text-gray-600 text-xs">
            {/* <span className="bg-orange-500 p-1 rounded-md text-white">{category}</span>{" "} */}
            <span className="text-orange-600 font-bold">{category}</span>{" "}
            <span>
              {createdAt === updatedAt
                ? createdAt
                : `${createdAt} (created), ${updatedAt} (last update)`}
            </span>
          </span>
        </div>
      </li>
    </Link>
  );
}
