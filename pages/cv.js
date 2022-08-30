import Headers from "../components/Headers";
import SimpleMarkdownPage from "../components/SimpleMarkdownPage";
import Footer from "../components/Footer";
import { getPageContent } from "../lib/contentful_api";

export default function About({ data }) {
  return (
    <div>
      <Headers headers={data.headers} />
      <SimpleMarkdownPage markdownContent={data.mainContent} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      "data": await getPageContent("cv"),
    },
  };
}
