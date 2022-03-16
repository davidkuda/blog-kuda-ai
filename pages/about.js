import Image from "next/image";

import Headers from "../components/Headers";
import { getMarkdownContent } from "../lib/contentful_api";
import Footer from "../components/Footer";

export default function About(props) {
  return (
    <div>
      <Headers title="About | kuda.ai" url_endpoint="about" />
      <div className="flex flex-col md:items-center">
        <main className="prose text-sm md:text-base">
          <div dangerouslySetInnerHTML={{ __html: props.aboutPageContent }} />
      </main>
      </div>
    <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      "aboutPageContent": await getMarkdownContent("about_page"),
    },
  };
}
