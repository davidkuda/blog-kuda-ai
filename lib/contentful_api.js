import { remark } from "remark";
import html from "remark-html";

export async function getAllPosts() {
  const data = await getFromContentful("entries?content_type=blogPost");
  return data.items;
}

export async function getPost(id) {
  var response = await getFromContentful(`entries?content_type=blogPost&fields.id[match]=${id}`);
  var data = response.items[0]
  var markdownContent = data.fields.body;
  var htmlContent = await parseMarkdown(markdownContent);
  delete data.fields.body;
  return {
    id,
    htmlContent,
    createdAt: data.sys.createdAt,
    updatedAt: data.sys.updatedAt,
    ...data.fields,
  };
}

export async function getPageContent(title) {
  var temp = await getFromContentful(`entries?content_type=markdownPage&fields.title[match]=${title}`)
  var data = temp.items[0].fields;
  var defaultPreviewImg = "https://images.ctfassets.net/pedj0c0bs6fa/54o6IJpJFmV2D57ZHeyNKS/c4f97ba8b50eea3759c9eac4e52e2ed0/davidkuda_profile_picture.jpeg";
  var headers = {
    title: data.headerTitle,
    urlEndpoint: data.urlEndpoint,
    previewImg: data.previewImg ? data.previewImg : defaultPreviewImg,
  };
  var markdownContent = data.content;
  var htmlContent = await parseMarkdown(markdownContent);
  return {headers: headers, mainContent: htmlContent};
}

export async function getAssetUrlById(assetId) {
  var res = await getFromContentful("assets/" + assetId)
  var imgUrl = res.fields.file.url
  return imgUrl
}

async function getFromContentful(endpoint) {
  var res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/${endpoint}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    }
  );
  var data = await res.json();
  return data;
}

async function parseMarkdown(rawContent) {
  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(rawContent);
  const contentHtml = processedContent.toString();
  return contentHtml;
}
