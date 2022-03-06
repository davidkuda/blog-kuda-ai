import { remark } from "remark";
import html from "remark-html";

// https://nextjs.org/learn/basics/data-fetching/getstaticprops-details
export async function getAllPosts() {
  const data = await getFromContentful("entries?content_type=blogPost");
  return data.items;
}

export async function getPost(id) {
  var data = await getFromContentful(`entries?content_type=blogPost&fields.id[match]=${id}`);
  var markdownContent = data.items[0].fields.body;
  var htmlContent = await parseMarkdown(markdownContent);
  return {
    id,
    htmlContent,
    ...data.items[0].fields,
  };
}

export async function getMarkdownContent(title) {
  var data = await getFromContentful(`entries?content_type=markdownPage&fields.title[match]=${title}`)
  var markdownContent = data.items[0].fields.content;
  var htmlContent = await parseMarkdown(markdownContent);
  return htmlContent;
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
