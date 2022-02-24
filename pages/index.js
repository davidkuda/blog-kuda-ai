import Head from "next/head";

import { getAllPosts } from "../lib/data";
import ListBlogPosts from "../components/ListBlogPosts";


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
            <ListBlogPosts key={item.slug} {...item} />
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
