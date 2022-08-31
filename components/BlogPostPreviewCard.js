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
  var createdAt = format(parseISO(createdAt), "MMMM uuu");
  var updatedAt = format(parseISO(updatedAt), "MMMM uuu");
  return (
    <Link href={`blog/${id}`}>
      <li className="cursor-pointer w-2/3 mx-2 my-3">
        <div>
          <a className="text-l font-medium">{title}</a>
          <br />
          <span className="text-gray-600 text-xs">
            <span className="text-orange-600 font-bold">{category}</span>{" "}
            <span>
              {createdAt === updatedAt
                ? createdAt
                : `${createdAt} (created), ${updatedAt} (last update)`}
            </span>
            <br />
            {tags.map((tag) => (
              <span className="mr-2">{"#" + tag}</span>
            ))}
          </span>
        </div>
      </li>
    </Link>
  );
}
