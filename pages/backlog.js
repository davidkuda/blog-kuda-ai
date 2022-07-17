import Headers from "../components/Headers";
import { getMarkdownContent } from "../lib/contentful_api";
import Footer from "../components/Footer";

export default function About(props) {
  return (
    <div>
      <Headers
        title="Backlog | kuda.ai"
        url_endpoint="backlog"
      />
      <div className="flex flex-col md:items-center">
        <main className="prose text-sm md:text-base">
          <div dangerouslySetInnerHTML={{ __html: props.pageContent }} />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      pageContent: await getMarkdownContent("backlog"),
    },
  };
}
