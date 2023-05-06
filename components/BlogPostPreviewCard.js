import Link from "next/link";
import { format, parseISO } from "date-fns";

export default function BlogPostPreviewCard({
  id,
  title,
  category,
  tags,
  createdAt,
  updatedAt,
}) {
  createdAt = format(parseISO(createdAt), "MMMM uuu");
  updatedAt = format(parseISO(updatedAt), "MMMM uuu");
  return (
    <>
      <li className="w-2/3 mx-2 my-3">
        <div>
          <Link
            href={`blog/${id}`}
            className="cursor-pointer text-l font-medium"
          >
            {title}
          </Link>
          <br />
          <span className="text-gray-600 text-xs">
            <span className="text-orange-600 font-bold">{category}</span>{" "}
            <span>
              {createdAt === updatedAt
                ? createdAt
                : `${updatedAt} (last update), ${createdAt} (created)`}
            </span>
            <br />
            {tags.map((tag) => (
              <span className="mr-2">{"#" + tag}</span>
            ))}
          </span>
        </div>
      </li>
    </>
  );
}
