import Headers from "../components/Headers";
import SimpleMarkdownPage from "../components/SimpleMarkdownPage";
import { getPageContent } from "../lib/contentful_api";
import Footer from "../components/Footer";

export default function About({ data }) {
  return (
    <div>
      <Headers headers={data.headers} />
      <SimpleMarkdownPage markdownContent={data.mainContent} />
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      data: await getPageContent("about_page"),
    },
  };
}
