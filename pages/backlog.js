import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { getPageContent } from "../lib/contentful_api";

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
      pageContent: await getPageContent("backlog"),
    },
  };
}
