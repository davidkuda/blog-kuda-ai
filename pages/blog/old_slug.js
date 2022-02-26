import Head from "next/head";
import { getSortedPostsData } from "../../lib/posts";
import { format, parseISO } from "date-fns";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

export default function BlogPage({ frontMatter, source }) {
  if (!frontMatter.description) {
    frontMatter.description = "kuda.ai | blog on code, guitar and life.";
  }
  return (
    <>
      <div>
        <Head>
          <title>{frontMatter.title}</title>
          <meta name="description" content={frontMatter.description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="prose break-normal">
          <div className="mb-4">
            <h2 className="md:text-3xl text-xl font-bold">
              {frontMatter.title}
            </h2>

            <div className="text-gray-600 text-xs">
              {format(parseISO(frontMatter.date), "d. MMMM uuu")}
            </div>
          </div>

          <div>
            <MDXRemote {...source} />
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const allPosts = getSortedPostsData();
  const { data, content } = allPosts.find((item) => item.slug === params.slug);
  const mdxSource = await serialize(content, { scope: data });
  return {
    props: {
      frontMatter: data,
      source: mdxSource,
    },
  };
}

// export async function getStaticPaths() {
//   return {
//     paths: getSortedPostsData().map((post) => ({
//       params: { slug: post.slug },
//     })),
//     fallback: false,
//   };
// }
