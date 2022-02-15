import Link from "next/link";
import Head from "next/head";
import { getAllPosts } from "../lib/data";
import { format, parseISO } from "date-fns";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>kuda.ai | code. guitar. life.</title>
        <meta
          name="description"
          content="David Kuda on Code, Guitar and Life."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-4">
        <ul className="blog-posts-container flex flex-row flex-wrap justify-center">
          {posts.map((item) => (
            <ListBlogItems key={item.slug} {...item} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts.map(({ data, content, slug }) => ({
        ...data,
        date: data.date,
        content,
        slug,
      })),
    },
  };
}

// basis-1/2 gap-2 m-2 w-1/4
function ListBlogItems({ slug, title, date, content }) {
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
