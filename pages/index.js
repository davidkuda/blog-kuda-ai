import Head from "next/head";

import { getAllPosts } from "../lib/contentful_api";
import BlogPostPreviewCard from "../components/BlogPostPreviewCard";

export default function Home(props) {
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
          {props.allPostsData.map((post) => (
            <BlogPostPreviewCard
              key={post.fields.id}
              id={post.fields.id}
              title={post.fields.title}
              date={post.fields.creationDate}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = await getAllPosts();
  return {
    props: {
      allPostsData,
    },
  };
}
