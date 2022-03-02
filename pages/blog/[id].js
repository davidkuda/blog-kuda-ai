import Head from "next/head";
import { format, parseISO } from "date-fns";

import { getAllPosts, getPost } from "../../lib/contentful_api";

export default function Post({ postData }) {
  return (
    <>
      <div>
        <Head>
          <title>{postData.title}</title>
          <meta name="description" content={postData.description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-col md:items-center">
          <main className="prose prose-sm md:prose-base">
            <div className="mb-4">
              <h2 className="md:text-3xl text-xl font-bold">
                {postData.title}
              </h2>

              <div className="text-gray-600 text-xs">
                {format(parseISO(postData.creationDate), "d. MMMM uuu")}
              </div>
            </div>

            <div>
              <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const postData = await getPost(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPosts();
  const paths = allPosts.map((p) => `/blog/${p.fields.id}`);
  return {
    paths: paths,
    fallback: false,
  };
}
