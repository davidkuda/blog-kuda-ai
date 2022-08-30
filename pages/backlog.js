import Headers from "../components/Headers";
import SimpleMarkdownPage from "../components/SimpleMarkdownPage";
import Footer from "../components/Footer";
import { getPageContent } from "../lib/contentful_api";

export default function About(props) {
  return (
    <div>
      <Headers
        title="Backlog | kuda.ai"
        url_endpoint="backlog"
      />
      <SimpleMarkdownPage markdownContent={props.pageContent} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      pageContent: await getPageContent("backlog"),
    },
  };
}
