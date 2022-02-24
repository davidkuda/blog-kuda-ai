import Link from "next/link";
import { format, parseISO } from "date-fns";


export default function ListBlogPosts({ slug, title, date, content }) {
  return (
    <Link href={`blog/${slug}`}>
      <li className="cursor-pointer w-2/3 mx-2 my-3">
        <div>
          <a className="text-l font-medium">{title}</a>
          <br></br>
          <span className="text-gray-600 text-xs">
            {format(parseISO(date), "d. MMMM uuu")}
          </span>
        </div>
      </li>
    </Link>
  );
}