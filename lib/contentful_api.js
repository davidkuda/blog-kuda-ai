import { remark } from "remark";
import html from "remark-html";

// https://nextjs.org/learn/basics/data-fetching/getstaticprops-details
export async function getAllPosts() {
  const data = await getFromContentful("entries?content_type=blogPost");
  return data.items;
}

export async function getPost(id) {
  var data = await getFromContentful(`entries?content_type=blogPost&fields.id[match]=${id}`);
  var rawContent = data.items[0].fields.body;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(rawContent);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...data.items[0].fields,
  };
}

export async function getAboutPageContent() {
  var data = await getFromContentful("entries?content_type=aboutPage");
  var rawContent = data.items[0].fields.content;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(rawContent);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return contentHtml;
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
