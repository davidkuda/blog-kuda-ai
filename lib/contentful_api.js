// https://nextjs.org/learn/basics/data-fetching/getstaticprops-details
export async function getPostsFromContentful() {
  console.log(process.env.CONTENTFUL_SPACE_ID);
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
