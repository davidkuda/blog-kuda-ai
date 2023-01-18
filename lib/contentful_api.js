import rehypeHighlight from "rehype-highlight";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";

export async function getAllPosts() {
  const data = await getFromContentful("entries?content_type=blogPost");
  return data.items;
}

export async function getPost(id) {
  var response = await getFromContentful(
    `entries?content_type=blogPost&fields.id[match]=${id}`
  );
  var data = response.items[0];
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
  var temp = await getFromContentful(
    `entries?content_type=markdownPage&fields.title[match]=${title}`
  );
  var data = temp.items[0].fields;
  var defaultPreviewImg =
    "https://images.ctfassets.net/pedj0c0bs6fa/54o6IJpJFmV2D57ZHeyNKS/c4f97ba8b50eea3759c9eac4e52e2ed0/davidkuda_profile_picture.jpeg";
  var headers = {
    title: data.headerTitle,
    urlEndpoint: data.urlEndpoint,
    previewImg: data.previewImg ? data.previewImg : defaultPreviewImg,
  };
  var markdownContent = data.content;
  var htmlContent = await parseMarkdown(markdownContent);
  return { headers: headers, mainContent: htmlContent };
}

export async function getAssetUrlById(assetId) {
  var res = await getFromContentful("assets/" + assetId);
  var imgUrl = res.fields.file.url;
  return imgUrl;
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

async function parseMarkdown(markdownString) {
  // Use unified / remark / rehype to convert markdown into HTML string
  const data = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeToc)
    // .use(rehypeSanitize)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdownString);

  let contentAsString = data.value;
  let contentWithToc = placeToc(contentAsString)

  return contentWithToc;
}

/**
 * Takes html string as arg, checks whether it contains
 * {{ toc }}, and if so, places toc there instead of at
 * the start.
 * 
 * the whole thing here is string parsing. 
  * 
  * Note: toc == table of contents
 * 
 * @param {string} content 
 * @returns {string} conent with replaced TOC
 */
function placeToc(content) {
  // find table of content
  // rehype will insert it at the beginning of the string
  var tocIndex = 0;
  for (let i = 5; i < content.length; i++) {
    if (content[i] != ">") {
      continue;
    }
    if (content[i - 5] != "<") {
      continue;
    }
    var s = content.slice(i - 5, i + 1)
    console.log({s})
    if (s === "</nav>") {
      tocIndex = i + 1;
      break;
    }
  }
  let toc = content.slice(0, tocIndex);
  content = content.slice(tocIndex);

  // now let's find the place where we want to insert the toc
  var found; // bool
  var tocInsertIndexStart; // int
  var tocInsertIndexEnd; // int
  var len = "{{ toc }}".length - 1;
  for (let i = len; i < content.length; i++) {
    if (content[i] != "}") {
      continue;
    }
    if (content[i - len] != "{") {
      continue;
    }
    var s = content.slice(i - len, i + 1)
    if (s === "{{ toc }}") {
      found = true;
      tocInsertIndexStart = i - len;
      tocInsertIndexEnd = i + 1;
      break;
    }
  }

  if (found) {
    var pre = content.slice(0, tocInsertIndexStart);
    var post = content.slice(tocInsertIndexEnd);
    console.log({pre})
    content = pre + toc + post;
  } else {
    content = toc + content;
  }

  return content;
}
