import { format, parseISO } from "date-fns";

import 'highlight.js/styles/tokyo-night-dark.css'

import Headers from "../../components/Headers";
import { getAllPosts, getPost, getAssetUrlById } from "../../lib/contentful_api";


export default function Post({ postData }) {

  var headers = {
    title: postData.title,
    description: postData.description,
    previewImage: postData.previewImage,
    urlEndpoint: `blog/${postData.id}`
  };

  var createdIn = format(parseISO(postData.createdAt), "MMMM uuu");
  var updatedIn = format(parseISO(postData.updatedAt), "MMMM uuu");
  return (
    <>
      <Headers headers={headers} />
      <div>
        <div className="flex flex-col md:items-center">
          <main className="prose prose-sm md:prose-base">
            <div className="mb-4">
              <h2 className="md:text-3xl text-xl font-bold">
                {postData.title}
              </h2>

              <div className="text-gray-600 text-xs">
                created in {createdIn}
                { createdIn === updatedIn ? "" : ", last update in " + updatedIn }
              </div>
            </div>

            <div>
              <div dangerouslySetInnerHTML={{ __html: postData.htmlContent }} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { id: post.fields.id },
  }))
 
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {

  const postData = await getPost(params.id);

  if ("previewImage" in postData) {
    var previewImageAssetId = postData.previewImage.sys.id;
    var previewImageUrl =
      "https:" + (await getAssetUrlById(previewImageAssetId));
    postData.previewImage = previewImageUrl;
  }

  return {
    props: {
      postData,
    },
  };
}
