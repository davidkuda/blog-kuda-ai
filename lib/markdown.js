import rehypeHighlight from "rehype-highlight";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";

export async function parseMarkdownWithoutTOC(markdownString) {
  // Use unified / remark / rehype to convert markdown into HTML string
  const data = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdownString);

  return data.value;
}

export async function parseMarkdown(markdownString) {
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

  let contentWithToc = placeToc(contentAsString);
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
    var s = content.slice(i - 5, i + 1);
    console.log({ s });
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
    var s = content.slice(i - len, i + 1);
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
    console.log({ pre });
    content = pre + toc + post;
  } else {
    content = toc + content;
  }

  return content;
}
