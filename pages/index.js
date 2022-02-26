import Head from "next/head";

import { getSortedPostsData } from "../lib/posts";
import ListBlogPosts from "../components/ListBlogPosts";

export default function Home({ allPostsData }) {
  console.log(allPostsData)
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
          {allPostsData.map((item) => (
            <ListBlogPosts key={item.slug} {...item} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
