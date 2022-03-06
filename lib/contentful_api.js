import { remark } from "remark";
import html from "remark-html";

// https://nextjs.org/learn/basics/data-fetching/getstaticprops-details
export async function getAllPosts() {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=blogPost`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  return data.items;
}

export async function getPost(id) {
  var res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=blogPost&fields.id[match]=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    }
  );
  var data = await res.json();
  console.log(data);

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
  var res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=aboutPage`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    }
  );
  var data = await res.json();

  var rawContent = data.items[0].fields.content;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(rawContent);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return contentHtml;
}
