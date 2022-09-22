import { format, parseISO } from "date-fns";

import Headers from "../../components/Headers";
import { getPost } from "../../lib/contentful_api";

export default function Post({ postData }) {
  var headers = {
    title: postData.title,
    description: postData.description,
    previewImage: postData.previewImage,
    urlEndpoint: `blog/${postData.title}`
  };
  var createdAt = format(parseISO(postData.createdAt), "d. MMMM uuu");
  var updatedAt = format(parseISO(postData.updatedAt), "d. MMMM uuu");
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
                created at {createdAt},
                { createdAt === updatedAt ? "" : " last update " + updatedAt }
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

export async function getServerSideProps({ params }) {
  const postData = await getPost(params.id);
  return {
    props: {
      postData,
    },
  };
}
